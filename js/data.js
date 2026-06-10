/* ============================================
   ANIM CLOTHING â€” Shared Data
   ============================================ */

const categories = [
  { id: 'oversized', name: 'Tees', type: 'shirts', icon: 'fa-tshirt', desc: 'Relaxed fits, bold energy' },
  { id: 'polo', name: 'Polo Shirts', type: 'shirts', icon: 'fa-gem', desc: 'Classic sophistication' },
  { id: 'denim-shirt', name: 'Denim Shirts', type: 'shirts', icon: 'fa-jacket', desc: 'Timeless ruggedness' },
  { id: 'formal', name: 'Formal Shirts', type: 'shirts', icon: 'fa-briefcase', desc: 'Sharp precision' },
  { id: 'cargo', name: 'Cargo Pants', type: 'pants', icon: 'fa-bag-shopping', desc: 'Utility meets style' },
  { id: 'jeans', name: 'Denim Jeans', type: 'pants', icon: 'fa-vest', desc: 'Forever classic' },
  { id: 'trousers', name: 'Trousers', type: 'pants', icon: 'fa-user-tie', desc: 'Clean lines' },
];

const products = [
  // --- OVERSIZED TEES (10) ---
  { id: 1,  name: 'Premium Beige & White Striped T-Shirt', category: 'oversized', type: 'shirts', price: 1999, originalPrice: 2500, image: 'assets/images/Acid Wash Oversized 1.jpeg', objectPosition: 'center 0%', icon: 'fa-tshirt' },
  { id: 2,  name: 'Anim Classic Mint White Striped Tee',   category: 'oversized', type: 'shirts', price: 1999, originalPrice: 2500, image: 'assets/images/Anim Classic Mint White Striped Tee 1.png', icon: 'fa-tshirt' },
  { id: 3,  name: 'ANIM Premium Ribbed Crew Neck T-Shirt',     category: 'oversized', type: 'shirts', price: 1999, originalPrice: 2500, image: 'assets/images/ANIM Premium Ribbed Crew Neck T-Shirt.jpeg', icon: 'fa-tshirt' },
  { id: 100,name: 'Black & White Vertical Striped Premium T-Shirt',       category: 'oversized', type: 'shirts', price: 1999, originalPrice: 2500, image: 'assets/images/Black & White Vertical Striped Premium T-Shirt 1.jpeg', icon: 'fa-tshirt' },
  { id: 101,name: 'Black Ribbed Essential T-Shirt',   category: 'oversized', type: 'shirts', price: 1999, originalPrice: 2500, image: 'assets/images/Black Ribbed Essential T-Shirt 1.jpeg', icon: 'fa-tshirt' },
  { id: 102,name: 'Premium White Ribbed Crew Neck T-Shirt',   category: 'oversized', type: 'shirts', price: 1999, originalPrice: 2500, image: 'assets/images/Premium White Ribbed Crew Neck T-Shirt 1.jpeg', icon: 'fa-tshirt' },
  { id: 103,name: 'Anim Classic Stripe Tee – Olive Green',     category: 'oversized', type: 'shirts', price: 1999, originalPrice: 2500, image: 'assets/images/Anim Classic Stripe Tee – Olive Green 1.jpeg', icon: 'fa-tshirt' },
  { id: 104,name: 'Men\'s Coffee Linen Trousers – Straight Fit Summer Pants', category: 'trousers', type: 'pants', price: 2999, originalPrice: 4500, image: 'assets/images/Coffee Linen 1.jpeg', icon: 'fa-user-tie' },
  { id: 105,name: 'Charcoal Raw Edge',       category: 'oversized', type: 'shirts', price: 3599, originalPrice: 4500, image: 'https://picsum.photos/seed/i1c/600/800', icon: 'fa-tshirt' },
  { id: 106,name: 'Sand Washed Loose',       category: 'oversized', type: 'shirts', price: 3499, originalPrice: 4400, image: 'https://picsum.photos/seed/j1s/600/800', icon: 'fa-tshirt' },

  // --- POLO (10) ---
  { id: 7,  name: 'Navy Blue Zip Polo Shirt',           category: 'polo', type: 'shirts', price: 2500, originalPrice: 4500, image: 'assets/images/Navy Blue Zip Polo Shirt 1.jpeg', icon: 'fa-gem' },
  { id: 8,  name: 'Two-Tone Polo',           category: 'polo', type: 'shirts', price: 4799, originalPrice: 6000, image: 'https://picsum.photos/seed/l1t/600/800', icon: 'fa-gem' },
  { id: 107,name: 'Classic Black Polo',      category: 'polo', type: 'shirts', price: 4199, originalPrice: 5200, image: 'https://picsum.photos/seed/m1b/600/800', icon: 'fa-gem' },
  { id: 108,name: 'Striped Club Polo',       category: 'polo', type: 'shirts', price: 4399, originalPrice: 5500, image: 'https://picsum.photos/seed/n1s/600/800', icon: 'fa-gem' },
  { id: 109,name: 'Performance Knit Polo',   category: 'polo', type: 'shirts', price: 5299, originalPrice: 6600, image: 'https://picsum.photos/seed/o1k/600/800', icon: 'fa-gem' },
  { id: 110,name: 'Contrast Collar Polo',    category: 'polo', type: 'shirts', price: 4599, originalPrice: 5700, image: 'https://picsum.photos/seed/p1c/600/800', icon: 'fa-gem' },
  { id: 111,name: 'PiquÃ© Textured Polo',     category: 'polo', type: 'shirts', price: 4299, originalPrice: 5400, image: 'https://picsum.photos/seed/q1t/600/800', icon: 'fa-gem' },
  { id: 112,name: 'Long Sleeve Polo',        category: 'polo', type: 'shirts', price: 4699, originalPrice: 5900, image: 'https://picsum.photos/seed/r1l/600/800', icon: 'fa-gem' },
  { id: 113,name: 'Heritage Logo Polo',      category: 'polo', type: 'shirts', price: 5499, originalPrice: 6900, image: 'https://picsum.photos/seed/s1h/600/800', icon: 'fa-gem' },
  { id: 114,name: 'Linen Blend Polo',        category: 'polo', type: 'shirts', price: 4999, originalPrice: 6200, image: 'https://picsum.photos/seed/t1l/600/800', icon: 'fa-gem' },

  // --- DENIM SHIRTS (10) ---
  { id: 9,  name: 'Classic Denim Shirt',     category: 'denim-shirt', type: 'shirts', price: 5299, originalPrice: 6600, image: 'https://picsum.photos/seed/u1d/600/800', icon: 'fa-jacket' },
  { id: 10, name: 'Washed Denim Jacket',     category: 'denim-shirt', type: 'shirts', price: 6499, originalPrice: 8100, image: 'https://picsum.photos/seed/v1j/600/800', icon: 'fa-jacket' },
  { id: 115,name: 'Raw Indigo Shirt',        category: 'denim-shirt', type: 'shirts', price: 5799, originalPrice: 7200, image: 'https://picsum.photos/seed/w1r/600/800', icon: 'fa-jacket' },
  { id: 116,name: 'Patchwork Denim',         category: 'denim-shirt', type: 'shirts', price: 6199, originalPrice: 7700, image: 'https://picsum.photos/seed/x1p/600/800', icon: 'fa-jacket' },
  { id: 117,name: 'Black Denim Overshirt',   category: 'denim-shirt', type: 'shirts', price: 5999, originalPrice: 7500, image: 'https://picsum.photos/seed/y1b/600/800', icon: 'fa-jacket' },
  { id: 118,name: 'Vintage Faded Denim',     category: 'denim-shirt', type: 'shirts', price: 5499, originalPrice: 6900, image: 'https://picsum.photos/seed/z1v/600/800', icon: 'fa-jacket' },
  { id: 119,name: 'Double Pocket Denim',     category: 'denim-shirt', type: 'shirts', price: 5799, originalPrice: 7200, image: 'https://picsum.photos/seed/a1dd/600/800', icon: 'fa-jacket' },
  { id: 120,name: 'Denim Trucker Jacket',    category: 'denim-shirt', type: 'shirts', price: 6999, originalPrice: 8700, image: 'https://picsum.photos/seed/b1tk/600/800', icon: 'fa-jacket' },
  { id: 121,name: 'Stonewashed Button Down', category: 'denim-shirt', type: 'shirts', price: 5199, originalPrice: 6500, image: 'https://picsum.photos/seed/c1sw/600/800', icon: 'fa-jacket' },
  { id: 122,name: 'Acid Wash Denim',         category: 'denim-shirt', type: 'shirts', price: 5699, originalPrice: 7100, image: 'https://picsum.photos/seed/d1aw/600/800', icon: 'fa-jacket' },

  // --- FORMAL (10) ---
  { id: 11, name: 'Slim Formal Shirt',       category: 'formal', type: 'shirts', price: 3999, originalPrice: 5000, image: 'https://picsum.photos/seed/e1fm/600/800', icon: 'fa-briefcase' },
  { id: 12, name: 'Linen Formal Shirt',      category: 'formal', type: 'shirts', price: 4199, originalPrice: 5200, image: 'https://picsum.photos/seed/f1lr/600/800', icon: 'fa-briefcase' },
  { id: 123,name: 'White Classic Fit',       category: 'formal', type: 'shirts', price: 3799, originalPrice: 4700, image: 'https://picsum.photos/seed/g1wh/600/800', icon: 'fa-briefcase' },
  { id: 124,name: 'French Cuff Formal',      category: 'formal', type: 'shirts', price: 4999, originalPrice: 6200, image: 'https://picsum.photos/seed/h1french/600/800', icon: 'fa-briefcase' },
  { id: 125,name: 'Herringbone Weave',       category: 'formal', type: 'shirts', price: 4399, originalPrice: 5500, image: 'https://picsum.photos/seed/i1hb/600/800', icon: 'fa-briefcase' },
  { id: 126,name: 'Micro Check Pattern',     category: 'formal', type: 'shirts', price: 3899, originalPrice: 4900, image: 'https://picsum.photos/seed/j1mc/600/800', icon: 'fa-briefcase' },
  { id: 127,name: 'Oxford Button Down',      category: 'formal', type: 'shirts', price: 3699, originalPrice: 4600, image: 'https://picsum.photos/seed/k1ox/600/800', icon: 'fa-briefcase' },
  { id: 128,name: 'Stretch Cotton Formal',   category: 'formal', type: 'shirts', price: 4099, originalPrice: 5100, image: 'https://picsum.photos/seed/l1st/600/800', icon: 'fa-briefcase' },
  { id: 129,name: 'Wing Collar Dress',       category: 'formal', type: 'shirts', price: 5299, originalPrice: 6600, image: 'https://picsum.photos/seed/m1wing/600/800', icon: 'fa-briefcase' },
  { id: 130,name: 'Striped Executive',       category: 'formal', type: 'shirts', price: 4299, originalPrice: 5400, image: 'https://picsum.photos/seed/n1ex/600/800', icon: 'fa-briefcase' },

  // --- CARGO (10) ---
  { id: 20, name: 'Cargo Parachute Pants',   category: 'cargo', type: 'pants', price: 4499, originalPrice: 5600, image: 'https://picsum.photos/seed/o1cargo/600/800', icon: 'fa-bag-shopping' },
  { id: 21, name: 'Slim Cargo Pants',        category: 'cargo', type: 'pants', price: 3999, originalPrice: 5000, image: 'https://picsum.photos/seed/p1sl/600/800', icon: 'fa-bag-shopping' },
  { id: 22, name: 'Cargo Joggers',           category: 'cargo', type: 'pants', price: 3799, originalPrice: 4700, image: 'https://picsum.photos/seed/q1jog/600/800', icon: 'fa-bag-shopping' },
  { id: 131,name: 'Tactical Cargo Pants',    category: 'cargo', type: 'pants', price: 5299, originalPrice: 6600, image: 'https://picsum.photos/seed/r1tk/600/800', icon: 'fa-bag-shopping' },
  { id: 132,name: 'Wide Leg Cargo',          category: 'cargo', type: 'pants', price: 4299, originalPrice: 5400, image: 'https://picsum.photos/seed/s1wl/600/800', icon: 'fa-bag-shopping' },
  { id: 133,name: 'Zip Pocket Cargo',        category: 'cargo', type: 'pants', price: 3899, originalPrice: 4900, image: 'https://picsum.photos/seed/t1zp/600/800', icon: 'fa-bag-shopping' },
  { id: 134,name: 'Ripstop Cargo',           category: 'cargo', type: 'pants', price: 4799, originalPrice: 6000, image: 'https://picsum.photos/seed/u1rs/600/800', icon: 'fa-bag-shopping' },
  { id: 135,name: 'Elastic Cargo Pants',     category: 'cargo', type: 'pants', price: 3599, originalPrice: 4500, image: 'https://picsum.photos/seed/v1el/600/800', icon: 'fa-bag-shopping' },
  { id: 136,name: 'Multi-Pocket Cargo',      category: 'cargo', type: 'pants', price: 4199, originalPrice: 5200, image: 'https://picsum.photos/seed/w1mp/600/800', icon: 'fa-bag-shopping' },
  { id: 137,name: 'Cuffed Cargo Sweat',      category: 'cargo', type: 'pants', price: 3299, originalPrice: 4100, image: 'https://picsum.photos/seed/x1cs/600/800', icon: 'fa-bag-shopping' },

  // --- JEANS (10) ---
  { id: 23, name: 'Slim Straight Jeans',     category: 'jeans', type: 'pants', price: 4799, originalPrice: 6000, image: 'https://picsum.photos/seed/a1sj/600/800', icon: 'fa-vest' },
  { id: 24, name: 'Baggy Denim Jeans',       category: 'jeans', type: 'pants', price: 5299, originalPrice: 6600, image: 'https://picsum.photos/seed/b1bj/600/800', icon: 'fa-vest' },
  { id: 25, name: 'Distressed Jeans',        category: 'jeans', type: 'pants', price: 4299, originalPrice: 5400, image: 'https://picsum.photos/seed/c1dj/600/800', icon: 'fa-vest' },
  { id: 138,name: 'Black Skinny Jeans',      category: 'jeans', type: 'pants', price: 4599, originalPrice: 5700, image: 'https://picsum.photos/seed/d1sk/600/800', icon: 'fa-vest' },
  { id: 139,name: 'Vintage Blue Straight',   category: 'jeans', type: 'pants', price: 4999, originalPrice: 6200, image: 'https://picsum.photos/seed/e1vb/600/800', icon: 'fa-vest' },
  { id: 140,name: 'Tapered Fit Jeans',       category: 'jeans', type: 'pants', price: 4499, originalPrice: 5600, image: 'https://picsum.photos/seed/f1tf/600/800', icon: 'fa-vest' },
  { id: 141,name: 'Light Wash Denim',        category: 'jeans', type: 'pants', price: 4199, originalPrice: 5200, image: 'https://picsum.photos/seed/g1lw/600/800', icon: 'fa-vest' },
  { id: 142,name: 'Stacked Denim Jeans',     category: 'jeans', type: 'pants', price: 5799, originalPrice: 7200, image: 'https://picsum.photos/seed/h1sd/600/800', icon: 'fa-vest' },
  { id: 143,name: 'Raw Selvedge Denim',      category: 'jeans', type: 'pants', price: 6999, originalPrice: 8700, image: 'https://picsum.photos/seed/i1rs/600/800', icon: 'fa-vest' },
  { id: 144,name: 'Ripped Knee Jeans',       category: 'jeans', type: 'pants', price: 3899, originalPrice: 4900, image: 'https://picsum.photos/seed/j1rk/600/800', icon: 'fa-vest' },

  // --- TROUSERS (10) ---
  { id: 26, name: 'Premium Black Linen Straight Fit Pants for Men – Lightweight Summer Trousers', category: 'trousers', type: 'pants', price: 2999, originalPrice: 4500, image: 'assets/images/Black Linen Trouser 1.jpeg', icon: 'fa-user-tie' },
  { id: 27, name: 'Men\'s Olive Green Linen Trousers – Straight Fit Summer Pants', category: 'trousers', type: 'pants', price: 2999, originalPrice: 4500, image: 'assets/images/Olive Linen 1.jpeg', icon: 'fa-user-tie' },
  { id: 145,name: 'Men\'s White Linen Trousers – Straight Fit Summer Pants', category: 'trousers', type: 'pants', price: 2999, originalPrice: 4500, image: 'assets/images/White Linen 1.jpeg', icon: 'fa-user-tie' },
  { id: 146,name: 'Double Pleat Dress',      category: 'trousers', type: 'pants', price: 5799, originalPrice: 7200, image: 'https://picsum.photos/seed/n1dp/600/800', icon: 'fa-user-tie' },
  { id: 147,name: 'Herringbone Trousers',    category: 'trousers', type: 'pants', price: 4699, originalPrice: 5900, image: 'https://picsum.photos/seed/o1hb/600/800', icon: 'fa-user-tie' },
  { id: 148,name: 'Cuffed Dress Trousers',   category: 'trousers', type: 'pants', price: 4399, originalPrice: 5500, image: 'https://picsum.photos/seed/p1ct/600/800', icon: 'fa-user-tie' },
  { id: 149,name: 'High Waist Trousers',     category: 'trousers', type: 'pants', price: 5099, originalPrice: 6400, image: 'https://picsum.photos/seed/q1hw/600/800', icon: 'fa-user-tie' },
  { id: 150,name: 'Tapered Formal Trousers', category: 'trousers', type: 'pants', price: 3999, originalPrice: 5000, image: 'https://picsum.photos/seed/r1ft/600/800', icon: 'fa-user-tie' },
  { id: 151,name: 'Flat Front Trousers',     category: 'trousers', type: 'pants', price: 3799, originalPrice: 4700, image: 'https://picsum.photos/seed/s1ff/600/800', icon: 'fa-user-tie' },
  { id: 152,name: 'Wool Blend Trousers',     category: 'trousers', type: 'pants', price: 6499, originalPrice: 8100, image: 'https://picsum.photos/seed/t1wb/600/800', icon: 'fa-user-tie' },
];
