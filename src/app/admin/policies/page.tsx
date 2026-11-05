'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PoliciesAdmin() {
  const [policies, setPolicies] = useState({ privacy: '', terms: '', cookies: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchPolicies() {
      try {
        const res = await fetch('/api/policies');
        const data = await res.json();
        setPolicies(data);
      } catch (e) {
        console.error('Failed to load policies', e);
      } finally {
        setLoading(false);
      }
    }
    fetchPolicies();
  }, []);

  const handleChange = (key: keyof typeof policies) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPolicies({ ...policies, [key]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(policies),
      });
      if (res.ok) {
        setMessage('Policies saved successfully!');
      } else {
        setMessage('Failed to save policies.');
      }
    } catch {
      setMessage('Error saving policies.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center text-sm font-light">
        Loading Policies...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <Link
              href="/admin"
              className="text-xs uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors mb-2 inline-block"
            >
              ← Back to Studio Portal
            </Link>
            <h1 className="text-2xl sm:text-3xl font-light">Legal &amp; Policy Management</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-amber-400 hover:bg-amber-300 text-black px-6 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Policies'}
          </button>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs">
            {message}
          </div>
        )}

        <div className="space-y-8">
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="privacy" className="text-xs uppercase tracking-wider text-white/80 font-semibold">
                Privacy Policy
              </label>
              <Link href="/privacy" target="_blank" className="text-[10px] text-amber-400 hover:underline">
                View live page ↗
              </Link>
            </div>
            <textarea
              id="privacy"
              rows={8}
              value={policies.privacy}
              onChange={handleChange('privacy')}
              className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 font-mono leading-relaxed"
            />
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="terms" className="text-xs uppercase tracking-wider text-white/80 font-semibold">
                Terms &amp; Conditions
              </label>
              <Link href="/terms" target="_blank" className="text-[10px] text-amber-400 hover:underline">
                View live page ↗
              </Link>
            </div>
            <textarea
              id="terms"
              rows={8}
              value={policies.terms}
              onChange={handleChange('terms')}
              className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 font-mono leading-relaxed"
            />
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="cookies" className="text-xs uppercase tracking-wider text-white/80 font-semibold">
                Cookies Policy
              </label>
              <Link href="/cookies" target="_blank" className="text-[10px] text-amber-400 hover:underline">
                View live page ↗
              </Link>
            </div>
            <textarea
              id="cookies"
              rows={8}
              value={policies.cookies}
              onChange={handleChange('cookies')}
              className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 font-mono leading-relaxed"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
