import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from '../lib/react-hook-form';
import services from '../data/services.json';
import addons from '../data/addons.json';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const moods = ['Happy', 'Emotional', 'Uplifting', 'Sentimental', 'Energetic', 'Chill', 'Triumphant'];
const genres = [
  'Country',
  'Reggae',
  'Country-Reggae Fusion',
  'Pop',
  'Rock',
  'Folk',
  'Lo-fi',
  'Hip-Hop',
  'Jazz',
  'R&B',
  'Let James Choose',
];

const stepFields = [
  ['service'],
  ['occasion', 'names', 'mood', 'genre'],
  ['addons', 'voiceSample'],
  ['customerName', 'email'],
];

export default function OrderForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const formRef = useRef(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      service: services[0]?.name ?? '',
      addons: [],
      occasion: '',
      names: '',
      specialPhrases: '',
      mood: '',
      genre: '',
      customerName: '',
      email: '',
      phone: '',
      specialInstructions: '',
    },
  });

  const selectedServiceName = useWatch({ control, name: 'service' });
  const selectedAddons = useWatch({ control, name: 'addons' }) ?? [];

  useEffect(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const addonsParam = params.get('addons');

    if (service && services.some((item) => item.name === service)) {
      setValue('service', service, { shouldValidate: true });
    }

    if (addonsParam) {
      const fromUrl = addonsParam
        .split(',')
        .map((item) => decodeURIComponent(item.trim()))
        .filter((item) => addons.some((addon) => addon.name === item));

      if (fromUrl.length > 0) {
        setValue('addons', [...new Set(fromUrl)], { shouldValidate: true });
      }
    }

    return null;
  }, [setValue]);

  const selectedService = services.find((service) => service.name === selectedServiceName);
  const selectedAddonDetails = addons.filter((addon) => selectedAddons.includes(addon.name));

  const basePrice = selectedService?.price ?? 0;
  const addonsPrice = selectedAddonDetails.reduce((total, addon) => total + addon.price, 0);
  const total = basePrice + addonsPrice;

  const progress = (currentStep / 4) * 100;

  const nextStep = async () => {
    const isValid = await trigger(stepFields[currentStep - 1]);
    if (isValid) {
      setCurrentStep((step) => Math.min(4, step + 1));
    }
  };

  const prevStep = () => setCurrentStep((step) => Math.max(1, step - 1));

  const submitForm = () => {
    formRef.current?.submit();
  };

  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-gold/30 bg-white p-6 shadow-xl md:p-10">
        <h1 className="text-center font-serif text-3xl font-bold text-forest md:text-4xl">Order Your Custom Song</h1>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-sm font-semibold text-bark">
            <span>Step {currentStep} of 4</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-cream">
            <div className="h-full bg-gold transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <form
          ref={formRef}
          name="song-order"
          method="POST"
          action="/thank-you"
          data-netlify="true"
          encType="multipart/form-data"
          onSubmit={handleSubmit(submitForm)}
          className="mt-8 space-y-6"
        >
          <input type="hidden" name="form-name" value="song-order" />

          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-bark">Choose Your Service</h2>
              <div className="grid gap-3">
                {services.map((service) => (
                  <label
                    key={service.name}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 transition ${
                      selectedServiceName === service.name
                        ? 'border-gold bg-gold/10'
                        : 'border-slate/25 bg-white hover:border-gold/60'
                    }`}
                  >
                    <span className="flex items-center gap-3 text-bark">
                      <input
                        type="radio"
                        value={service.name}
                        {...register('service', { required: 'Please select a service.' })}
                        checked={selectedServiceName === service.name}
                        className="h-4 w-4 accent-gold"
                      />
                      <span>{service.name}</span>
                    </span>
                    <span className="font-semibold text-forest">{currency.format(service.price)}</span>
                  </label>
                ))}
              </div>
              {errors.service && <p className="text-sm text-red-700">{errors.service.message}</p>}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-bark">Tell Your Story</h2>

              <div>
                <label className="mb-1 block text-sm font-medium text-bark">Occasion description</label>
                <textarea
                  {...register('occasion', {
                    required: 'Please tell us about the occasion.',
                    maxLength: { value: 500, message: 'Please keep this to 500 characters or less.' },
                  })}
                  rows={5}
                  maxLength={500}
                  className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
                {errors.occasion && <p className="text-sm text-red-700">{errors.occasion.message}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-bark">Names to include</label>
                <input
                  type="text"
                  {...register('names', { required: 'Please include names for the song.' })}
                  className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
                {errors.names && <p className="text-sm text-red-700">{errors.names.message}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-bark">Special phrases or lyrics (optional)</label>
                <textarea
                  {...register('specialPhrases')}
                  rows={4}
                  className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-bark">Mood / vibe</label>
                  <select
                    {...register('mood', { required: 'Please choose a mood.' })}
                    className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                  >
                    <option value="">Select mood</option>
                    {moods.map((mood) => (
                      <option key={mood} value={mood}>
                        {mood}
                      </option>
                    ))}
                  </select>
                  {errors.mood && <p className="text-sm text-red-700">{errors.mood.message}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-bark">Genre preference</label>
                  <select
                    {...register('genre', { required: 'Please choose a genre.' })}
                    className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                  >
                    <option value="">Select genre</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                  {errors.genre && <p className="text-sm text-red-700">{errors.genre.message}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-bark">Customize</h2>

              <div className="grid gap-3 md:grid-cols-2">
                {addons.map((addon) => (
                  <label key={addon.name} className="flex w-full items-start gap-3 rounded-xl border border-slate/25 bg-white p-4">
                    <input
                      type="checkbox"
                      value={addon.name}
                      {...register('addons')}
                      checked={selectedAddons.includes(addon.name)}
                      className="mt-1 h-4 w-4 accent-gold"
                    />
                    <span className="text-sm text-bark">
                      <span className="block font-medium">{addon.name}</span>
                      <span className="text-forest">{currency.format(addon.price)}</span>
                    </span>
                  </label>
                ))}
              </div>

              {selectedServiceName === 'Voice Clone' && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-bark">
                    Upload voice samples (MP3/WAV, max 50MB)
                  </label>
                  <input
                    type="file"
                    accept=".mp3,.wav,audio/mpeg,audio/wav"
                    {...register('voiceSample', {
                      validate: (files) => {
                        if (selectedServiceName !== 'Voice Clone') {
                          return true;
                        }

                        if (!files || files.length === 0) {
                          return 'Voice sample is required for Voice Clone orders.';
                        }

                        const file = files[0];
                        const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav'];
                        if (!validTypes.includes(file.type) && !/\.(mp3|wav)$/i.test(file.name)) {
                          return 'Please upload an MP3 or WAV file.';
                        }

                        if (file.size > 50 * 1024 * 1024) {
                          return 'File size must be 50MB or less.';
                        }

                        return true;
                      },
                    })}
                    className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark file:mr-4 file:rounded-lg file:border-0 file:bg-gold file:px-3 file:py-2 file:font-semibold file:text-bark"
                  />
                  {errors.voiceSample && <p className="text-sm text-red-700">{errors.voiceSample.message}</p>}
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-bark">Review &amp; Submit</h2>

              <div className="rounded-xl border border-gold/40 bg-forest p-5 text-cream">
                <p className="flex items-center justify-between border-b border-cream/20 pb-2">
                  <span>{selectedService?.name ?? 'Service'}</span>
                  <span>{currency.format(basePrice)}</span>
                </p>
                {selectedAddonDetails.map((addon) => (
                  <p key={addon.name} className="mt-2 flex items-center justify-between text-cream/90">
                    <span>{addon.name}</span>
                    <span>{currency.format(addon.price)}</span>
                  </p>
                ))}
                <p className="mt-4 border-t border-cream/20 pt-3 text-2xl font-bold text-gold">Total: {currency.format(total)}</p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-bark">Name</label>
                <input
                  type="text"
                  {...register('customerName', { required: 'Please enter your name.' })}
                  className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
                {errors.customerName && <p className="text-sm text-red-700">{errors.customerName.message}</p>}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-bark">Email</label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Please enter your email.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address.',
                      },
                    })}
                    className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                  {errors.email && <p className="text-sm text-red-700">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-bark">Phone (optional)</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-bark">Special instructions</label>
                <textarea
                  {...register('specialInstructions')}
                  rows={4}
                  className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="w-full rounded-xl border border-bark/20 px-5 py-3 font-semibold text-bark disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="w-full rounded-xl bg-gold px-6 py-3 font-bold text-bark transition hover:bg-goldLight sm:w-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="w-full rounded-xl bg-gold px-6 py-3 font-bold text-bark transition hover:bg-goldLight sm:w-auto"
              >
                Submit Order
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
