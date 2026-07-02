/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, size: number, delta: number) => void;
  onRemoveItem: (id: string, size: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#0a0a0a] text-stone-300 border-l border-[#1a1a1a] flex flex-col h-full"
          id="cart-drawer-content"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#1a1a1a] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-stone-500" />
              <h2 className="font-serif text-lg italic text-stone-100">Your Bag ({cartItems.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-100 p-2 -mr-2 transition-colors"
              aria-label="Close Cart"
              id="cart-close-btn"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#1a1a1a]">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="py-6 flex items-start space-x-4 first:pt-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-24 object-cover bg-[#050505] border border-[#1a1a1a] flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[9px] text-stone-500 tracking-wider mb-1">{item.product.modelCode}</p>
                    <h3 className="font-serif italic text-base text-stone-200 truncate">{item.product.name}</h3>
                    <p className="font-mono text-[11px] text-stone-400 mt-0.5">SIZE: {item.selectedSize}</p>
                    
                    {/* Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-[#1a1a1a] bg-[#050505]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                          className="px-2.5 py-1 text-stone-500 hover:text-stone-200 transition-colors"
                          aria-label="Decrease Quantity"
                          id={`cart-decrease-qty-${index}`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 font-mono text-xs text-stone-300">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                          className="px-2.5 py-1 text-stone-500 hover:text-stone-200 transition-colors"
                          aria-label="Increase Quantity"
                          id={`cart-increase-qty-${index}`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                        className="text-stone-600 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove Item"
                        id={`cart-remove-item-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-stone-200 font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <ShoppingBag className="h-12 w-12 text-stone-700 mb-4 stroke-[1.5]" />
                <p className="font-mono text-xs text-stone-500 uppercase tracking-widest">Your bag is empty</p>
                <p className="font-sans text-xs text-stone-600 max-w-[240px] mt-2 leading-relaxed font-light">
                  You have not added any technical footwear or archival gear to your container yet.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 border border-stone-800 text-stone-300 bg-transparent hover:bg-stone-200 hover:text-black transition-all duration-200 font-mono text-xs px-6 py-3 tracking-wider uppercase"
                  id="cart-explore-btn"
                >
                  EXPLORE ARCHIVE
                </button>
              </div>
            )}
          </div>

          {/* Checkout Panel */}
          {cartItems.length > 0 && (
            <div className="border-t border-[#1a1a1a] px-6 py-6 bg-[#0a0a0a]/95 backdrop-blur-md">
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-mono text-xs text-stone-500 tracking-wider">SUBTOTAL</span>
                <span className="font-mono text-xl text-stone-200 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <p className="font-sans text-[11px] text-stone-600 leading-normal mb-6 font-light">
                Shipping and taxes calculated at checkout. Members receive free express delivery.
              </p>
              <button
                onClick={onCheckout}
                className="w-full bg-stone-200 hover:bg-white text-black font-sans text-xs font-bold py-4 tracking-widest transition-all duration-200 uppercase border border-stone-850"
                id="cart-checkout-btn"
              >
                PROCEED TO SECURE CHECKOUT
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
