/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#050505] text-stone-300 border-t border-[#1a1a1a] pt-20 pb-12 mt-auto" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="font-serif italic text-2xl tracking-tight text-stone-100">VAULT UNDERGROUND</h2>
          <p className="font-sans text-xs text-stone-500 leading-relaxed max-w-xs">
            A synthesis of architectural brutalism and street authenticity. Designed for those who operate in the margins. Street archives and limited apparel. Built for the substratum.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 font-mono text-[10px] text-stone-600 uppercase">
            <a href="#instagram" className="hover:text-stone-300 transition-colors">Instagram</a>
            <span>•</span>
            <a href="#tiktok" className="hover:text-stone-300 transition-colors">Tiktok</a>
            <span>•</span>
            <a href="#discord" className="hover:text-stone-300 transition-colors">Discord</a>
          </div>
        </div>

        {/* Service Column */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-bold tracking-wider text-stone-500 uppercase">Service</h3>
          <ul className="space-y-2 font-sans text-xs text-stone-400">
            <li><a href="#shipping" className="hover:text-stone-100 transition-colors">Shipping Info</a></li>
            <li><a href="#returns" className="hover:text-stone-100 transition-colors">Returns & Exchanges</a></li>
            <li><a href="#authentication" className="hover:text-stone-100 transition-colors">Authentication Guarantee</a></li>
            <li><a href="#registry" className="hover:text-stone-100 transition-colors">Archival Registry</a></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-bold tracking-wider text-stone-500 uppercase">Legal</h3>
          <ul className="space-y-2 font-sans text-xs text-stone-400">
            <li><a href="#privacy" className="hover:text-stone-100 transition-colors">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-stone-100 transition-colors">Terms of Service</a></li>
            <li><a href="#cookies" className="hover:text-stone-100 transition-colors">Cookie Preferences</a></li>
            <li><a href="#shipping-terms" className="hover:text-stone-100 transition-colors">Shipping Terms</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-bold tracking-wider text-stone-500 uppercase">Join the Registry</h3>
          <p className="font-sans text-xs text-stone-500 leading-relaxed">
            Subscribe to receive direct notifications of limited drops and archive keys.
          </p>
          <form onSubmit={handleSubscribe} className="relative mt-2" id="footer-newsletter-form">
            <input
              type="email"
              placeholder={submitted ? "REGISTRATION RECEIVED" : "EMAIL@ADDRESS.COM"}
              disabled={submitted}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-[#0a0a0a] font-mono text-xs border ${
                submitted ? 'border-stone-700 text-stone-400' : 'border-[#1a1a1a] focus:border-stone-500'
              } text-stone-300 px-4 py-3 pr-10 rounded-none focus:outline-none transition-colors uppercase`}
              id="footer-email-input"
            />
            {!submitted ? (
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-3 text-stone-500 hover:text-stone-100 transition-colors flex items-center justify-center"
                aria-label="Submit Newsletter"
                id="footer-email-submit"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                <Check className="h-4 w-4" />
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row justify-between items-center gap-4 text-stone-600 font-mono text-[10px]">
        <div>
          ©2026 VAULT UNDERGROUND. ALL RIGHTS RESERVED.
        </div>
        <div className="tracking-widest uppercase">
          EST. 2012 / TOKYO / LONDON / NYC
        </div>
      </div>
    </footer>
  );
}
