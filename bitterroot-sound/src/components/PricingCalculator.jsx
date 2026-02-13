import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import services from '../data/services.json';
import addons from '../data/addons.json';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const buildOrderLink = (serviceName, selectedAddonNames) => {
  const params = new URLSearchParams();

  if (serviceName) {
    params.set('service', serviceName);
  }

  if (selectedAddonNames.length > 0) {
    params.set('addons', selectedAddonNames.join(','));
  }

  const query = params.toString();
  return query ? `/order?${query}` : '/order';
};

export default function PricingCalculator() {
  const [selectedServiceName, setSelectedServiceName] = useState(services[0]?.name ?? '');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [animatedTotal, setAnimatedTotal] = useState(services[0]?.price ?? 0);
  const animatedTotalRef = useRef(services[0]?.price ?? 0);

  const selectedService = useMemo(
    () => services.find((service) => service.name === selectedServiceName) ?? services[0],
    [selectedServiceName],
  );

  const selectedAddonDetails = useMemo(
    () => addons.filter((addon) => selectedAddons.includes(addon.name)),
    [selectedAddons],
  );

  const subtotal = selectedService?.price ?? 0;
  const addonsTotal = selectedAddonDetails.reduce((sum, addon) => sum + addon.price, 0);
  const total = subtotal + addonsTotal;

  useEffect(() => {
    const controls = animate(animatedTotalRef.current, total, {
      duration: 0.45,
      ease: 'easeOut',
      onUpdate: (value) => {
        animatedTotalRef.current = value;
        setAnimatedTotal(value);
      },
    });

    return () => controls.stop();
  }, [total]);

  const toggleAddon = (addonName) => {
    setSelectedAddons((current) =>
      current.includes(addonName)
        ? current.filter((name) => name !== addonName)
        : [...current, addonName],
    );
  };

  const orderHref = buildOrderLink(
    selectedService?.name,
    selectedAddonDetails.map((addon) => addon.name),
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-cream px-4 py-16"
    >
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-gold/30 bg-white p-6 shadow-xl md:p-10">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-forest md:text-4xl">Build Your Perfect Song</h2>
          <p className="mt-2 text-base text-slate md:text-lg">See your total instantly</p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-bark">Step 1: Select your base service</h3>
            <select
              value={selectedService?.name}
              onChange={(event) => setSelectedServiceName(event.target.value)}
              className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              {services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name} — {currency.format(service.price)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-bark">Step 2: Add-ons</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {addons.map((addon) => {
                const isChecked = selectedAddons.includes(addon.name);

                return (
                  <label
                    key={addon.name}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 transition ${
                      isChecked
                        ? 'border-gold bg-gold/10 shadow-sm'
                        : 'border-slate/25 bg-white hover:border-gold/60'
                    }`}
                  >
                    <span className="flex items-center gap-3 text-bark">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon.name)}
                        className="h-4 w-4 accent-gold"
                      />
                      <span className="font-medium">{addon.name}</span>
                    </span>
                    <span className="text-sm font-semibold text-forest">{currency.format(addon.price)}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gold/40 bg-forest p-5 text-cream md:p-6">
            <h3 className="mb-4 text-lg font-semibold">Step 3: Your running total</h3>
            <div className="space-y-2 text-sm md:text-base">
              <p className="flex items-center justify-between">
                <span>Base Service</span>
                <span>{currency.format(subtotal)}</span>
              </p>
              {selectedAddonDetails.map((addon) => (
                <p key={addon.name} className="flex items-center justify-between text-cream/90">
                  <span>{addon.name}</span>
                  <span>{currency.format(addon.price)}</span>
                </p>
              ))}
              {selectedAddonDetails.length === 0 && (
                <p className="text-cream/80">No add-ons selected yet.</p>
              )}
            </div>

            <div className="mt-5 border-t border-cream/30 pt-5">
              <div className="mb-3 inline-flex items-center rounded-full border border-gold/60 bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-goldLight">
                100% Satisfaction Guarantee
              </div>
              <p className="text-sm uppercase tracking-wide text-cream/80">Total</p>
              <motion.p
                key={total}
                initial={{ scale: 0.96, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="text-4xl font-black text-gold md:text-5xl"
                aria-live="polite"
              >
                {currency.format(animatedTotal)}
              </motion.p>
            </div>

            <a
              href={orderHref}
              className="mt-6 block w-full rounded-xl bg-gold px-6 py-4 text-center text-lg font-bold text-bark transition hover:bg-goldLight"
            >
              Proceed to Order
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
