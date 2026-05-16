import { notFound } from 'next/navigation';

export default function Custom404Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-white/50">Sorry, we couldn't find the page you're looking for.</p>
    </div>
  );
}
