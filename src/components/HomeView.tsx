/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Volume2, Image as ImageIcon, Sparkles, X } from 'lucide-react';
import { Product, BlogItem, ActiveView } from '../types';
import { PRODUCTS, BLOG_POSTS, HERO_IMAGE } from '../data';

interface HomeViewProps {
  onSelectProduct: (product: Product) => void;
  setActiveView: (view: ActiveView) => void;
}

export default function HomeView({ onSelectProduct, setActiveView }: HomeViewProps) {
  const [activeArticle, setActiveArticle] = useState<BlogItem | null>(null);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

  // Filter 4 key products for the New Arrivals grid (matching first image)
  // VLT-01 PROTOTYPE (let's use vault-06-archive), Canyon Tech Boot, Steel Link Wallet, Core Heavy Hoodie
  const arrivalProductIds = ['vault-06-archive', 'canyon-tech-boot', 'steel-link-wallet', 'core-heavy-hoodie'];
  const arrivalProducts = PRODUCTS.filter((p) => arrivalProductIds.includes(p.id))
    // Keep the specified order:
    .sort((a, b) => arrivalProductIds.indexOf(a.id) - arrivalProductIds.indexOf(b.id));

  return (
    <div className="space-y-24 pb-20 animate-in fade-in duration-500" id="home-view-container">
      {/* 1. HERO BANNER */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-start overflow-hidden">
        {/* Background Image with dramatic gradient vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="STREET LEGACY"
            className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110 saturate-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-[#050505]/20 to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            <p className="font-mono text-xs tracking-[0.3em] text-stone-500 uppercase">
              [ Drop 004 / Limited ]
            </p>
            <h1 className="font-serif italic text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-stone-100 uppercase">
              Street <br />
              Legacy<span className="text-stone-600 font-sans not-italic">.</span>
            </h1>
            <p className="font-sans text-sm sm:text-base text-stone-400 leading-relaxed max-w-lg font-light">
              High-performance tactical footwear engineered for urban navigation. Heavy modular treads meets brutalist geometry.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setActiveView('men');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-stone-200 hover:bg-white text-black font-sans text-xs font-bold px-8 py-4 tracking-widest transition-all duration-200 uppercase rounded-none border border-stone-850"
                id="hero-shop-now-btn"
              >
                Shop Now
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('culture-ethos');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-stone-800 hover:bg-stone-900/40 text-stone-300 font-sans text-xs px-8 py-4 tracking-widest transition-all duration-200 uppercase rounded-none"
                id="hero-lookbook-btn"
              >
                Lookbook
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECENT RELEASES / NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-baseline border-b border-[#1a1a1a] pb-6 mb-12">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-stone-500 uppercase">Recent Releases</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 italic tracking-tight">New Arrivals</h2>
          </div>
          <button
            onClick={() => {
              setActiveView('men');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-mono text-[10px] tracking-widest text-stone-500 hover:text-stone-300 transition-colors border-b border-stone-850 hover:border-stone-500 pb-1"
            id="home-view-all-releases"
          >
            VIEW ALL RELEASES
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {arrivalProducts.map((p, index) => {
            const isSoldOut = p.tags.includes('Sold Out');
            const isLimited = p.tags.includes('Limited Release') || p.tags.includes('Limited');
            return (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="group cursor-pointer flex flex-col h-full bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden hover:border-[#333] transition-all duration-300"
                id={`home-product-card-${p.id}`}
              >
                {/* Image Wrap */}
                <div className="relative aspect-square w-full bg-[#050505] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isSoldOut && (
                      <span className="bg-[#151515]/95 text-stone-400 border border-[#222] font-mono text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase">
                        Sold Out
                      </span>
                    )}
                    {!isSoldOut && isLimited && (
                      <span className="bg-stone-200 text-black border border-stone-850 font-mono text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase">
                        Limited
                      </span>
                    )}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-serif italic text-lg text-stone-200 group-hover:text-stone-100 transition-colors">
                      {p.name}
                    </h3>
                    <span className="font-mono text-[11px] text-stone-600">
                      /{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1a1a1a] flex justify-between items-baseline">
                    <span className="font-mono text-xs text-stone-500">{p.colorway}</span>
                    <span className="font-mono text-sm text-stone-300 font-bold">
                      ${p.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CULTURE & ETHOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="culture-ethos">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center border-t border-[#1a1a1a] pt-20">
          {/* Left Text */}
          <div className="space-y-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-stone-500 uppercase">
              Culture & Ethos
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-stone-100 italic tracking-tight leading-tight">
              BEYOND THE HYPE CYCLE<span className="text-stone-600 font-sans not-italic text-sm ml-4 uppercase tracking-[0.2em]">ETHOS</span>
            </h2>
            <p className="font-sans text-sm text-stone-500 leading-relaxed max-w-lg font-light">
              VAULT is an exploration of the underground. We don&apos;t follow trends; we archive moments. Every piece is a testament to the raw energy of urban subcultures—where architecture meets the street, and resilience meets design.
            </p>
            
            <button
              onClick={() => setIsManifestoOpen(true)}
              className="group flex items-center space-x-4 pt-4"
              id="manifesto-trigger"
            >
              <div className="h-12 w-12 rounded-full border border-[#1a1a1a] group-hover:border-stone-200 group-hover:bg-stone-200 group-hover:text-black text-stone-300 flex items-center justify-center transition-all duration-300">
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-serif text-sm font-semibold text-stone-300 tracking-widest uppercase border-b border-transparent group-hover:border-stone-300 pb-1 transition-all duration-300">
                READ THE MANIFESTO
              </span>
            </button>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {/* Audio Archive / 001 */}
            <div className="space-y-4 group">
              <div className="relative aspect-[4/5] w-full bg-[#050505] overflow-hidden border border-[#1a1a1a] group-hover:border-[#333] transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800"
                  alt="DJ Decks / Underground Studio"
                  className="w-full h-full object-cover scale-102 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/20" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#050505]/95 backdrop-blur-md border border-[#1a1a1a] p-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-stone-300 font-bold tracking-wider">AUDIO ARCHIVE / 001</span>
                  <Volume2 className="h-4 w-4 text-stone-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Visual Study / 042 */}
            <div className="space-y-4 sm:translate-y-12 group">
              <div className="relative aspect-[4/5] w-full bg-[#050505] overflow-hidden border border-[#1a1a1a] group-hover:border-[#333] transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1548504769-900b70ed122e?auto=format&fit=crop&q=80&w=800"
                  alt="Concrete Ramp Architecture"
                  className="w-full h-full object-cover scale-102 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-stone-200 text-black border border-stone-850 font-mono text-[9px] font-bold tracking-widest px-3 py-1.5 uppercase">
                  VISUAL STUDY / 042
                </div>
                <div className="absolute inset-0 bg-neutral-950/20" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#050505]/95 backdrop-blur-md border border-[#1a1a1a] p-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-stone-300 font-bold tracking-wider">BRUTALIST RAMPS</span>
                  <ImageIcon className="h-4 w-4 text-stone-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE CULTURE BLOG SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a] pt-20">
        <div className="flex flex-col space-y-2 mb-12">
          <div className="flex items-center space-x-2 text-stone-500 font-mono text-xs">
            <span className="w-8 h-[1px] bg-stone-800" />
            <span className="tracking-widest">THE ARCHIVES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 italic tracking-tight uppercase">
            THE CULTURE
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="cursor-pointer group flex flex-col justify-between p-6 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] hover:bg-[#050505]/50 transition-all duration-300"
              id={`blog-card-${post.id}`}
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-stone-500 font-semibold block">{post.date}</span>
                <h3 className="font-serif italic text-xl sm:text-2xl text-stone-200 leading-tight group-hover:text-stone-100 transition-colors">
                  {post.title}
                </h3>
                <p className="font-sans text-xs text-stone-500 leading-relaxed font-light">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#1a1a1a] flex items-center space-x-2 text-stone-600 group-hover:text-stone-300 transition-colors">
                <span className="font-mono text-[10px] tracking-widest uppercase">READ ARCHIVE LOG</span>
                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 relative text-stone-300">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute right-4 top-4 text-stone-500 hover:text-stone-100 p-2"
              id="blog-modal-close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-6">
              <span className="font-mono text-xs text-stone-500 block">{activeArticle.date}</span>
              <h2 className="font-serif italic text-3xl text-stone-100 tracking-tight">{activeArticle.title}</h2>
              <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">{activeArticle.subtitle}</p>
              {activeArticle.image && (
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-64 object-cover border border-[#1a1a1a]"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="font-sans text-sm text-stone-400 space-y-4 leading-relaxed font-light">
                <p>
                  This special entry from the Vault Archive deep dives into the core layers of our current design philosophy. Brutalist architecture was more than a construction choice; it was an raw, honest declaration of structural truth.
                </p>
                <p>
                  Our design process mirrors these historic structures. We use heavy, untreated raw materials, exposed structural seams, and thick geometric outlines. The goal is to build pieces that do not deteriorate with time but gather story, scars, and patina.
                </p>
                <p>
                  As urban landscapes continue to dense-up, our gear offers an adaptive shelter. Comfortable, insulated, high-traction, and built to survive in extreme tarmac conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manifesto Reader Modal */}
      {isManifestoOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 relative text-stone-300">
            <button
              onClick={() => setIsManifestoOpen(false)}
              className="absolute right-4 top-4 text-stone-500 hover:text-stone-100 p-2"
              id="manifesto-modal-close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-6">
              <p className="font-mono text-xs text-stone-500 uppercase tracking-[0.2em]">[ Vault Manifesto / Key-001 ]</p>
              <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight uppercase text-stone-100">
                THE SUBSTRATUM RULES.
              </h2>
              <div className="font-sans text-sm text-stone-400 space-y-6 leading-relaxed font-light">
                <p className="text-stone-200 font-serif text-lg italic border-l-2 border-stone-500 pl-4">
                  &quot;Style is transient. Form is architectural. Authenticity is immutable.&quot;
                </p>
                <p>
                  In a world dominated by rapid production, algorithmic trends, and artificial hype, VAULT stands as an anchor. We build for the substratum—for those who run, design, code, and live in the margins of the city.
                </p>
                <p>
                  We believe in <strong>Deconstructed Functionalism</strong>. We expose structural components rather than wrapping them in colorful polymer shells. We choose concrete greys, obsidian blacks, and high-tensile cords because they speak of purpose, endurance, and honesty.
                </p>
                <p>
                  Our releases are categorized as &quot;Archives&quot; rather than seasonal collections. We create micro-batches with high precision. When an archive key is locked, it represents a preserved moment of urban history.
                </p>
                <p>
                  Welcome to the Underground. Welcome to VAULT.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
