/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { ActiveView, Product } from '../types';
import { PRODUCTS } from '../data';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  onSelectProduct: (product: Product) => void;
}

export default function Navbar({
  activeView,
  setActiveView,
  cartCount,
  setIsCartOpen,
  onSelectProduct,
}: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search filter
  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.colorway.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchItemClick = (product: Product) => {
    onSelectProduct(product);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const menuItems: { label: string; view: ActiveView }[] = [
    { label: 'HOME', view: 'home' },
    { label: 'MEN', view: 'men' },
    { label: 'WOMEN', view: 'women' },
    { label: 'COLLECTIONS', view: 'collections' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 border-b border-[#1a1a1a] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Menu Icon */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-stone-400 hover:text-stone-100 transition-colors p-2"
            aria-label="Toggle Menu"
            id="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
          <button
            onClick={() => setActiveView('home')}
            className="font-serif italic text-2xl tracking-tight text-stone-100 hover:text-stone-300 transition-colors"
            id="nav-brand-logo"
          >
            VAULT
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveView(item.view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`font-mono text-xs tracking-wider transition-all duration-200 relative py-2 ${
                activeView === item.view
                  ? 'text-stone-200 font-medium'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
              id={`nav-item-${item.label.toLowerCase()}`}
            >
              {item.label}
              {activeView === item.view && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-300" />
              )}
            </button>
          ))}
        </nav>

        {/* Search & Cart Icons */}
        <div className="flex items-center space-x-6">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-stone-400 hover:text-stone-100 transition-colors p-2"
            aria-label="Search"
            id="nav-search-btn"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-stone-400 hover:text-stone-100 transition-colors p-2 relative"
            aria-label="Cart"
            id="nav-cart-btn"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-stone-200 text-black text-[9px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#050505] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Slide down Search Panel */}
      {isSearchOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#050505] border-b border-[#1a1a1a] py-6 px-4 shadow-2xl animate-in fade-in duration-200">
          <div className="max-w-3xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH ARCHIVE (e.g., URBAN, NOCTURNAL, VECTOR)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0a0a] text-stone-300 font-mono text-sm border border-[#1a1a1a] focus:border-stone-500 focus:outline-none px-4 py-4 pr-12 rounded-none"
                autoFocus
                id="search-input-field"
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-100 transition-colors"
                id="search-close-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Live Results dropdown */}
            {searchQuery.trim() !== '' && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#0a0a0a] border border-[#1a1a1a] z-50 max-h-96 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  <div className="divide-y divide-[#1a1a1a]">
                    {filteredProducts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSearchItemClick(p)}
                        className="w-full text-left p-4 hover:bg-[#050505] transition-colors flex items-center space-x-4"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-12 w-12 object-cover bg-[#050505] border border-[#1a1a1a]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-xs text-stone-500">{p.modelCode}</p>
                          <p className="font-sans font-bold text-sm text-stone-200 truncate">{p.name}</p>
                          <p className="font-mono text-[10px] text-stone-600">{p.colorway}</p>
                        </div>
                        <p className="font-mono text-sm text-stone-200 font-bold">${p.price.toFixed(2)}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-stone-500 font-mono text-xs">
                    NO ARCHIVAL LOGS MATCHED YOUR QUERY
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-[#050505] z-40 px-6 py-10 flex flex-col space-y-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveView(item.view);
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0 });
              }}
              className={`text-left font-serif italic text-3xl tracking-tight border-b border-[#1a1a1a] pb-4 ${
                activeView === item.view ? 'text-stone-100' : 'text-stone-600'
              }`}
              id={`mobile-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-8 mt-auto border-t border-[#1a1a1a]">
            <p className="font-mono text-[10px] text-stone-600 tracking-wider">
              EST. 2012 / TOKYO / LONDON / NY
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
