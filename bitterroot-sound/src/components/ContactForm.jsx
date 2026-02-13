const socialLinks = [
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/bitterrootsound',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21Zm4.84 14.9a.78.78 0 0 1-1.07.26c-2.94-1.8-6.63-2.2-10.97-1.2a.78.78 0 1 1-.35-1.52c4.76-1.09 8.85-.63 12.13 1.38.36.22.47.7.26 1.08Zm1.53-2.83a.98.98 0 0 1-1.35.33c-3.36-2.06-8.49-2.66-12.46-1.46a.98.98 0 1 1-.57-1.88c4.54-1.38 10.18-.71 14.05 1.66.46.28.61.89.33 1.35Zm.13-2.95C14.43 8.2 7.76 8 3.9 9.17a1.17 1.17 0 1 1-.67-2.24C7.67 5.58 15 5.82 19.72 8.62a1.17 1.17 0 1 1-1.2 2Z" />
      </svg>
    ),
  },
  {
    name: 'Apple Music',
    href: 'https://music.apple.com/us/artist/bitterroot-sound/000000000',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M15.7 3.5v11.02A2.98 2.98 0 0 1 13 17.5a2.9 2.9 0 1 1 1.7-5.3V6.43l-6.4 1.6v8.5A2.98 2.98 0 0 1 5.6 19.5a2.9 2.9 0 1 1 1.7-5.3V6.86a1.2 1.2 0 0 1 .9-1.16l6.4-1.6a1.02 1.02 0 0 1 1.1.24c.23.22.36.52.36.84Z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@bitterrootsound',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M21.3 8.2a2.4 2.4 0 0 0-1.68-1.7C18.17 6 12 6 12 6s-6.18 0-7.62.5A2.4 2.4 0 0 0 2.7 8.2C2.2 9.67 2.2 12 2.2 12s0 2.33.5 3.8a2.4 2.4 0 0 0 1.68 1.7C5.82 18 12 18 12 18s6.18 0 7.62-.5a2.4 2.4 0 0 0 1.68-1.7c.5-1.47.5-3.8.5-3.8s0-2.33-.5-3.8ZM10 14.7V9.3L14.8 12 10 14.7Z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/bitterrootsound',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M7.2 2.5h9.6a4.7 4.7 0 0 1 4.7 4.7v9.6a4.7 4.7 0 0 1-4.7 4.7H7.2a4.7 4.7 0 0 1-4.7-4.7V7.2a4.7 4.7 0 0 1 4.7-4.7Zm-.1 2A2.6 2.6 0 0 0 4.5 7.1v9.8a2.6 2.6 0 0 0 2.6 2.6h9.8a2.6 2.6 0 0 0 2.6-2.6V7.1a2.6 2.6 0 0 0-2.6-2.6H7.1ZM12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 2a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm5.1-2.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@bitterrootsound',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M14.2 3.3c.55 1.57 1.73 2.86 3.24 3.55.84.39 1.76.58 2.71.56v3.1a8.84 8.84 0 0 1-3.77-.84v6.15A6.8 6.8 0 1 1 9.6 9v3.2a3.6 3.6 0 1 0 3.6 3.6V3.3h1Z" />
      </svg>
    ),
  },
];

export default function ContactForm() {
  return (
    <section id="contact" className="bg-cream px-4 py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 rounded-3xl border border-gold/30 bg-white p-6 shadow-xl md:grid-cols-2 md:p-10">
        <div>
          <h2 className="font-serif text-3xl font-bold text-forest md:text-4xl">Get in Touch</h2>
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
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="space-y-4">
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
            <div className="mt-3 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="inline-flex items-center gap-2 rounded-full border border-slate/25 px-3 py-2 text-sm font-medium text-bark transition hover:border-gold hover:text-gold"
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
