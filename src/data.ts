/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, BlogItem } from './types';

export const HERO_IMAGE = '/src/assets/images/vault_hero_banner_1782951810171.jpg';
export const NOCTURNAL_IMAGE = '/src/assets/images/vault_nocturnal_1782951820531.jpg';
export const CANYON_BOOT_IMAGE = '/src/assets/images/vault_canyon_boot_1782951830928.jpg';
export const GLASS_SOCK_IMAGE = '/src/assets/images/vault_glass_sock_1782951839981.jpg';
export const BRUTALIST_HIGH_IMAGE = '/src/assets/images/vault_brutalist_high_1782951848364.jpg';

export const PRODUCTS: Product[] = [
  // VAULT V.1 NOCTURNAL (The Showcase/Signature Sneaker)
  {
    id: 'vault-nocturnal',
    name: 'VAULT V.1 "NOCTURNAL"',
    modelCode: 'SRSV01_SNEAK_001',
    price: 425.00,
    originalPrice: 550.00,
    colorway: 'Stealth Black / Bronze Highlights',
    image: NOCTURNAL_IMAGE,
    additionalImages: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800', // detail laces
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800', // detail sole
      'https://images.unsplash.com/photo-1514989940723-e8e5163ccb8c?auto=format&fit=crop&q=80&w=800', // lifestyle studio
    ],
    gender: 'unisex',
    category: 'sneakers',
    tags: ['Signature Series', 'Limited Release', 'New Arrival'],
    sizes: [7, 8, 9, 10, 11, 12, 13, 14],
    colors: ['black'],
    description: 'Born from the shadows of late-night studio sessions and the raw architectural grit of industrial Brooklyn, the V.1 "Nocturnal" is a manifesto of underground hip-hop culture translated into structural design. We stripped the unnecessary, leaving only a silhouette that commands authority without speaking.',
    materials: [
      'Water-resistant tactical ballistic nylon upper',
      'Vegetable-tanned full-grain Italian calfskin overlays',
      'Vibram® Megagrip high-traction rubber outsole',
      'Anodized aluminum lace lock hooks in dark copper bronze',
      'High-density custom polyurethane midsole with air cushion core',
      'Removable cork and memory foam shock-absorbing insole'
    ],
    shipping: 'Free Express Shipping for Members. Standard delivery 3-5 business days. Easy 30-day returns in original condition.'
  },
  
  // MEN'S SNEAKERS (From Second Image)
  {
    id: 'vault-01-urban',
    name: 'VAULT-01 URBAN',
    modelCode: 'VLT01_URB_01',
    price: 285.00,
    colorway: 'Cloud White / Ghost Grey',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    gender: 'men',
    category: 'sneakers',
    tags: ['Limited Release'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['white', 'grey'],
    description: 'A crisp architectural approach to daily high-performance footwear. Built on structural panels with concrete-grey contrast styling.',
    materials: [
      'Durable micro-perf leather upper',
      'Synthetic mesh lining for maximum breathability',
      'Custom modular shock-absorbing rubber outsole'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'vault-02-echo',
    name: 'VAULT-02 ECHO',
    modelCode: 'VLT02_ECH_02',
    price: 310.00,
    colorway: 'Stealth Black / Volt',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
    gender: 'men',
    category: 'sneakers',
    tags: ['Best Seller'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['black'],
    description: 'Stealth and shock-absorbent. Features technical details that reflect the neon-lit underworld of late night metropolis operations.',
    materials: [
      'Reflective neon stitching and branding elements',
      'Ripstop tech fabric with suede reinforcement',
      'Carbon fiber plate insertion for structural stability'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'vault-03-kinetic',
    name: 'VAULT-03 KINETIC',
    modelCode: 'VLT03_KIN_03',
    price: 345.00,
    colorway: 'Sand / Ash Mono',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    gender: 'men',
    category: 'sneakers',
    tags: ['New Arrival'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['beige', 'grey'],
    description: 'High-altitude tech meets street kinetic movement. Sand tone with rugged technical straps.',
    materials: [
      'GORE-TEX weatherproofing construction',
      'Dual strap magnetic closure system',
      'Extruded tread pattern for maximum loose ground grip'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'vault-04-razor',
    name: 'VAULT-04 RAZOR',
    modelCode: 'VLT04_RAZ_04',
    price: 265.00,
    colorway: 'Pure White / Bone',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
    gender: 'men',
    category: 'sneakers',
    tags: ['Sleek'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['white', 'beige'],
    description: 'A sharp razor silhouette designed for lightweight agility. Made with minimal waste fabrication.',
    materials: [
      'One-piece lightweight knit upper',
      'Compressed recycled EVA midsole',
      'Flex-grooved raw rubber outsole'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'vault-05-vector',
    name: 'VAULT-05 VECTOR',
    modelCode: 'VLT05_VEC_05',
    price: 420.00,
    colorway: 'Carbon / Obsidian',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    gender: 'men',
    category: 'sneakers',
    tags: ['Technical'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['black', 'grey'],
    description: 'A structural masterpiece featuring dynamic lateral cage support and an elevated sole profile.',
    materials: [
      'Thermo-polyurethane (TPU) structural outer frame',
      'Full grain premium leather bootie insert',
      'Sculpted high-profile architectural sole'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'vault-06-archive',
    name: 'VAULT-06 ARCHIVE',
    modelCode: 'VLT06_ARC_06',
    price: 395.00,
    colorway: 'Cement / Granite',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    gender: 'men',
    category: 'sneakers',
    tags: ['Sold Out'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['grey'],
    description: 'A throwback to classic brutalist concrete architecture. Heavy-set and highly structured.',
    materials: [
      'Cement-washed rough suede panels',
      'Cracked-leather detailing',
      'Solid vulcanized rubber platform base'
    ],
    shipping: 'Out of stock.'
  },
  {
    id: 'vault-07-apex',
    name: 'VAULT-07 APEX',
    modelCode: 'VLT07_APX_07',
    price: 245.00,
    colorway: 'White / Fire Orange',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    gender: 'men',
    category: 'sneakers',
    tags: ['Sleek'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['white', 'orange'],
    description: 'Agile silhouette accented by bright energetic underlayers. Ready to dominate the pavement.',
    materials: [
      'Aerated lightweight nylon mesh',
      'High-impact neon TPU heel counter',
      'Speed-lacing toggle system'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'vault-08-pulse',
    name: 'VAULT-08 PULSE',
    modelCode: 'VLT08_PUL_08',
    price: 290.00,
    colorway: 'Phantom / Ice',
    image: 'https://images.unsplash.com/photo-1500462908006-c850251117a2?auto=format&fit=crop&q=80&w=800',
    gender: 'men',
    category: 'sneakers',
    tags: ['Technical'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['white', 'grey'],
    description: 'Rhythmic textured overlay panels mimicking biological pulse waves. Deep internal support.',
    materials: [
      'Embossed bio-silicone support framework',
      'Stretchy neoprene inner sock lining',
      'Semi-translucent icy rubber sole'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },

  // WOMEN'S SNEAKERS (From Third Image)
  {
    id: 'aero-01-chrome',
    name: 'AERO-01 CHROME',
    modelCode: 'W_AER01_CH_01',
    price: 420.00,
    colorway: 'Technical Silhouette / Matte Black',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    gender: 'women',
    category: 'sneakers',
    tags: ['New Arrival', 'Sleek'],
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ['black'],
    description: 'Sleek, fluid, yet intensely architectural. Aerodynamically optimized with dark chrome detailing.',
    materials: [
      'Metallic chrome mesh panel inserts',
      'Matte rubberized leather overlays',
      'Hyper-flexible response midsole'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'v-brutalist-high',
    name: 'V-BRUTALIST HIGH',
    modelCode: 'W_BRUT_HI_02',
    price: 560.00,
    colorway: 'Architectural Sole / Bone White',
    image: BRUTALIST_HIGH_IMAGE,
    gender: 'women',
    category: 'boots',
    tags: ['Technical'],
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ['white', 'beige'],
    description: 'An aggressive high-top silhouette built directly onto a modular concrete-inspired platform.',
    materials: [
      'Heavy cotton canvas with reinforced stitching',
      'Industrial utility strap buckles',
      'Extra-thick multi-level block outsole'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'iris-velocity',
    name: 'IRIS VELOCITY',
    modelCode: 'W_IRV_03',
    price: 385.00,
    colorway: 'Metallic Iridium / Carbon Mesh',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
    gender: 'women',
    category: 'sneakers',
    tags: ['Limited Edition', 'Sleek', 'Limited'],
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ['grey', 'black'],
    description: 'Engineered for rapid urban traversal. Features shimmering iridium fibers woven through deep carbon webbing.',
    materials: [
      'Woven carbon and metallic thread knit upper',
      'Lightweight internal support skeleton',
      'Dual-density shock attenuation sole'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'buckle-m01-red',
    name: 'BUCKLE-M01 RED',
    modelCode: 'W_BCK01_RD_04',
    price: 610.00,
    colorway: 'Oxblood Leather / Industrial Buckle',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800',
    gender: 'women',
    category: 'boots',
    tags: ['Technical', 'Limited'],
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ['red', 'black'],
    description: 'High-altitude oxblood boot featuring heavy-duty steel buckles and deep industrial tread.',
    materials: [
      'Premium oxblood vegetable-tanned leather',
      'Machined steel industrial buckle harness',
      'High-grip rugged rubber commando sole'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'onyx-glass-sock',
    name: 'ONYX GLASS SOCK',
    modelCode: 'W_GLS01_ONX_05',
    price: 495.00,
    colorway: 'Tech Knit / Acrylic Heel',
    image: GLASS_SOCK_IMAGE,
    gender: 'women',
    category: 'sneakers',
    tags: ['Sleek', 'Limited'],
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ['black'],
    description: 'Striking a balance between footwear and sculpture. A soft technical sock contrasts against a sharp transparent clear acrylic heel.',
    materials: [
      'High-tensile stretch technical knit yarn',
      'Solid transparent clear acrylic structural heel',
      'Serrated rubber tread pads'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'raw-stitch-09',
    name: 'RAW STITCH 09',
    modelCode: 'W_RAW_ST_09',
    price: 340.00,
    colorway: 'Deconstructed Canvas / Neon Stitch',
    image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&q=80&w=800',
    gender: 'women',
    category: 'sneakers',
    tags: ['Technical'],
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ['grey', 'white'],
    description: 'A fully deconstructed tribute to process. Raw exposed canvas seams with vibrant contrast stitching.',
    materials: [
      'Unbleached heavy structural canvas panels',
      'Frayed edge details',
      'Raw natural crepe rubber outsole'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },

  // RECENT RELEASE & ADDITIONAL STUFF (Home Page Grid & You Might Also Like)
  {
    id: 'canyon-tech-boot',
    name: 'CANYON TECH BOOT',
    modelCode: 'V_CNY_BOOT_02',
    price: 380.00,
    colorway: 'Carbon Black / Slate Suede',
    image: CANYON_BOOT_IMAGE,
    gender: 'men',
    category: 'boots',
    tags: ['Limited Release'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['black', 'grey'],
    description: 'A high-performance trail boot stripped of weight and re-armored with carbon reinforcement. Engineered for both mountains and tarmac.',
    materials: [
      'Full grain oil-treated nubuck leather',
      'Kevlar thread dual-stitched structural seams',
      'Vibram modular rugged hiking outsole'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'steel-link-wallet',
    name: 'STEEL LINK WALLET',
    modelCode: 'V_STL_WLT_03',
    price: 110.00,
    colorway: 'Raw Industrial Chrome',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
    gender: 'unisex',
    category: 'accessories',
    tags: ['Limited'],
    sizes: [0], // N/A
    colors: ['grey'],
    description: 'Heavy gauge steel chain secure wallet. Featuring modular card locks and high-grade carabiner attachments.',
    materials: [
      'Laser-cut aluminum alloy faceplates',
      'Surgical-grade steel curb-link chain',
      'Interlocking spring carabiner clasp'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  {
    id: 'core-heavy-hoodie',
    name: 'CORE HEAVY HOODIE',
    modelCode: 'V_CR_HD_04',
    price: 185.00,
    colorway: 'Pitch Black / Heavy French Terry',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
    gender: 'unisex',
    category: 'apparel',
    tags: ['Essential'],
    sizes: [1, 2, 3, 4], // S, M, L, XL
    colors: ['black'],
    description: 'A structural, ultra-heavyweight oversized hoodie. Designed with dropping shoulders and structured seams.',
    materials: [
      '600gsm 100% organic cotton French Terry',
      'Pre-shrunk silicone washed weave',
      'No drawcord raw-edge double hood construction'
    ],
    shipping: 'Standard delivery in 3-5 business days.'
  },
  
  // YOU MIGHT ALSO LIKE (Detail page items)
  {
    id: 'vault-v2-oxygen',
    name: 'VAULT V.2 "OXYGEN"',
    modelCode: 'SRSV02_SNEAK_OXY',
    price: 395.00,
    colorway: 'Alabaster / Pure Ice',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    gender: 'unisex',
    category: 'sneakers',
    tags: ['Signature Series'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['white'],
    description: 'Ultralight oxygenating air mesh panels set on a pristine architectural foam base.',
    materials: [
      'Monofilament performance nylon weave',
      'Translucent air-injection cushion system'
    ]
  },
  {
    id: 'vault-x-magma',
    name: 'VAULT X "MAGMA"',
    modelCode: 'SRSVX_SNEAK_MAG',
    price: 480.00,
    colorway: 'Crimson / Obsidian Buckles',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800',
    gender: 'unisex',
    category: 'sneakers',
    tags: ['Signature Series', 'Limited Edition'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['red', 'black'],
    description: 'Intense vulcanized red outsole contrasting deep architectural tactical buckles and calfskin overlays.',
    materials: [
      'Premium oiled calfskin',
      'Dual aircraft-grade nylon quick-release buckles'
    ]
  },
  {
    id: 'v-utility-forest',
    name: 'V-UTILITY "FOREST"',
    modelCode: 'SRSVX_SNEAK_FOR',
    price: 510.00,
    colorway: 'Tactical Olive / Earth Mono',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', // replacement olive look via sand/kinetic
    gender: 'unisex',
    category: 'boots',
    tags: ['Signature Series', 'Technical'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['beige', 'grey'],
    description: 'Tactical grade military-surplus silhouette re-engineered with breathable air mesh and high-density protection columns.',
    materials: [
      'Ripstop Cordura base canvas',
      'Waterproof rubber rand',
      'OrthoLite premium shock-absorbing footbed'
    ]
  },
  {
    id: 'vault-lite-cement',
    name: 'VAULT LITE "CEMENT"',
    modelCode: 'SRSVL_SNEAK_CEM',
    price: 320.00,
    colorway: 'Concrete Grey / Core Speckle',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    gender: 'unisex',
    category: 'sneakers',
    tags: ['Signature Series', 'Sleek'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['grey'],
    description: 'Deconstructed minimal running profile in grey-wash speckled organic textures.',
    materials: [
      'Recycled marine plastic weave',
      'High-impact energy rebound sole structure'
    ]
  }
];

export const BLOG_POSTS: BlogItem[] = [
  {
    id: 'post-1',
    date: 'Nov 12',
    title: 'BERLIN UNDERGROUND: A VISUAL JOURNEY THROUGH BRUTALISM',
    subtitle: 'EXPLORING METROPOLIS STRUCTURES',
    excerpt: 'Exploring the relationship between 1960s architecture and modern techwear aesthetics in the heart of Germany. Deep diving into monolithic facades.',
    image: 'https://images.unsplash.com/photo-1548504769-900b70ed122e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'post-2',
    date: 'Nov 08',
    title: 'THE SOUND OF THE VAULT: CURATED PLAYLIST 009',
    subtitle: 'LATE NIGHT INDUSTRIAL SOUNDS',
    excerpt: 'Low-frequency ambient and industrial techno selection for the late-night design sessions. Heavy synthetic basslines, raw mechanical reverbs.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'post-3',
    date: 'Oct 29',
    title: 'SUSTAINABLE DECONSTRUCTION: OUR NEW DESIGN PHILOSOPHY',
    subtitle: 'RECONSTRUCTED ELEMENTS',
    excerpt: 'How we are reimagining manufacturing waste into premium limited-edition streetwear components. Every piece represents a narrative of rebirth.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
  }
];
