/* ============================================
   ANIM CLOTHING — Shared Data
   ============================================ */

const categories = [
  { id: 'oversized', name: 'Oversized Tees', type: 'shirts', icon: 'fa-tshirt', desc: 'Relaxed fits, bold energy' },
  { id: 'polo', name: 'Polo Shirts', type: 'shirts', icon: 'fa-gem', desc: 'Classic sophistication' },
  { id: 'denim-shirt', name: 'Denim Shirts', type: 'shirts', icon: 'fa-jacket', desc: 'Timeless ruggedness' },
  { id: 'formal', name: 'Formal Shirts', type: 'shirts', icon: 'fa-briefcase', desc: 'Sharp precision' },
  { id: 'cargo', name: 'Cargo Pants', type: 'pants', icon: 'fa-bag-shopping', desc: 'Utility meets style' },
  { id: 'jeans', name: 'Denim Jeans', type: 'pants', icon: 'fa-vest', desc: 'Forever classic' },
  { id: 'trousers', name: 'Trousers', type: 'pants', icon: 'fa-user-tie', desc: 'Clean lines' },
];

const products = [
  // --- OVERSIZED TEES (10) ---
  { id: 1,  name: 'Acid Wash Oversized',     category: 'oversized', type: 'shirts', price: 3499, icon: 'fa-tshirt' },
  { id: 2,  name: 'Black Heavyweight Tee',   category: 'oversized', type: 'shirts', price: 3199, icon: 'fa-tshirt' },
  { id: 3,  name: 'Cream Drop Shoulder',     category: 'oversized', type: 'shirts', price: 3299, icon: 'fa-tshirt' },
  { id: 100,name: 'Grey Vintage Wash',       category: 'oversized', type: 'shirts', price: 3399, icon: 'fa-tshirt' },
  { id: 101,name: 'Olive Green Oversized',   category: 'oversized', type: 'shirts', price: 3699, icon: 'fa-tshirt' },
  { id: 102,name: 'Navy Blue Relaxed',       category: 'oversized', type: 'shirts', price: 3499, icon: 'fa-tshirt' },
  { id: 103,name: 'Burgundy Slouch Tee',     category: 'oversized', type: 'shirts', price: 3799, icon: 'fa-tshirt' },
  { id: 104,name: 'White Textured Tee',      category: 'oversized', type: 'shirts', price: 2999, icon: 'fa-tshirt' },
  { id: 105,name: 'Charcoal Raw Edge',       category: 'oversized', type: 'shirts', price: 3599, icon: 'fa-tshirt' },
  { id: 106,name: 'Sand Washed Loose',       category: 'oversized', type: 'shirts', price: 3499, icon: 'fa-tshirt' },

  // --- POLO (10) ---
  { id: 7,  name: 'Slim Fit Polo',           category: 'polo', type: 'shirts', price: 4499, icon: 'fa-gem' },
  { id: 8,  name: 'Two-Tone Polo',           category: 'polo', type: 'shirts', price: 4799, icon: 'fa-gem' },
  { id: 107,name: 'Classic Black Polo',      category: 'polo', type: 'shirts', price: 4199, icon: 'fa-gem' },
  { id: 108,name: 'Striped Club Polo',       category: 'polo', type: 'shirts', price: 4399, icon: 'fa-gem' },
  { id: 109,name: 'Performance Knit Polo',   category: 'polo', type: 'shirts', price: 5299, icon: 'fa-gem' },
  { id: 110,name: 'Contrast Collar Polo',    category: 'polo', type: 'shirts', price: 4599, icon: 'fa-gem' },
  { id: 111,name: 'Piqué Textured Polo',     category: 'polo', type: 'shirts', price: 4299, icon: 'fa-gem' },
  { id: 112,name: 'Long Sleeve Polo',        category: 'polo', type: 'shirts', price: 4699, icon: 'fa-gem' },
  { id: 113,name: 'Heritage Logo Polo',      category: 'polo', type: 'shirts', price: 5499, icon: 'fa-gem' },
  { id: 114,name: 'Linen Blend Polo',        category: 'polo', type: 'shirts', price: 4999, icon: 'fa-gem' },

  // --- DENIM SHIRTS (10) ---
  { id: 9,  name: 'Classic Denim Shirt',     category: 'denim-shirt', type: 'shirts', price: 5299, icon: 'fa-jacket' },
  { id: 10, name: 'Washed Denim Jacket',     category: 'denim-shirt', type: 'shirts', price: 6499, icon: 'fa-jacket' },
  { id: 115,name: 'Raw Indigo Shirt',        category: 'denim-shirt', type: 'shirts', price: 5799, icon: 'fa-jacket' },
  { id: 116,name: 'Patchwork Denim',         category: 'denim-shirt', type: 'shirts', price: 6199, icon: 'fa-jacket' },
  { id: 117,name: 'Black Denim Overshirt',   category: 'denim-shirt', type: 'shirts', price: 5999, icon: 'fa-jacket' },
  { id: 118,name: 'Vintage Faded Denim',     category: 'denim-shirt', type: 'shirts', price: 5499, icon: 'fa-jacket' },
  { id: 119,name: 'Double Pocket Denim',     category: 'denim-shirt', type: 'shirts', price: 5799, icon: 'fa-jacket' },
  { id: 120,name: 'Denim Trucker Jacket',    category: 'denim-shirt', type: 'shirts', price: 6999, icon: 'fa-jacket' },
  { id: 121,name: 'Stonewashed Button Down', category: 'denim-shirt', type: 'shirts', price: 5199, icon: 'fa-jacket' },
  { id: 122,name: 'Acid Wash Denim',         category: 'denim-shirt', type: 'shirts', price: 5699, icon: 'fa-jacket' },

  // --- FORMAL (10) ---
  { id: 11, name: 'Slim Formal Shirt',       category: 'formal', type: 'shirts', price: 3999, icon: 'fa-briefcase' },
  { id: 12, name: 'Linen Formal Shirt',      category: 'formal', type: 'shirts', price: 4199, icon: 'fa-briefcase' },
  { id: 123,name: 'White Classic Fit',       category: 'formal', type: 'shirts', price: 3799, icon: 'fa-briefcase' },
  { id: 124,name: 'French Cuff Formal',      category: 'formal', type: 'shirts', price: 4999, icon: 'fa-briefcase' },
  { id: 125,name: 'Herringbone Weave',       category: 'formal', type: 'shirts', price: 4399, icon: 'fa-briefcase' },
  { id: 126,name: 'Micro Check Pattern',     category: 'formal', type: 'shirts', price: 3899, icon: 'fa-briefcase' },
  { id: 127,name: 'Oxford Button Down',      category: 'formal', type: 'shirts', price: 3699, icon: 'fa-briefcase' },
  { id: 128,name: 'Stretch Cotton Formal',   category: 'formal', type: 'shirts', price: 4099, icon: 'fa-briefcase' },
  { id: 129,name: 'Wing Collar Dress',       category: 'formal', type: 'shirts', price: 5299, icon: 'fa-briefcase' },
  { id: 130,name: 'Striped Executive',       category: 'formal', type: 'shirts', price: 4299, icon: 'fa-briefcase' },

  // --- CARGO (10) ---
  { id: 20, name: 'Cargo Parachute Pants',   category: 'cargo', type: 'pants', price: 4499, icon: 'fa-bag-shopping' },
  { id: 21, name: 'Slim Cargo Pants',        category: 'cargo', type: 'pants', price: 3999, icon: 'fa-bag-shopping' },
  { id: 22, name: 'Cargo Joggers',           category: 'cargo', type: 'pants', price: 3799, icon: 'fa-bag-shopping' },
  { id: 131,name: 'Tactical Cargo Pants',    category: 'cargo', type: 'pants', price: 5299, icon: 'fa-bag-shopping' },
  { id: 132,name: 'Wide Leg Cargo',          category: 'cargo', type: 'pants', price: 4299, icon: 'fa-bag-shopping' },
  { id: 133,name: 'Zip Pocket Cargo',        category: 'cargo', type: 'pants', price: 3899, icon: 'fa-bag-shopping' },
  { id: 134,name: 'Ripstop Cargo',           category: 'cargo', type: 'pants', price: 4799, icon: 'fa-bag-shopping' },
  { id: 135,name: 'Elastic Cargo Pants',     category: 'cargo', type: 'pants', price: 3599, icon: 'fa-bag-shopping' },
  { id: 136,name: 'Multi-Pocket Cargo',      category: 'cargo', type: 'pants', price: 4199, icon: 'fa-bag-shopping' },
  { id: 137,name: 'Cuffed Cargo Sweat',      category: 'cargo', type: 'pants', price: 3299, icon: 'fa-bag-shopping' },

  // --- JEANS (10) ---
  { id: 23, name: 'Slim Straight Jeans',     category: 'jeans', type: 'pants', price: 4799, icon: 'fa-vest' },
  { id: 24, name: 'Baggy Denim Jeans',       category: 'jeans', type: 'pants', price: 5299, icon: 'fa-vest' },
  { id: 25, name: 'Distressed Jeans',        category: 'jeans', type: 'pants', price: 4299, icon: 'fa-vest' },
  { id: 138,name: 'Black Skinny Jeans',      category: 'jeans', type: 'pants', price: 4599, icon: 'fa-vest' },
  { id: 139,name: 'Vintage Blue Straight',   category: 'jeans', type: 'pants', price: 4999, icon: 'fa-vest' },
  { id: 140,name: 'Tapered Fit Jeans',       category: 'jeans', type: 'pants', price: 4499, icon: 'fa-vest' },
  { id: 141,name: 'Light Wash Denim',        category: 'jeans', type: 'pants', price: 4199, icon: 'fa-vest' },
  { id: 142,name: 'Stacked Denim Jeans',     category: 'jeans', type: 'pants', price: 5799, icon: 'fa-vest' },
  { id: 143,name: 'Raw Selvedge Denim',      category: 'jeans', type: 'pants', price: 6999, icon: 'fa-vest' },
  { id: 144,name: 'Ripped Knee Jeans',       category: 'jeans', type: 'pants', price: 3899, icon: 'fa-vest' },

  // --- TROUSERS (10) ---
  { id: 26, name: 'Pleated Trousers',        category: 'trousers', type: 'pants', price: 4799, icon: 'fa-user-tie' },
  { id: 27, name: 'Wide Leg Trousers',       category: 'trousers', type: 'pants', price: 5299, icon: 'fa-user-tie' },
  { id: 145,name: 'Straight Cut Trousers',   category: 'trousers', type: 'pants', price: 4199, icon: 'fa-user-tie' },
  { id: 146,name: 'Double Pleat Dress',      category: 'trousers', type: 'pants', price: 5799, icon: 'fa-user-tie' },
  { id: 147,name: 'Herringbone Trousers',    category: 'trousers', type: 'pants', price: 4699, icon: 'fa-user-tie' },
  { id: 148,name: 'Cuffed Dress Trousers',   category: 'trousers', type: 'pants', price: 4399, icon: 'fa-user-tie' },
  { id: 149,name: 'High Waist Trousers',     category: 'trousers', type: 'pants', price: 5099, icon: 'fa-user-tie' },
  { id: 150,name: 'Tapered Formal Trousers', category: 'trousers', type: 'pants', price: 3999, icon: 'fa-user-tie' },
  { id: 151,name: 'Flat Front Trousers',     category: 'trousers', type: 'pants', price: 3799, icon: 'fa-user-tie' },
  { id: 152,name: 'Wool Blend Trousers',     category: 'trousers', type: 'pants', price: 6499, icon: 'fa-user-tie' },
];
