export const metadata = { title: 'Privacy Policy | ZedTunes' };

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6">
      <div className="mb-16 border-b border-zinc-100 pb-8">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4 text-black">
          Privacy <span className="text-zinc-400">Policy</span>
        </h1>
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">
          Last Updated: May 2026
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-black uppercase tracking-widest text-black mb-4">1. Information We Collect</h2>
          <p className="text-zinc-600 font-medium leading-relaxed mb-4">
            We respect your privacy. ZedTunes collects minimal information necessary to provide you with the best music streaming experience. This includes basic analytics data, technical logs, and information you voluntarily provide (e.g., when contacting support).
          </p>
          <ul className="list-disc pl-5 text-zinc-600 space-y-2 font-medium">
            <li>Usage Data: Pages visited, songs streamed, and interaction patterns.</li>
            <li>Device Information: Browser type, operating system, and IP address for security.</li>
            <li>Cookies: Essential cookies for site functionality and preferences.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black uppercase tracking-widest text-black mb-4">2. How We Use Your Data</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            The data we collect is used strictly to improve the platform, ensure security, and curate trending music charts globally. We do NOT sell your personal data to third-party data brokers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black uppercase tracking-widest text-black mb-4">3. Third-Party Services</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            We may use trusted third-party analytics to understand how users interact with our platform. These services adhere to strict data privacy guidelines and do not track you across the internet unnecessarily.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black uppercase tracking-widest text-black mb-4">4. Contact Us</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            If you have any questions or concerns regarding this Privacy Policy, please contact us at <a href="mailto:zedtuneza@gmail.com" className="text-black font-bold border-b-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-colors">zedtuneza@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
