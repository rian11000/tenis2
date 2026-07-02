/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product, ActiveView } from '../types';
import { PRODUCTS } from '../data';

interface CollectionsViewProps {
  onSelectProduct: (product: Product) => void;
  setActiveView: (view: ActiveView) => void;
}

export default function CollectionsView({ onSelectProduct, setActiveView }: CollectionsViewProps) {
  // Collections lists:
  const signatureProducts = PRODUCTS.filter((p) => p.tags.includes('Signature Series'));
  const technicalProducts = PRODUCTS.filter((p) => p.tags.includes('Technical'));
  const limitedProducts = PRODUCTS.filter((p) => p.tags.includes('Limited Release') || p.tags.includes('Limited'));

  const collections = [
    {
      id: 'signature',
      title: 'SIGNATURE SERIES',
      subtitle: 'VOL. 01 / PREMIUM SPECIFICATION',
      description: 'The highest expression of our design language. Exquisite materials, numbered releases, and deconstructed modular aesthetics.',
      items: signatureProducts,
      viewTarget: 'men' as ActiveView
    },
    {
      id: 'tactical',
      title: 'TACTICAL / BRUTALIST SERIES',
      subtitle: 'GEOMETRIC CUSHIONING & REINFORCED SEAMS',
      description: 'Built for defensive heavy utility. Complete water-resistance, high-density foam structures, and aggressive Commando soles.',
      items: technicalProducts,
      viewTarget: 'women' as ActiveView
    },
    {
      id: 'limited',
      title: 'LIMITED ARCHIVE DROPS',
      subtitle: 'ONE-TIME DECONSTRUCTED BATCHES',
      description: 'Micro-runs exploring extreme design constraints. Unbleached canvases, steel harness-buckles, and architectural heels.',
      items: limitedProducts,
      viewTarget: 'men' as ActiveView
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="collections-view">
      {/* Title */}
      <div className="border-b border-[#1a1a1a] pb-10 mb-16">
        <h1 className="font-serif italic text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight text-stone-100 uppercase">
          COLLECTIONS
        </h1>
        <p className="font-mono text-xs tracking-[0.2em] text-stone-500 uppercase mt-4">
          ARCHIVAL DIRECTORY / ACTIVE DROPS / DESIGN MATRIX
        </p>
      </div>

      {/* Grid of collections */}
      <div className="space-y-24">
        {collections.map((col, index) => (
          <div
            key={col.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#1a1a1a] pb-20 last:border-b-0"
            id={`collection-section-${col.id}`}
          >
            {/* Info */}
            <div className={`lg:col-span-5 space-y-6 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
              <div className="flex items-center space-x-2 text-stone-500 font-mono text-xs">
                <span>[ DROP {index + 1} ]</span>
                <span className="w-8 h-[1px] bg-[#1a1a1a]" />
              </div>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-stone-100 tracking-tight leading-none uppercase">
                {col.title}
              </h2>
              <p className="font-mono text-xs text-stone-500 uppercase tracking-widest leading-normal">
                {col.subtitle}
              </p>
              <p className="font-sans text-sm text-stone-400 leading-relaxed font-light">
                {col.description}
              </p>
              <button
                onClick={() => {
                  setActiveView(col.viewTarget);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex items-center space-x-4 pt-4"
                id={`collection-link-${col.id}`}
              >
                <div className="h-10 w-10 rounded-full border border-[#1a1a1a] group-hover:border-stone-200 group-hover:bg-stone-200 group-hover:text-black text-stone-300 flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="font-serif italic text-xs text-stone-300 tracking-widest uppercase pb-0.5 border-b border-transparent group-hover:border-stone-300 transition-all">
                  BROWSE SPECIFICATIONS
                </span>
              </button>
            </div>

            {/* Showcase Grid of Items */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {col.items.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectProduct(item)}
                  className="group cursor-pointer bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] transition-all p-4"
                >
                  <div className="aspect-square bg-[#050505] overflow-hidden relative mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-serif italic text-sm text-stone-200 truncate uppercase">
                    {item.name}
                  </h3>
                  <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mt-0.5 truncate">
                    {item.colorway}
                  </p>
                  <p className="font-mono text-xs text-stone-400 font-bold mt-2">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
