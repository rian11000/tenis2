/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Product, FilterState } from '../types';
import { PRODUCTS } from '../data';

interface MensSneakersViewProps {
  onSelectProduct: (product: Product) => void;
}

export default function MensSneakersView({ onSelectProduct }: MensSneakersViewProps) {
  // Filter state
  const [selectedSize, setSelectedSize] = useState<number | null>(9); // Default size 9 selected (from image)
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'release' | 'price-asc' | 'price-desc'>('release');
  
  // Section expand/collapse (from the '+' indicators in screenshot)
  const [expandSize, setExpandSize] = useState(true);
  const [expandColor, setExpandColor] = useState(true);
  const [expandPrice, setExpandPrice] = useState(true);

  // Available options
  const sizes = [7, 8, 9, 10, 11, 12];
  const colors = [
    { name: 'white', class: 'bg-white border border-neutral-700' },
    { name: 'black', class: 'bg-black border border-neutral-800' },
    { name: 'grey', class: 'bg-neutral-500 border border-neutral-600' },
    { name: 'orange', class: 'bg-brand-orange' }
  ];
  const priceRanges = [
    { label: '$100 - $250', value: '100-250' },
    { label: '$250 - $500', value: '250-500' },
    { label: '$500+', value: '500-above' }
  ];

  const handlePriceCheckboxChange = (value: string) => {
    if (selectedPriceRanges.includes(value)) {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== value));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, value]);
    }
  };

  const handleClearFilters = () => {
    setSelectedSize(null);
    setSelectedColor(null);
    setSelectedPriceRanges([]);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    // Only fetch men or unisex sneakers/boots
    let result = PRODUCTS.filter(
      (p) => (p.gender === 'men' || p.gender === 'unisex') && p.id !== 'vault-nocturnal'
    );

    // Apply Size Filter
    if (selectedSize !== null) {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    // Apply Color Filter
    if (selectedColor !== null) {
      result = result.filter((p) => p.colors.includes(selectedColor));
    }

    // Apply Price Range Filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) => {
        return selectedPriceRanges.some((range) => {
          if (range === '100-250') return p.price >= 100 && p.price <= 250;
          if (range === '250-500') return p.price >= 250 && p.price <= 500;
          if (range === '500-above') return p.price > 500;
          return true;
        });
      });
    }

    // Apply Sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedSize, selectedColor, selectedPriceRanges, sortBy]);

  // Helper to split a name into brutalist stacked lines (e.g. "VAULT-01" "URBAN")
  const splitName = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return {
        part1: parts[0],
        part2: parts.slice(1).join(' ')
      };
    }
    return { part1: name, part2: '' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="mens-sneakers-view">
      {/* Page Title Header */}
      <div className="mb-12 border-b border-[#1a1a1a] pb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-6">
        <div>
          <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-stone-100 tracking-tight leading-none uppercase">
            MENS SNEAKERS
          </h1>
          <p className="font-mono text-xs tracking-[0.2em] text-stone-500 uppercase mt-3">
            HIGH-PERFORMANCE BRUTALIST FOOTWEAR / UNDERGROUND ARCHIVE
          </p>
        </div>

        {/* Sorting controls */}
        <div className="flex items-center space-x-6 font-mono text-xs text-stone-400">
          <span className="text-stone-600 uppercase">Sorting:</span>
          <button
            onClick={() => setSortBy('release')}
            className={`transition-colors uppercase ${
              sortBy === 'release' ? 'text-stone-100 border-b-2 border-stone-300 pb-1 font-medium' : 'hover:text-stone-200'
            }`}
            id="sort-release-btn"
          >
            Release Date
          </button>
          <button
            onClick={() => setSortBy(sortBy === 'price-asc' ? 'price-desc' : 'price-asc')}
            className={`transition-colors uppercase ${
              sortBy !== 'release' ? 'text-stone-100 border-b-2 border-stone-300 pb-1 font-medium' : 'hover:text-stone-200'
            }`}
            id="sort-price-btn"
          >
            Price {sortBy === 'price-asc' ? '↑' : sortBy === 'price-desc' ? '↓' : ''}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        {/* LEFT SIDEBAR FILTERS */}
        <div className="lg:col-span-1 space-y-8 bg-[#0a0a0a]/50 p-6 border border-[#1a1a1a] lg:sticky lg:top-24">
          
          {/* SIZE FILTER */}
          <div className="space-y-4">
            <button
              onClick={() => setExpandSize(!expandSize)}
              className="w-full flex items-center justify-between font-mono text-xs font-bold uppercase text-stone-300 tracking-wider pb-2 border-b border-[#1a1a1a]"
              id="filter-size-toggle"
            >
              <span>Size (US Men)</span>
              <span>{expandSize ? '−' : '+'}</span>
            </button>
            {expandSize && (
              <div className="grid grid-cols-3 gap-2 pt-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`font-mono text-xs py-2.5 text-center transition-all ${
                      selectedSize === size
                        ? 'bg-stone-200 text-black font-bold border border-stone-850'
                        : 'bg-[#050505] border border-[#1a1a1a] text-stone-400 hover:text-stone-200 hover:border-stone-600'
                    }`}
                    id={`filter-size-${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* COLOR FILTER */}
          <div className="space-y-4">
            <button
              onClick={() => setExpandColor(!expandColor)}
              className="w-full flex items-center justify-between font-mono text-xs font-bold uppercase text-stone-300 tracking-wider pb-2 border-b border-[#1a1a1a]"
              id="filter-color-toggle"
            >
              <span>Color</span>
              <span>{expandColor ? '−' : '+'}</span>
            </button>
            {expandColor && (
              <div className="flex flex-wrap gap-3 pt-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                    className={`h-7 w-7 rounded-none transition-all relative ${color.class} ${
                      selectedColor === color.name
                        ? 'ring-2 ring-stone-200 ring-offset-2 ring-offset-[#0a0a0a] scale-110'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={color.name}
                    aria-label={`Filter by color ${color.name}`}
                    id={`filter-color-${color.name}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* PRICE FILTER */}
          <div className="space-y-4">
            <button
              onClick={() => setExpandPrice(!expandPrice)}
              className="w-full flex items-center justify-between font-mono text-xs font-bold uppercase text-stone-300 tracking-wider pb-2 border-b border-[#1a1a1a]"
              id="filter-price-toggle"
            >
              <span>Price</span>
              <span>{expandPrice ? '−' : '+'}</span>
            </button>
            {expandPrice && (
              <div className="space-y-3 pt-2">
                {priceRanges.map((range) => (
                  <label
                    key={range.value}
                    className="flex items-center space-x-3 cursor-pointer text-xs text-stone-400 hover:text-stone-200 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(range.value)}
                      onChange={() => handlePriceCheckboxChange(range.value)}
                      className="form-checkbox bg-[#050505] border-[#1a1a1a] text-stone-300 rounded-none focus:ring-0 focus:ring-offset-0 h-4 w-4"
                      id={`filter-price-check-${range.value}`}
                    />
                    <span className="font-mono">{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* CLEAR FILTERS */}
          <button
            onClick={handleClearFilters}
            className="w-full border border-[#1a1a1a] hover:border-stone-500 text-stone-400 hover:text-stone-200 font-mono text-[10px] py-3 tracking-widest uppercase transition-all"
            id="filter-clear-btn"
          >
            Clear Filters
          </button>
        </div>

        {/* RIGHT PRODUCT GRID */}
        <div className="lg:col-span-3 space-y-12">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => {
                const isSoldOut = p.tags.includes('Sold Out');
                const isNewArrival = p.tags.includes('New Arrival');
                const isLimited = p.tags.includes('Limited Release') || p.tags.includes('Limited');
                const nameParts = splitName(p.name);

                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="group cursor-pointer flex flex-col justify-between h-full bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] transition-all duration-300"
                    id={`product-card-${p.id}`}
                  >
                    {/* Image Box */}
                    <div className="relative aspect-square bg-[#050505] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                      
                      {/* Tags */}
                      <div className="absolute top-4 left-4">
                        {isSoldOut ? (
                          <span className="bg-[#151515]/95 text-stone-400 border border-[#222] font-mono text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase">
                            Sold Out
                          </span>
                        ) : isNewArrival ? (
                          <span className="bg-stone-200 text-black border border-stone-850 font-mono text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase">
                            New Arrival
                          </span>
                        ) : isLimited ? (
                          <span className="bg-stone-200 text-black border border-stone-850 font-mono text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase">
                            Limited Release
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Brutalist stacked label block exactly as in screenshot */}
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="font-serif italic text-lg sm:text-xl leading-[0.95] text-stone-100">
                          <p>{nameParts.part1}</p>
                          <p className="text-stone-500">{nameParts.part2}</p>
                        </div>
                        <div className="font-mono text-sm text-stone-300 font-bold">
                          ${p.price.toFixed(0)}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-[#1a1a1a] font-mono text-[10px] text-stone-500 uppercase tracking-wider">
                        {p.colorway}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 border border-[#1a1a1a] bg-[#0a0a0a]/50 p-8">
              <p className="font-mono text-xs text-stone-500 uppercase tracking-widest">
                No archival records match your filter criteria.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 border border-[#1a1a1a] hover:border-stone-500 text-stone-300 font-mono text-xs px-6 py-2.5 transition-colors uppercase"
                id="no-results-clear-btn"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Bottom Pagination / Load More */}
          <div className="border-t border-[#1a1a1a] pt-10 flex flex-col items-center space-y-4">
            <span className="font-mono text-[10px] text-stone-600 uppercase tracking-widest">
              Showing {filteredProducts.length} of 42 sneakers
            </span>
            <button
              className="border border-stone-800 text-stone-300 hover:bg-stone-200 hover:text-black font-sans text-xs font-bold py-4 px-8 tracking-widest transition-all duration-300 uppercase rounded-none"
              id="load-more-btn"
            >
              Load More Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
