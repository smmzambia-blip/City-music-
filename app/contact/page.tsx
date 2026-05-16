import React from 'react';

export const metadata = { title: 'Contact Us | ZedTunes' };

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4 text-black">Contact <span className="text-[#00FF00]">Us</span></h1>
        <p className="text-lg text-zinc-500 font-medium">Have questions, feedback, or need support? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-black text-[#00FF00] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-widest text-black mb-1">WhatsApp</h3>
            <p className="text-sm font-medium text-zinc-500 mb-4">Fastest way to reach us!</p>
            <a href="https://wa.me/+260975232473" target="_blank" rel="noopener noreferrer" className="inline-block text-black font-black uppercase tracking-widest text-xs border-b-2 border-[#00FF00] hover:bg-[#00FF00] hover:text-black transition-all">wa.me/+260975232473</a>
          </div>

          <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-black text-[#00FF00] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-widest text-black mb-1">Phone Line</h3>
            <p className="text-sm font-medium text-zinc-500 mb-4">Available 9am to 6pm CAT.</p>
            <a href="tel:+260975232473" className="inline-block text-black font-black uppercase tracking-widest text-xs border-b-2 border-[#00FF00] hover:bg-[#00FF00] hover:text-black transition-all">+260 975 232 473</a>
          </div>

          <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-black text-[#00FF00] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-widest text-black mb-1">Email</h3>
            <p className="text-sm font-medium text-zinc-500 mb-4">For business, copyright & support.</p>
            <a href="mailto:zedtuneza@gmail.com" className="inline-block text-black font-black uppercase tracking-widest text-xs border-b-2 border-[#00FF00] hover:bg-[#00FF00] hover:text-black transition-all">zedtuneza@gmail.com</a>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-zinc-100 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-6 text-black border-b border-zinc-100 pb-4">Drop us a Line</h2>
          <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Name</label>
              <input 
                type="text" 
                placeholder="Your full name"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Email</label>
              <input 
                type="email" 
                placeholder="your@email.com"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent transition-all font-medium"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Subject</label>
            <input 
              type="text" 
              placeholder="What is this regarding?"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Message</label>
            <textarea 
              rows={5}
              placeholder="Tell us everything..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent transition-all font-medium resize-none"
            ></textarea>
          </div>

          <button 
            type="button"
            className="w-full bg-black text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#00FF00] hover:text-black transition-colors shadow-lg active:scale-[0.99] transform"
          >
            Send Message
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
