/* ============================================
   ANIM CLOTHING — Collection Page
   ============================================ */

const params = new URLSearchParams(window.location.search);
const catId = params.get('cat');

let filteredProducts = [];

function getFilteredProducts() {
  if (catId) {
    return products.filter(p => p.category === catId);
  }
  return [];
}

function getPageTitle() {
  if (catId) {
    const category = categories.find(c => c.id === catId);
    if (category) {
      document.title = `ANIM — ${category.name}`;
      return { title: category.name, desc: category.desc };
    }
  }
  return { title: 'Collection', desc: '' };
}

function renderCollection() {
  const info = getPageTitle();
  if (info.title === 'Collection') {
    document.title = 'ANIM — Collection Not Found';
  }

  const tag = qs('#collTag');
  const title = qs('#collTitle');
  const desc = qs('#collDesc');
  if (tag) tag.textContent = info.title;
  if (title) title.textContent = info.title;
  if (desc) desc.textContent = info.desc;

  const grid = qs('#collectionGrid');
  if (!grid) return;

  filteredProducts = getFilteredProducts();

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 20px;">
        <i class="fas fa-box-open" style="font-size:4rem;color:var(--text-dim);display:block;margin-bottom:20px;"></i>
        <h3 style="font-size:1.5rem;color:var(--text-muted);margin-bottom:8px;">No products found</h3>
        <p style="color:var(--text-dim);">Check back soon for new arrivals in this collection.</p>
      </div>
    `;
    return;
  }

    const comingSoonCats = ['cargo', 'denim-shirt', 'formal', 'jeans'];
    const isComingSoon = comingSoonCats.includes(catId);

    const shopifyProducts = {
      trousers: [{ divId: 'product-component-1779559173010' }],
      tees: [
        { divId: 'product-component-1779565271222' },
        { divId: 'product-component-1780157136306' },
        { divId: 'product-component-1780238209057' }
      ]
    };
    const shopifyItems = shopifyProducts[catId] || [];

    let shopifyHtml = '';
    shopifyItems.forEach((item, idx) => {
      shopifyHtml += `
        <div class="collection-card-link shopify-card-wrapper" style="animation-delay:${idx * 60}ms; display: block; text-decoration: none;">
          <div class="collection-card" style="padding:0; overflow:hidden; background:none; box-shadow:none;">
            <div id="${item.divId}"></div>
          </div>
        </div>
      `;
    });

    grid.innerHTML = shopifyHtml + filteredProducts.map((p, i) => {
      const offset = shopifyItems.length + i;
      const inWishlist = wishlist.includes(p.id);
      const imagePath = `assets/images/${p.category}-${p.id}.jpg`;
      return `
        <div class="collection-card-link" style="animation-delay:${offset * 60}ms; display: block; text-decoration: none; cursor:${isComingSoon ? 'default' : 'pointer'};">
          <div class="collection-card">
            <div class="collection-card-image">
              ${isComingSoon ? '<span class="coming-soon-badge">Coming Soon</span>' : ''}
              <img src="${imagePath}" alt="${p.name}" loading="lazy" onerror="this.src='assets/images/default.jpg'">
            </div>
            <div class="collection-card-body">
              <h3>${p.name}</h3>
              <span class="collection-card-price">Rs. ${p.price.toLocaleString('en-PK')}</span>
              <div class="collection-card-actions">
                ${isComingSoon
                  ? '<button class="btn btn-primary coming-soon-btn" disabled><i class="fas fa-clock"></i> Coming Soon</button>'
                  : `<button class="btn btn-primary add-cart-btn" data-id="${p.id}" onclick="event.stopPropagation(); addToCart(${p.id});">
                      <i class="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                    <button class="wishlist-btn ${inWishlist ? 'wishlisted' : ''}" data-id="${p.id}" onclick="event.stopPropagation(); toggleWishlist(${p.id});" aria-label="Wishlist">
                      <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
                    </button>`
                }
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (shopifyItems.length) {
      loadShopifyBuyButton(catId);
    }

  qsa('.add-cart-btn', grid).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(parseInt(btn.dataset.id));
    });
  });
  qsa('.wishlist-btn', grid).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(parseInt(btn.dataset.id));
    });
  });
}

function loadShopifyBuyButton(cat) {
  var configs = {
    trousers: [{
      divId: 'product-component-1779559173010',
      productId: '9168699097314',
      options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px"
        }
      },
      "title": {
        "font-family": "Big Caslon, serif",
        "font-weight": "normal",
        "color": "#ffffff"
      },
      "price": {
        "font-family": "Quantico, sans-serif",
        "font-weight": "bold",
        "font-size": "15px",
        "color": "#f97316"
      },
      "compareAt": {
        "font-family": "Quantico, sans-serif",
        "font-weight": "bold",
        "font-size": "12.75px",
        "color": "#888"
      },
      "unitPrice": {
        "font-family": "Quantico, sans-serif",
        "font-weight": "bold",
        "font-size": "12.75px",
        "color": "#888"
      },
      "button": {
        ":hover": {
          "background-color": "#ea580c"
        },
        "background-color": "#f97316",
        ":focus": {
          "background-color": "#ea580c"
        },
        "border-radius": "8px",
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "letter-spacing": "0.5px"
      }
    },
    "buttonDestination": "modal",
    "contents": {
      "options": false
    },
    "text": {
      "button": "View product"
    },
    "googleFonts": [
      "Quantico",
      "Inter"
    ]
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "title": {
        "font-family": "Inter, sans-serif",
        "font-weight": "700",
        "font-size": "24px",
        "color": "#ffffff"
      },
      "price": {
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "font-size": "20px",
        "color": "#f97316"
      },
      "compareAt": {
        "font-family": "Inter, sans-serif",
        "font-weight": "400",
        "font-size": "16px",
        "color": "#888"
      },
      "unitPrice": {
        "font-family": "Inter, sans-serif",
        "font-weight": "400",
        "font-size": "14px",
        "color": "#888"
      },
      "button": {
        ":hover": {
          "background-color": "#ea580c"
        },
        "background-color": "#f97316",
        ":focus": {
          "background-color": "#ea580c"
        },
        "border-radius": "8px",
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "letter-spacing": "0.5px",
        "text-transform": "uppercase"
      },
      "description": {
        "font-family": "Inter, sans-serif",
        "color": "#cccccc",
        "font-size": "14px"
      }
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "option": {
    "styles": {
      "label": {
        "font-family": "Inter, sans-serif",
        "color": "#ffffff",
        "font-weight": "600",
        "font-size": "13px",
        "text-transform": "uppercase",
        "letter-spacing": "0.5px"
      },
      "select": {
        "font-family": "Inter, sans-serif",
        "background-color": "#1a1a1a",
        "color": "#ffffff",
        "border": "1px solid #333",
        "border-radius": "6px",
        "padding": "10px 14px"
      }
    }
  },
  "cart": {
    "styles": {
      "button": {
        ":hover": {
          "background-color": "#ea580c"
        },
        "background-color": "#f97316",
        ":focus": {
          "background-color": "#ea580c"
        },
        "border-radius": "8px",
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "letter-spacing": "0.5px"
      }
    },
    "text": {
      "total": "Subtotal",
      "button": "Checkout"
    }
  },
  "toggle": {
    "styles": {
      "toggle": {
        "font-family": "Inter, sans-serif",
        "background-color": "#f97316",
        ":hover": {
          "background-color": "#ea580c"
        },
        ":focus": {
          "background-color": "#ea580c"
        },
        "border-radius": "50%"
      },
      "count": {
        "font-family": "Inter, sans-serif",
        "color": "#ffffff",
        "font-weight": "700"
      }
    }
  }
  }
    }],
    tees: [{
      divId: 'product-component-1779565271222',
      productId: '9171510624482',
      options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px"
        }
      },
      "title": {
        "font-family": "Big Caslon, serif",
        "font-weight": "normal",
        "color": "#ffffff"
      },
      "price": {
        "font-family": "Quantico, sans-serif",
        "font-weight": "bold",
        "font-size": "15px",
        "color": "#f97316"
      },
      "compareAt": {
        "font-family": "Quantico, sans-serif",
        "font-weight": "bold",
        "font-size": "12.75px",
        "color": "#888"
      },
      "unitPrice": {
        "font-family": "Quantico, sans-serif",
        "font-weight": "bold",
        "font-size": "12.75px",
        "color": "#888"
      },
      "button": {
        ":hover": {
          "background-color": "#ea580c"
        },
        "background-color": "#f97316",
        ":focus": {
          "background-color": "#ea580c"
        },
        "border-radius": "8px",
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "letter-spacing": "0.5px"
      }
    },
    "buttonDestination": "modal",
    "contents": {
      "options": false
    },
    "text": {
      "button": "View product"
    },
    "googleFonts": [
      "Quantico",
      "Inter"
    ]
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "title": {
        "font-family": "Inter, sans-serif",
        "font-weight": "700",
        "font-size": "24px",
        "color": "#ffffff"
      },
      "price": {
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "font-size": "20px",
        "color": "#f97316"
      },
      "compareAt": {
        "font-family": "Inter, sans-serif",
        "font-weight": "400",
        "font-size": "16px",
        "color": "#888"
      },
      "unitPrice": {
        "font-family": "Inter, sans-serif",
        "font-weight": "400",
        "font-size": "14px",
        "color": "#888"
      },
      "button": {
        ":hover": {
          "background-color": "#ea580c"
        },
        "background-color": "#f97316",
        ":focus": {
          "background-color": "#ea580c"
        },
        "border-radius": "8px",
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "letter-spacing": "0.5px",
        "text-transform": "uppercase"
      },
      "description": {
        "font-family": "Inter, sans-serif",
        "color": "#cccccc",
        "font-size": "14px"
      }
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "option": {
    "styles": {
      "label": {
        "font-family": "Inter, sans-serif",
        "color": "#ffffff",
        "font-weight": "600",
        "font-size": "13px",
        "text-transform": "uppercase",
        "letter-spacing": "0.5px"
      },
      "select": {
        "font-family": "Inter, sans-serif",
        "background-color": "#1a1a1a",
        "color": "#ffffff",
        "border": "1px solid #333",
        "border-radius": "6px",
        "padding": "10px 14px"
      }
    }
  },
  "cart": {
    "styles": {
      "button": {
        ":hover": {
          "background-color": "#ea580c"
        },
        "background-color": "#f97316",
        ":focus": {
          "background-color": "#ea580c"
        },
        "border-radius": "8px",
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "letter-spacing": "0.5px"
      }
    },
    "text": {
      "total": "Subtotal",
      "button": "Checkout"
    }
  },
  "toggle": {
    "styles": {
      "toggle": {
        "font-family": "Inter, sans-serif",
        "background-color": "#f97316",
        ":hover": {
          "background-color": "#ea580c"
        },
        ":focus": {
          "background-color": "#ea580c"
        },
        "border-radius": "50%"
      },
      "count": {
        "font-family": "Inter, sans-serif",
        "color": "#ffffff",
        "font-weight": "700"
      }
    }
  }
}
    },
    {
      divId: 'product-component-1780157136306',
      productId: '9171510624482',
      options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px"
        }
      },
      "title": {
        "font-family": "Karla, sans-serif"
      },
      "button": {
        "font-family": "Open Sans, sans-serif",
        "font-weight": "bold",
        ":hover": {
          "background-color": "#302727"
        },
        "background-color": "#1c1717",
        ":focus": {
          "background-color": "#302727"
        },
        "border-radius": "25px"
      },
      "price": {
        "font-family": "Lora, serif"
      },
      "compareAt": {
        "font-family": "Lora, serif"
      },
      "unitPrice": {
        "font-family": "Lora, serif"
      }
    },
    "buttonDestination": "modal",
    "contents": {
      "options": false
    },
    "text": {
      "button": "View product"
    },
    "googleFonts": [
      "Karla",
      "Lora",
      "Open Sans"
    ]
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "button": {
        "font-family": "Open Sans, sans-serif",
        "font-weight": "bold",
        ":hover": {
          "background-color": "#302727"
        },
        "background-color": "#1c1717",
        ":focus": {
          "background-color": "#302727"
        },
        "border-radius": "25px"
      },
      "title": {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "bold",
        "font-size": "26px",
        "color": "#4c4c4c"
      },
      "price": {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "18px",
        "color": "#4c4c4c"
      },
      "compareAt": {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "15.299999999999999px",
        "color": "#4c4c4c"
      },
      "unitPrice": {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "15.299999999999999px",
        "color": "#4c4c4c"
      }
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "option": {},
  "cart": {
    "styles": {
      "button": {
        "font-family": "Open Sans, sans-serif",
        "font-weight": "bold",
        ":hover": {
          "background-color": "#302727"
        },
        "background-color": "#1c1717",
        ":focus": {
          "background-color": "#302727"
        },
        "border-radius": "25px"
      }
    },
    "text": {
      "total": "Subtotal",
      "button": "Checkout"
    },
    "popup": false,
    "googleFonts": [
      "Open Sans"
    ]
  },
  "toggle": {
    "styles": {
      "toggle": {
        "font-family": "Open Sans, sans-serif",
        "font-weight": "bold",
        "background-color": "#1c1717",
        ":hover": {
          "background-color": "#302727"
        },
        ":focus": {
          "background-color": "#302727"
        }
      }
    },
    "googleFonts": [
      "Open Sans"
    ]
  }
}
    },
    {
      divId: 'product-component-1780238209057',
      productId: '9211171406050',
      options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px"
        }
      },
      "title": {
        "font-family": "Karla, sans-serif"
      },
      "button": {
        "font-family": "Droid Sans, sans-serif",
        "font-weight": "bold",
        ":hover": {
          "background-color": "#200303"
        },
        "background-color": "#130202",
        ":focus": {
          "background-color": "#200303"
        },
        "border-radius": "28px",
        "padding-left": "39px",
        "padding-right": "39px"
      },
      "price": {
        "font-family": "Geneva, sans-serif",
        "font-size": "16px"
      },
      "compareAt": {
        "font-family": "Geneva, sans-serif",
        "font-size": "13.6px"
      },
      "unitPrice": {
        "font-family": "Geneva, sans-serif",
        "font-size": "13.6px"
      }
    },
    "buttonDestination": "modal",
    "contents": {
      "options": false
    },
    "text": {
      "button": "View product"
    },
    "googleFonts": [
      "Karla",
      "Droid Sans"
    ]
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "button": {
        "font-family": "Droid Sans, sans-serif",
        "font-weight": "bold",
        ":hover": {
          "background-color": "#200303"
        },
        "background-color": "#130202",
        ":focus": {
          "background-color": "#200303"
        },
        "border-radius": "28px",
        "padding-left": "39px",
        "padding-right": "39px"
      },
      "title": {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "bold",
        "font-size": "26px",
        "color": "#4c4c4c"
      },
      "price": {
        "font-family": "Montserrat, sans-serif",
        "font-weight": "bold",
        "font-size": "19px",
        "color": "#0e0101"
      },
      "compareAt": {
        "font-family": "Montserrat, sans-serif",
        "font-weight": "bold",
        "font-size": "16.15px",
        "color": "#0e0101"
      },
      "unitPrice": {
        "font-family": "Montserrat, sans-serif",
        "font-weight": "bold",
        "font-size": "16.15px",
        "color": "#0e0101"
      },
      "description": {
        "font-family": "Arial, sans-serif",
        "font-size": "15px"
      }
    },
    "googleFonts": [
      "Montserrat",
      "Droid Sans"
    ],
    "text": {
      "button": "Add to cart"
    }
  },
  "modal": {
    "styles": {
      "modal": {
        "background-color": "#dadae5"
      }
    }
  },
  "option": {},
  "cart": {
    "styles": {
      "button": {
        "font-family": "Droid Sans, sans-serif",
        "font-weight": "bold",
        ":hover": {
          "background-color": "#200303"
        },
        "background-color": "#130202",
        ":focus": {
          "background-color": "#200303"
        },
        "border-radius": "28px"
      },
      "title": {
        "color": "#220202"
      },
      "header": {
        "color": "#220202"
      },
      "lineItems": {
        "color": "#220202"
      },
      "subtotalText": {
        "color": "#220202"
      },
      "subtotal": {
        "color": "#220202"
      },
      "notice": {
        "color": "#220202"
      },
      "currency": {
        "color": "#220202"
      },
      "close": {
        "color": "#220202",
        ":hover": {
          "color": "#220202"
        }
      },
      "empty": {
        "color": "#220202"
      },
      "noteDescription": {
        "color": "#220202"
      },
      "discountText": {
        "color": "#220202"
      },
      "discountIcon": {
        "fill": "#220202"
      },
      "discountAmount": {
        "color": "#220202"
      },
      "cart": {
        "background-color": "#dbc5c5"
      },
      "footer": {
        "background-color": "#dbc5c5"
      }
    },
    "text": {
      "total": "Subtotal",
      "button": "Checkout"
    },
    "contents": {
      "note": true
    },
    "popup": false,
    "googleFonts": [
      "Droid Sans"
    ]
  },
  "toggle": {
    "styles": {
      "toggle": {
        "font-family": "Droid Sans, sans-serif",
        "font-weight": "bold",
        "background-color": "#130202",
        ":hover": {
          "background-color": "#200303"
        },
        ":focus": {
          "background-color": "#200303"
        }
      }
    },
    "googleFonts": [
      "Droid Sans"
    ]
  },
  "lineItem": {
    "styles": {
      "variantTitle": {
        "color": "#220202"
      },
      "title": {
        "color": "#220202"
      },
      "price": {
        "color": "#220202"
      },
      "fullPrice": {
        "color": "#220202"
      },
      "discount": {
        "color": "#220202"
      },
      "discountIcon": {
        "fill": "#220202"
      },
      "quantity": {
        "color": "#220202"
      },
      "quantityIncrement": {
        "color": "#220202",
        "border-color": "#220202"
      },
      "quantityDecrement": {
        "color": "#220202",
        "border-color": "#220202"
      },
      "quantityInput": {
        "color": "#220202",
        "border-color": "#220202"
      }
    }
  }
}
    }]
  };

  var items = configs[cat];
  if (!items || !items.length) return;

  var loaded = false;
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  function ensureScript(cb) {
    if (loaded) { cb(); return; }
    if (window.ShopifyBuy && window.ShopifyBuy.UI) { loaded = true; cb(); return; }
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = function () { loaded = true; cb(); };
  }
  ensureScript(function () {
    var client = ShopifyBuy.buildClient({
      domain: 'zhq0v0-vg.myshopify.com',
      storefrontAccessToken: 'b8aa981fe82ef31a636e9bbd917363d6',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      items.forEach(function (item) {
        ui.createComponent('product', {
          id: item.productId,
          node: document.getElementById(item.divId),
          moneyFormat: 'Rs.%7B%7Bamount%7D%7D',
          options: item.options
        });
      });
    });
  });
}

function init() {
  renderCollection();
  updateCartUI();
  updateWishlistUI();
  setupSharedSidebars();

  const nav = qs('#navbar');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', init);
