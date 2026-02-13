export default function ContactForm() {
  return (
    <section id="contact" className="bg-cream px-4 py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 rounded-3xl border border-gold/30 bg-white p-6 shadow-xl md:grid-cols-2 md:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Contact</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-forest md:text-4xl">Get in Touch</h2>
          <p className="mt-3 text-bark/90">Questions before ordering? We are here to help.</p>

          <dl className="mt-8 space-y-5 text-bark">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-forest">Email</dt>
              <dd className="mt-1">
                <a className="transition hover:text-gold" href="mailto:james@bitterrootsound.com">
                  james@bitterrootsound.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-forest">Response Time</dt>
              <dd className="mt-1">within 24 hours</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-forest">Location</dt>
              <dd className="mt-1">Hamilton, Montana - Bitterroot Valley</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-forest">Business Hours</dt>
              <dd className="mt-1">Mon-Sat, flexible</dd>
            </div>
          </dl>
        </div>

        <div>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />

            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-bark">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-bark">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-bark">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
              >
                <option value="">Select a subject</option>
                <option>General Question</option>
                <option>Custom Request</option>
                <option>Partnership</option>
                <option>Media Inquiry</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-bark">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full rounded-xl border border-slate/30 bg-cream px-4 py-3 text-bark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3 font-semibold text-bark transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Submit
            </button>
          </form>

          <div className="mt-6 border-t border-slate/20 pt-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-forest">Follow us</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm font-medium text-bark">
              <a href="https://instagram.com/bitterrootsound" target="_blank" rel="noreferrer" className="hover:text-gold">
                Instagram
              </a>
              <a href="https://facebook.com/bitterrootsound" target="_blank" rel="noreferrer" className="hover:text-gold">
                Facebook
              </a>
              <a href="https://youtube.com/@bitterrootsound" target="_blank" rel="noreferrer" className="hover:text-gold">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
