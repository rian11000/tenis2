/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Check, ChevronDown, ChevronUp, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: number) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetailView({
  product,
  onBack,
  onAddToCart,
  onSelectProduct,
}: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState<number>(9);
  const [activeAccordion, setActiveAccordion] = useState<'inspiration' | 'construction' | 'shipping' | null>('construction');
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Synchronize active image when product changes
  useEffect(() => {
    setActiveImage(product.image);
    // Standard size default fallback
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes.includes(9) ? 9 : product.sizes[0]);
    }
  }, [product]);

  // Filters other items from the "Signature Series" or category for "YOU MIGHT ALSO LIKE"
  const recommendationItems = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.tags.includes('Signature Series') || p.category === product.category)
  ).slice(0, 4);

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedSize);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 2500);
  };

  const allImages = [product.image, ...(product.additionalImages || [])];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="product-detail-view">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="group flex items-center space-x-2 text-stone-500 hover:text-stone-200 font-mono text-xs mb-8 transition-colors"
        id="detail-back-btn"
      >
        <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" />
        <span>BACK TO SEARCH ARCHIVES</span>
      </button>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: PHOTOS */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Main Image */}
          <div className="relative aspect-square w-full bg-[#050505] border border-[#1a1a1a] overflow-hidden">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.originalPrice && (
              <span className="absolute top-4 left-4 bg-stone-200 text-black border border-stone-850 font-mono text-[10px] font-bold tracking-widest px-3 py-1 uppercase">
                LIMITED SIGNATURE MARKDOWN
              </span>
            )}
          </div>

          {/* Row of Thumbnails (clicking swaps main photo) */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square w-full bg-[#050505] border overflow-hidden transition-all duration-200 ${
                    activeImage === img ? 'border-stone-400 opacity-100 scale-95' : 'border-[#1a1a1a] opacity-60 hover:opacity-100'
                  }`}
                  id={`detail-thumb-${idx}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail view ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: DETAILS & ACCORDIONS */}
        <div className="lg:col-span-5 space-y-8 text-stone-300">
          
          {/* Header indicators */}
          <div className="flex justify-between items-baseline border-b border-[#1a1a1a] pb-4 font-mono text-[10px] text-stone-500 uppercase tracking-widest">
            <span>SIGNATURE SERIES / LIMITED</span>
            <span>STATUS: AVAILABLE / SERIAL {product.modelCode}</span>
          </div>

          {/* Title & Price */}
          <div className="space-y-3">
            <h1 className="font-serif italic text-4xl sm:text-5xl leading-none tracking-tight text-stone-100 uppercase">
              {product.name}
            </h1>
            <div className="flex items-baseline space-x-4">
              <span className="font-mono text-2xl text-stone-300 font-bold">
                USD ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-sm text-stone-600 line-through">
                  USD ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="font-sans text-sm text-stone-500 leading-relaxed font-light">
            {product.description || 'A masterpiece of architectural design combined with advanced materials. Engineered for heavy urban durability and unmatched presence.'}
          </p>

          {/* SIZES PANEL */}
          {product.sizes && product.sizes[0] !== 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-xs text-stone-500 uppercase tracking-widest">SELECT SIZE (US)</span>
                <span className="font-mono text-xs text-stone-600">SIZE CHART</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`font-mono text-xs py-3 text-center transition-all ${
                      selectedSize === size
                        ? 'bg-stone-200 text-black font-bold border border-stone-850'
                        : 'bg-[#050505] border border-[#1a1a1a] text-stone-400 hover:text-stone-200 hover:border-stone-600'
                    }`}
                    id={`detail-size-${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ADD TO CONTAINER BUTTON */}
          <button
            onClick={handleAddToCartClick}
            disabled={addedFeedback}
            className={`w-full py-4 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
              addedFeedback
                ? 'bg-stone-850 text-stone-455 border-stone-800 cursor-default'
                : 'bg-stone-200 hover:bg-white text-black border-stone-850'
            }`}
            id="detail-add-to-cart-btn"
          >
            {addedFeedback ? '✓ CONTAINER LOADED' : 'ADD TO CONTAINER'}
          </button>

          {/* ACCORDIONS (01 / 02 / 03) */}
          <div className="space-y-3 pt-4 border-t border-[#1a1a1a]">
            
            {/* 01 / INSPIRATION */}
            <div className="border-b border-[#1a1a1a] pb-3">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'inspiration' ? null : 'inspiration')}
                className="w-full flex items-center justify-between text-left py-2 font-mono text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-stone-100 transition-colors"
                id="accordion-inspiration-btn"
              >
                <span>01 / INSPIRATION</span>
                <span>{activeAccordion === 'inspiration' ? '−' : '+'}</span>
              </button>
              {activeAccordion === 'inspiration' && (
                <div className="pt-2 pb-1 font-sans text-xs text-stone-500 leading-relaxed font-light space-y-2">
                  <p>
                    Inspired by architectural brutalism—concrete grids, massive monolithic blocks, structural honesty, and deconstructed layers. 
                  </p>
                  <p>
                    We built the shoe as a protective cage, reflecting the dark, mechanical landscape of global metropolis cultures. Perfect for navigations through wet tarmac, industrial alleys, and harsh late-night weather.
                  </p>
                </div>
              )}
            </div>

            {/* 02 / CONSTRUCTION (MATERIALS) */}
            <div className="border-b border-[#1a1a1a] pb-3">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'construction' ? null : 'construction')}
                className="w-full flex items-center justify-between text-left py-2 font-mono text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-stone-100 transition-colors"
                id="accordion-construction-btn"
              >
                <span>02 / CONSTRUCTION &amp; DETAILS</span>
                <span>{activeAccordion === 'construction' ? '−' : '+'}</span>
              </button>
              {activeAccordion === 'construction' && (
                <div className="pt-2 pb-1">
                  <ul className="space-y-1.5 font-sans text-xs text-stone-500 font-light">
                    {(product.materials || [
                      'Premium high-grade leather overlays',
                      'Technical mesh knit bootie base layer',
                      'Machined structural composite sole plate',
                      'Removable performance cushioned insole'
                    ]).map((material, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-stone-400 font-mono mr-2.5">•</span>
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 03 / SHIPPING & RETURNS */}
            <div className="border-b border-[#1a1a1a] pb-3">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                className="w-full flex items-center justify-between text-left py-2 font-mono text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-stone-100 transition-colors"
                id="accordion-shipping-btn"
              >
                <span>03 / SHIPPING &amp; GUARANTEE</span>
                <span>{activeAccordion === 'shipping' ? '−' : '+'}</span>
              </button>
              {activeAccordion === 'shipping' && (
                <div className="pt-2 pb-1 font-sans text-xs text-stone-500 leading-relaxed font-light">
                  <p>
                    {product.shipping || 'Standard delivery within 3-5 business days. Express shipping options available at checkout. Easy returns within 30 days in pristine, unused condition.'}
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* YOU MIGHT ALSO LIKE SECTION */}
      <section className="mt-24 border-t border-[#1a1a1a] pt-20">
        <h2 className="font-serif italic text-3xl text-stone-100 mb-10 tracking-tight uppercase">
          YOU MIGHT ALSO LIKE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendationItems.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectProduct(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] transition-all duration-300 p-4"
              id={`detail-rec-${p.id}`}
            >
              <div className="aspect-square bg-[#050505] overflow-hidden mb-4 relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-serif italic text-lg text-stone-200 group-hover:text-stone-100 transition-colors truncate">
                {p.name}
              </h3>
              <p className="font-mono text-xs text-stone-500 uppercase tracking-widest mt-1">
                {p.colorway}
              </p>
              <p className="font-mono text-sm text-stone-300 font-bold mt-2">
                ${p.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
