/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sparkles, Activity, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface WomensSneakersViewProps {
  onSelectProduct: (product: Product) => void;
}

export default function WomensSneakersView({ onSelectProduct }: WomensSneakersViewProps) {
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');

  // Available tags to filter (from screenshot tags)
  const filterTags = [
    { label: '[ ALL ]', value: null },
    { label: '[ SLEEK ]', value: 'Sleek' },
    { label: '[ TECHNICAL ]', value: 'Technical' },
    { label: '[ LIMITED ]', value: 'Limited' }
  ];

  // Filter products
  const filteredProducts = useMemo(() => {
    // Only fetch women or unisex sneakers/boots
    let result = PRODUCTS.filter(
      (p) => (p.gender === 'women' || p.gender === 'unisex') && p.id !== 'vault-nocturnal'
    );

    // Apply active filter tag
    if (activeFilterTag !== null) {
      result = result.filter((p) => p.tags.includes(activeFilterTag));
    }

    // Apply sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeFilterTag, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="womens-sneakers-view">
      
      {/* Header and Filter tags bar exactly as in screenshot */}
      <div className="border-b border-[#1a1a1a] pb-10 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        {/* Hollow Outline Header (From Third Image) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex flex-col">
            <h1 className="font-serif italic text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight text-stone-100 uppercase">
              Women&apos;s
            </h1>
            <h1 className="font-serif italic text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight text-stone-100 uppercase">
              Sneakers
            </h1>
          </div>
          <p className="font-mono text-xs tracking-[0.22em] text-stone-500 uppercase">
            THE ARCHIVE / SERIES 02 / AGGRESSIVE GEOMETRY
          </p>
        </div>

        {/* Action filter tags and sort selector on the right (From Third Image) */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row justify-start lg:justify-end items-start sm:items-center gap-6">
          {/* Quick Tags Filter (SLEEK, TECHNICAL, LIMITED) */}
          <div className="flex flex-wrap gap-2.5">
            {filterTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => setActiveFilterTag(tag.value)}
                className={`font-mono text-xs tracking-widest px-3 py-1.5 transition-all ${
                  activeFilterTag === tag.value
                    ? 'text-stone-100 border-b border-stone-400 font-bold scale-105'
                    : 'text-stone-500 hover:text-stone-300'
                }`}
                id={`women-tag-filter-${tag.value || 'all'}`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:block h-6 w-[1px] bg-[#1a1a1a]" />

          {/* Sort selection */}
          <div className="flex items-center space-x-4 font-mono text-[11px] text-stone-400">
            <SlidersHorizontal className="h-3.5 w-3.5 text-stone-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none text-stone-300 focus:ring-0 cursor-pointer font-mono text-[11px] uppercase py-1 pr-6 focus:outline-none"
              id="women-sort-select"
            >
              <option value="price-asc" className="bg-[#0a0a0a] text-stone-300">PRICE: LOW TO HIGH</option>
              <option value="price-desc" className="bg-[#0a0a0a] text-stone-300">PRICE: HIGH TO LOW</option>
              <option value="name" className="bg-[#0a0a0a] text-stone-300">MODEL NAME</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Archive Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const isNewArrival = p.tags.includes('New Arrival');
            const isLimited = p.tags.includes('Limited Edition') || p.tags.includes('Limited');
            const isSleek = p.tags.includes('Sleek');

            return (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="group cursor-pointer flex flex-col bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] transition-all duration-300"
                id={`women-product-card-${p.id}`}
              >
                {/* Photo frame */}
                <div className="relative aspect-[4/5] bg-[#050505] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Moody ambient shading overlay */}
                  <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors" />

                  {/* Decorative badge corner */}
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                    {isNewArrival && (
                      <span className="bg-stone-200 text-black border border-stone-850 font-mono text-[8px] font-bold tracking-widest px-2 py-0.5 uppercase">
                        NEW ARRIVAL
                      </span>
                    )}
                    {isLimited && (
                      <span className="bg-[#151515]/95 text-stone-400 border border-[#222] font-mono text-[8px] font-bold tracking-widest px-2 py-0.5 uppercase">
                        LIMITED RELEASE
                      </span>
                    )}
                    {isSleek && (
                      <span className="bg-[#151515]/95 text-stone-400 border border-[#222] font-mono text-[8px] tracking-widest px-2 py-0.5 uppercase">
                        SLEEK
                      </span>
                    )}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-serif italic text-lg sm:text-xl text-stone-200 group-hover:text-stone-100 transition-colors uppercase">
                      {p.name}
                    </h3>
                    <span className="font-mono text-sm text-stone-300 font-bold">
                      ${p.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mt-1">
                    {p.colorway}
                  </p>
                  
                  {/* Subtle hover prompt */}
                  <div className="mt-4 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-stone-600 group-hover:text-stone-300 transition-colors font-mono text-[9px] tracking-wider uppercase">
                    <span>VIEW ARCHIVAL BLUEPRINT</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 border border-[#1a1a1a] bg-[#0a0a0a]/50">
          <p className="font-mono text-xs text-stone-500 uppercase tracking-widest">
            No technical models found matching that category key.
          </p>
          <button
            onClick={() => setActiveFilterTag(null)}
            className="mt-4 border border-stone-800 hover:border-stone-500 text-stone-300 font-mono text-xs px-6 py-2.5 transition-colors uppercase"
            id="women-clear-tags-btn"
          >
            Show All Models
          </button>
        </div>
      )}

      {/* Info Notice (Brutalist style banner footer) */}
      <div className="mt-16 bg-[#0a0a0a] border border-[#1a1a1a] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h4 className="font-mono text-xs font-bold text-stone-300 uppercase tracking-wider">AUTHENTICITY ASSURED</h4>
          <p className="font-sans text-xs text-stone-500 max-w-xl font-light">
            Every piece in the Vault Underground Women&apos;s collection undergoes a manual triple-verification inspection. Raw stitching, sole flexibility, and serial keys are completely authenticated.
          </p>
        </div>
        <div className="flex space-x-3 text-stone-500 font-mono text-xs uppercase">
          <span>✓ STITCH LOCK</span>
          <span>•</span>
          <span>✓ SOLE SEAL</span>
        </div>
      </div>
    </div>
  );
}
