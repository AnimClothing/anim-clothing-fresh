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
      trousers: { divId: 'product-component-1779559173010' },
      tees: { divId: 'product-component-1779565271222' }
    };
    const hasShopify = shopifyProducts[catId];

    let shopifyHtml = '';
    if (hasShopify) {
      shopifyHtml = `
        <div class="collection-card-link shopify-card-wrapper" style="animation-delay:0ms; display: block; text-decoration: none;">
          <div class="collection-card" style="padding:0; overflow:hidden; background:none; box-shadow:none;">
            <div id="${hasShopify.divId}"></div>
          </div>
        </div>
      `;
    }

    grid.innerHTML = shopifyHtml + filteredProducts.map((p, i) => {
      const offset = hasShopify ? i + 1 : i;
      const inWishlist = wishlist.includes(p.id);
      const imagePath = `assets/images/${p.category}-${p.id}.jpg`;
      return `
        <div class="collection-card-link" style="animation-delay:${offset * 60}ms; display: block; text-decoration: none; cursor:${isComingSoon ? 'default' : 'pointer'};">
          <div class="collection-card">
            <div class="collection-card-image">
              ${isComingSoon ? '<span class="coming-soon-badge">Coming Soon</span>' : ''}
              <img src="${imagePath}" alt="${p.name}" onerror="this.src='assets/images/default.jpg'">
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

    if (hasShopify) {
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
    trousers: {
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
    },
    tees: {
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
    }
  };

  var config = configs[cat];
  if (!config) return;

  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      shopifyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = shopifyInit;
  }
  function shopifyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'zhq0v0-vg.myshopify.com',
      storefrontAccessToken: 'b8aa981fe82ef31a636e9bbd917363d6',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: config.productId,
        node: document.getElementById(config.divId),
        moneyFormat: 'Rs.%7B%7Bamount%7D%7D',
        options: config.options
      });
    });
  }
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
