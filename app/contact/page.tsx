import React from 'react';

export const metadata = { title: 'Contact Us | ZedTunes' };

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4 text-black">Contact <span className="text-[#00FF00]">Us</span></h1>
        <p className="text-lg text-zinc-500 font-medium">Have questions, feedback, or need support? We'd love to hear from you.</p>
      </div>

      <div className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-2xl">
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
  );
}
