export const metadata = { title: 'DMCA & Copyright | ZedTunes' };

export default function DMCAPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6">
      <div className="mb-16 border-b border-zinc-100 pb-8">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4 text-black">
          DMCA <span className="text-zinc-400">&amp; Copyright</span>
        </h1>
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">
          Infringement Reporting Policy
        </p>
      </div>

      <div className="space-y-10 text-zinc-600 font-medium leading-relaxed">
        <p className="text-lg">
          ZedTunes respects the intellectual property rights of creators, producers, and record labels. We comply with the Digital Millennium Copyright Act (DMCA) and expect our users to do the same. If you believe your copyrighted work has been infringed upon, please read the procedure below.
        </p>

        <div className="bg-red-50 border border-red-100 rounded-3xl p-8">
          <h2 className="text-xl font-black uppercase tracking-widest text-red-600 mb-4">Filing a Takedown Notice</h2>
          <p className="mb-6">
            To file a DMCA takedown notice, you must provide a written communication that includes the following:
          </p>
          <ul className="list-decimal pl-5 space-y-4 text-red-900/80">
            <li>A physical or electronic signature of a person authorized to act on behalf of the owner of the copyright.</li>
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Identification of the material that is claimed to be infringing, including the specific URL(s) on ZedTunes.</li>
            <li>Information reasonably sufficient to permit us to contact the complaining party (email, phone number, and address).</li>
            <li>A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the copyright owner.</li>
          </ul>
        </div>

        <section>
          <h2 className="text-xl font-black uppercase tracking-widest text-black mb-4">Submission</h2>
          <p>
            Please submit your DMCA notices directly to our copyright agent via email:
          </p>
          <div className="mt-4 inline-block font-black uppercase tracking-widest text-sm bg-black text-[#00FF00] px-6 py-4 rounded-xl shadow-lg">
            zedtuneza@gmail.com
          </div>
          <p className="mt-6 text-sm text-zinc-400 font-bold uppercase tracking-widest">
            Note: False claims may result in legal liability.
          </p>
        </section>
      </div>
    </div>
  );
}
