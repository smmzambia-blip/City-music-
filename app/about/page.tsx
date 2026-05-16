export const metadata = { title: 'About Us | ZedTunes' };

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6">
      <div className="mb-16 border-b border-zinc-100 pb-8 text-center sm:text-left">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-4 text-black">
          About <span className="text-[var(--color-primary)] bg-black px-4 leading-normal inline-block transform -skew-y-2 mt-2 sm:mt-0">ZedTunes</span>
        </h1>
        <p className="text-xl text-zinc-500 font-bold uppercase tracking-widest mt-6">
          Zambia's Pure Music Experience
        </p>
      </div>

      <div className="prose prose-zinc prose-lg max-w-none">
        <p className="text-zinc-600 font-medium leading-relaxed text-balance text-lg">
          ZedTunes is the fastest modern, SEO-optimized music platform in Zambia. 
          Our mission is to connect artists and listeners through a seamless, 
          beautiful, and blazing-fast streaming and download experience.
        </p>

        <h3 className="text-2xl font-black uppercase tracking-widest text-black mt-12 mb-4">Our Vision</h3>
        <p className="text-zinc-600 font-medium leading-relaxed">
          We believe that Zambian music deserves a world-class platform. For too long, local music has been distributed on clunky, ad-filled, and slow websites. ZedTunes changes that. We built a platform that puts the music first—high fidelity audio, instant page loads, and a design that respects the craft of our artists.
        </p>

        <h3 className="text-2xl font-black uppercase tracking-widest text-black mt-12 mb-4">For The Artists</h3>
        <p className="text-zinc-600 font-medium leading-relaxed">
          We support the culture. ZedTunes gives artists a clean, professional space to showcase their latest hits. From emerging talents in the underground to established industry giants, this platform is engineered to amplify your reach. 
        </p>
        
        <div className="bg-zinc-50 border-l-4 border-[var(--color-primary)] p-6 rounded-r-2xl mt-8">
          <p className="text-black font-black italic tracking-tight m-0 text-xl">
            "Built for the culture, engineered for speed."
          </p>
        </div>
      </div>
    </div>
  );
}
