import type { Metadata } from 'next';
import Link from 'next/link';
import policies from '@/data/policies.json';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Nidhivan Design Studio',
  description: 'Terms and Conditions for Nidhivan Design Studio.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white selection:bg-amber-400 selection:text-black py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors mb-12"
        >
          ← Return to Studio
        </Link>
        <span className="block text-xs uppercase tracking-[0.3em] text-white/50 mb-3 font-medium">
          Legal &amp; Transparency
        </span>
        <h1 className="text-3xl sm:text-5xl font-light tracking-tight mb-8">
          Terms &amp; Conditions
        </h1>
        <div className="w-12 h-px bg-amber-400/40 mb-10"></div>
        <div className="text-white/80 font-light leading-relaxed whitespace-pre-line space-y-6 text-sm sm:text-base">
          {policies.terms}
        </div>
      </div>
    </main>
  );
}
