/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Lock, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { ActiveView, Product, CartItem } from './types';
import { PRODUCTS } from './data';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomeView from './components/HomeView';
import MensSneakersView from './components/MensSneakersView';
import WomensSneakersView from './components/WomensSneakersView';
import ProductDetailView from './components/ProductDetailView';
import CollectionsView from './components/CollectionsView';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Back tracking (to go back to correct listing page from detail view)
  const [previousView, setPreviousView] = useState<ActiveView>('home');

  // Checkout modal simulation
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [checkoutReceipt, setCheckoutReceipt] = useState<{
    id: string;
    date: string;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
  } | null>(null);

  // Load cart from local storage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('vault_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart storage', e);
      }
    }
  }, []);

  // Save cart to local storage when changed
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('vault_cart', JSON.stringify(items));
  };

  // Select Product handler
  const handleSelectProduct = (product: Product) => {
    // Keep track of which view we came from to go back correctly
    if (activeView !== 'detail') {
      setPreviousView(activeView);
    }
    setSelectedProduct(product);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back button handler
  const handleGoBack = () => {
    setActiveView(previousView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: number) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size
    );

    let updatedCart = [...cartItems];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        product,
        selectedSize: size,
        quantity: 1,
      });
    }
    saveCart(updatedCart);
  };

  const handleUpdateQuantity = (id: string, size: number, delta: number) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === id && item.selectedSize === size
    );

    if (existingIndex > -1) {
      let updatedCart = [...cartItems];
      const newQuantity = updatedCart[existingIndex].quantity + delta;
      
      if (newQuantity <= 0) {
        updatedCart.splice(existingIndex, 1);
      } else {
        updatedCart[existingIndex].quantity = newQuantity;
      }
      saveCart(updatedCart);
    }
  };

  const handleRemoveItem = (id: string, size: number) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.product.id === id && item.selectedSize === size)
    );
    saveCart(updatedCart);
  };

  const handleCheckout = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = 0; // Free for members
    const total = subtotal + shipping;

    // Build receipt
    const receipt = {
      id: `VLT-${Math.floor(100000 + Math.random() * 900000)}-SR`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cartItems],
      subtotal,
      shipping,
      total,
    };

    setCheckoutReceipt(receipt);
    setIsCartOpen(false);
    setIsCheckoutSuccess(true);
    // Clear cart
    saveCart([]);
  };

  // Total item count helper
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#f5f5f5] selection:bg-stone-700 selection:text-stone-100">
      {/* Dynamic Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          setSelectedProduct(null);
        }}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeView === 'home' && (
          <HomeView
            onSelectProduct={handleSelectProduct}
            setActiveView={(view) => {
              setActiveView(view);
              setSelectedProduct(null);
            }}
          />
        )}
        {activeView === 'men' && (
          <MensSneakersView onSelectProduct={handleSelectProduct} />
        )}
        {activeView === 'women' && (
          <WomensSneakersView onSelectProduct={handleSelectProduct} />
        )}
        {activeView === 'collections' && (
          <CollectionsView
            onSelectProduct={handleSelectProduct}
            setActiveView={(view) => {
              setActiveView(view);
              setSelectedProduct(null);
            }}
          />
        )}
        {activeView === 'detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onBack={handleGoBack}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>

      {/* Slide-out Cart Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Simulated Checkout Success Modal (With high brutalist detail) */}
      {isCheckoutSuccess && checkoutReceipt && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-stone-300">
            <button
              onClick={() => {
                setIsCheckoutSuccess(false);
                setCheckoutReceipt(null);
              }}
              className="absolute right-4 top-4 text-stone-400 hover:text-stone-100 p-2"
              id="checkout-success-close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#151515] border border-stone-700 text-stone-200 mb-2">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="font-serif italic text-2xl tracking-wide text-stone-100 uppercase">ARCHIVAL TRANSACTION LOCK</h2>
                <p className="font-mono text-[10px] text-stone-400 tracking-[0.2em] uppercase">Status: Confirmed / Payment Settled</p>
              </div>

              {/* Secure badge */}
              <div className="bg-[#111] border border-[#222] p-4 flex items-center space-x-3 text-stone-500 font-mono text-[10px]">
                <ShieldCheck className="h-5 w-5 text-stone-400 flex-shrink-0" />
                <p className="leading-relaxed">
                  TRANSFERRED VIA SECURE TUNNEL. SECURITY KEY HASH RECEIVED. CONTAINER IS ASSIGNED FOR EXPRESS DEPLOYMENT.
                </p>
              </div>

              {/* Receipt */}
              <div className="border border-[#1a1a1a] bg-[#050505] p-5 space-y-4 font-mono text-xs">
                <div className="flex justify-between text-stone-500 border-b border-[#1a1a1a] pb-3">
                  <span>RECEIPT NO:</span>
                  <span className="text-stone-300 font-bold">{checkoutReceipt.id}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>TIMESTAMP:</span>
                  <span className="text-stone-300">{checkoutReceipt.date}</span>
                </div>

                {/* Items */}
                <div className="space-y-2.5 pt-2 border-t border-[#1a1a1a]">
                  <span className="text-stone-500 text-[10px] uppercase">CONTAINER MANIFEST:</span>
                  {checkoutReceipt.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-baseline text-xs text-stone-400">
                      <span className="truncate max-w-[240px]">
                        {item.product.name} (US {item.selectedSize}) <span className="text-stone-500">x{item.quantity}</span>
                      </span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="space-y-1.5 pt-3 border-t border-[#1a1a1a]">
                  <div className="flex justify-between text-stone-500">
                    <span>SUBTOTAL:</span>
                    <span>${checkoutReceipt.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>SHIPPING (EXPRESS):</span>
                    <span className="text-stone-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-stone-200 font-bold text-sm pt-2 border-t border-[#1a1a1a]">
                    <span>TOTAL LOCKED:</span>
                    <span>${checkoutReceipt.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    setIsCheckoutSuccess(false);
                    setCheckoutReceipt(null);
                    setActiveView('home');
                  }}
                  className="w-full bg-stone-200 hover:bg-white text-black border border-stone-850 font-mono text-xs font-bold py-3.5 tracking-widest transition-all uppercase rounded-none"
                  id="checkout-success-close-btn"
                >
                  Return to Home
                </button>
                <div className="text-center">
                  <span className="font-mono text-[9px] text-stone-600 tracking-wider">
                    DECRYPTING MANIFEST / INVENTORY ASSIGNED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Footer */}
      <Footer />
    </div>
  );
}
