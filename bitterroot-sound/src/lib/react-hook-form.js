import { useCallback, useMemo, useRef, useState } from 'react';

const getError = (rule, value, values) => {
  if (!rule) return null;
  if (rule.required) {
    const message = typeof rule.required === 'string' ? rule.required : 'This field is required.';
    const missing =
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (value?.length !== undefined && typeof value !== 'string' && value.length === 0);
    if (missing) return message;
  }
  if (rule.maxLength && typeof value === 'string') {
    const max = typeof rule.maxLength === 'number' ? rule.maxLength : rule.maxLength.value;
    if (value.length > max) return rule.maxLength.message ?? `Maximum length is ${max}.`;
  }
  if (rule.pattern && typeof value === 'string' && value) {
    const { value: regex, message } = rule.pattern;
    if (!regex.test(value)) return message ?? 'Invalid value.';
  }
  if (rule.validate) {
    const result = rule.validate(value, values);
    if (result !== true) return typeof result === 'string' ? result : 'Invalid value.';
  }
  return null;
};

export function useForm({ defaultValues = {} } = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const rulesRef = useRef({});

  const validate = useCallback((fieldNames) => {
    const names = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
    const nextErrors = { ...errors };

    for (const name of names) {
      const message = getError(rulesRef.current[name], values[name], values);
      if (message) {
        nextErrors[name] = { message };
      } else {
        delete nextErrors[name];
      }
    }

    setErrors(nextErrors);
    return names.every((name) => !nextErrors[name]);
  }, [errors, values]);

  const register = useCallback((name, rule) => {
    if (rule && !rulesRef.current[name]) {
      rulesRef.current[name] = rule;
    }

    return {
      name,
      onBlur: () => validate(name),
      onChange: (event) => {
        const target = event.target;
        let nextValue = target.value;

        if (target.type === 'checkbox') {
          const currentValues = Array.isArray(values[name]) ? values[name] : [];
          nextValue = target.checked
            ? Array.from(new Set([...currentValues, target.value]))
            : currentValues.filter((item) => item !== target.value);
        } else if (target.type === 'file') {
          nextValue = target.files;
        }

        setValues((current) => ({ ...current, [name]: nextValue }));
      },
    };
  }, [validate, values]);

  const setValue = useCallback((name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  }, []);

  const trigger = useCallback(async (fieldNames) => validate(fieldNames), [validate]);

  const handleSubmit = useCallback((onValid) => (event) => {
    event.preventDefault();
    const valid = validate(Object.keys(rulesRef.current));
    if (valid) onValid(values);
  }, [validate, values]);

  return {
    register,
    setValue,
    trigger,
    handleSubmit,
    control: useMemo(() => ({ values }), [values]),
    formState: { errors },
  };
}

export function useWatch({ control, name }) {
  return control.values[name];
}
