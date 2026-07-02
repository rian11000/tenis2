/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  modelCode: string;
  price: number;
  originalPrice?: number;
  colorway: string;
  image: string;
  additionalImages?: string[];
  gender: 'men' | 'women' | 'unisex';
  category: 'sneakers' | 'boots' | 'accessories' | 'apparel';
  tags: string[]; // 'New Arrival', 'Limited Release', 'Sold Out', 'Limited Edition', 'Sleek', 'Technical', 'Limited'
  sizes: number[];
  colors: string[]; // 'white', 'black', 'grey', 'orange', 'red', 'beige'
  description?: string;
  materials?: string[];
  shipping?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: number;
  quantity: number;
}

export interface BlogItem {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image?: string;
}

export type ActiveView = 'home' | 'men' | 'women' | 'detail' | 'collections';

export interface FilterState {
  sizes: number[];
  colors: string[];
  priceRanges: string[]; // '$100-$250', '$250-$500', '$500+'
  tags: string[]; // 'sleek', 'technical', 'limited'
  sortBy: 'release' | 'price-asc' | 'price-desc';
}
