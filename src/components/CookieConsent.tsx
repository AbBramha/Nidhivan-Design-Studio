'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'nidhivan_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        setVisible(true);
      }
    } catch {
      // LocalStorage access may fail in some environments
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    } catch {}
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-[#121212]/95 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl z-50 text-white animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1.5">
            Cookie Preferences
          </h4>
          <p className="text-xs text-white/70 leading-relaxed font-light">
            We use essential cookies to enhance your experience on our website. Review our{' '}
            <Link href="/cookies" className="underline hover:text-white transition-colors">
              Cookies Policy
            </Link>{' '}
            for full details.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/5">
        <button
          onClick={accept}
          className="flex-1 bg-white hover:bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="px-4 py-2.5 rounded-xl border border-white/15 text-white/60 hover:text-white hover:bg-white/5 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
