
(function () {
  const WA_NUMBER = '6285726898732';

  const fmt = n => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(n);

  const products = window.SURYA_PRODUCTS || [];

  // DAFTAR HARGA TERBARU
  const PRICE_LISTS = {
    ayam: [
      { weight: '50 Gr', price: 6000 },
      { weight: '90 Gr', price: 10800 },
      { weight: '125 Gr', price: 15000 },
      { weight: '250 Gr', price: 30000 },
      { weight: '500 Gr', price: 60000 },
      { weight: '1000 Gr', price: 120000 },
      { weight: 'CUSTOM', price: 130000 }
    ],
    sapi: [
      { weight: '50 Gr', price: 8000 },
      { weight: '100 Gr', price: 16000 },
      { weight: '125 Gr', price: 20000 },
      { weight: '250 Gr', price: 40000 },
      { weight: '500 Gr', price: 80000 },
      { weight: '1000 Gr', price: 160000 },
      { weight: 'CUSTOM', price: 170000 }
    ]
  };

  const find = id => products.find(p => p.id === id);

  function orderLink(productName) {
    const message = `Halo Abon Surya, saya ingin membeli produk ${productName}. Mohon informasi ketersediaan stok, ukuran kemasan, harga terbaru, dan cara pemesanannya. Terima kasih.`;

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  // TABEL HARGA BERDASARKAN KATEGORI
  function priceTable(category) {
    const prices = PRICE_LISTS[category] || [];

    return `
      <div class="table-responsive mt-4">
        <h5 class="fw-bold mb-3">Daftar Harga Abon ${category.toUpperCase()}</h5>
        <table class="table table-bordered table-striped align-middle">
          <thead>
            <tr>
              <th>Ukuran Kemasan</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            ${prices.map(item => `
              <tr>
                <td>${item.weight}</td>
                <td class="fw-bold">${fmt(item.price)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // KARTU PRODUK
  function card(p) {
    const startingPrice = PRICE_LISTS[p.category]?.[0]?.price;

    const price = startingPrice
      ? `<div class="price">Mulai ${fmt(startingPrice)} <span class="price-muted">/ 50 Gr</span></div>`
      : '<div class="price-muted">Hubungi admin untuk harga</div>';

    return `
      <div class="col-6 col-lg-4 col-xl-3 product-entry"
           data-category="${p.category}">
        <article class="product-card">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="card-body">
            <span class="product-tag">Abon ${p.category}</span>
            <h5 class="mt-2 mb-2">${p.name}</h5>
            ${price}
            <div class="product-actions mt-3">
              <a class="btn btn-success btn-sm rounded-pill flex-grow-1"
                 href="${orderLink(p.name)}"
                 target="_blank" rel="noopener">
                <i class="fab fa-whatsapp me-1"></i>Pesan via WA
              </a>
              <a class="btn btn-outline-primary btn-sm rounded-pill"
                 href="product.html?id=${encodeURIComponent(p.id)}"
                 aria-label="Detail ${p.name}">
                <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  // MENAMPILKAN KATALOG
  function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const params = new URLSearchParams(location.search);
    const initial = params.get('category');

    let list = products;

    if (initial === 'ayam' || initial === 'sapi') {
      list = products.filter(p => p.category === initial);

      document.querySelectorAll('[data-filter]').forEach(button => {
        button.classList.toggle(
          'active',
          button.dataset.filter === initial
        );
      });
    }

    grid.innerHTML = list.map(card).join('');
  }

  // FILTER KATEGORI
  function filterProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    document.querySelectorAll('[data-filter]').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(item => {
          item.classList.remove('active');
        });

        button.classList.add('active');

        const category = button.dataset.filter;

        const filtered = category === 'all'
          ? products
          : products.filter(p => p.category === category);

        grid.innerHTML = filtered.map(card).join('');

        const url = new URL(location.href);

        if (category === 'all') {
          url.searchParams.delete('category');
        } else {
          url.searchParams.set('category', category);
        }

        history.replaceState({}, '', url);
      });
    });
  }

  // DETAIL PRODUK
  function renderDetail() {
    const el = document.getElementById('productDetail');
    if (!el) return;

    const id = new URLSearchParams(location.search).get('id');
    const p = find(id) || products[0];

    if (!p) {
      el.innerHTML = '<p>Produk tidak ditemukan.</p>';
      return;
    }

    el.innerHTML = `
      <div class="row g-5 align-items-center">
        <div class="col-lg-6">
          <img class="content-photo"
               style="max-height:560px;object-fit:contain;background:#fff9ec"
               src="${p.image}"
               alt="${p.name}">
        </div>

        <div class="col-lg-6">
          <span class="product-tag">Abon ${p.category}</span>

          <h2 class="section-title mt-2">${p.name}</h2>

          <p class="text-muted">
            Produk termasuk dalam daftar produk pada lampiran
            Sertifikat Halal Surya Home Industry.
          </p>

          <p class="mt-3">
            Tersedia dalam berbagai pilihan ukuran kemasan.
            Silakan lihat daftar harga berikut.
          </p>

          ${priceTable(p.category)}

          <p class="mt-3">
            Untuk memastikan stok dan pemesanan, silakan hubungi
            admin Abon Surya.
          </p>

          <div class="d-flex gap-2 flex-wrap">
            <a class="btn btn-success rounded-pill px-4"
               target="_blank"
               rel="noopener"
               href="${orderLink(p.name)}">
              <i class="fab fa-whatsapp me-2"></i>
              Saya Ingin Membeli Produk Ini
            </a>

            <a class="btn btn-outline-primary rounded-pill px-4"
               href="products.html">
              <i class="fas fa-arrow-left me-2"></i>
              Kembali ke Katalog
            </a>
          </div>

          <div class="small-note mt-3">
            Pesan akan terbuka otomatis di WhatsApp.
            Admin akan mengonfirmasi stok dan pesanan.
          </div>
        </div>
      </div>
    `;
  }

  // INISIALISASI WEBSITE
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    filterProducts();
    renderDetail();

    document.querySelectorAll('#year').forEach(element => {
      element.textContent = new Date().getFullYear();
    });

    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.getElementById('mainNav');

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const opened = menu.classList.toggle('show');

        toggle.setAttribute(
          'aria-expanded',
          opened ? 'true' : 'false'
        );
      });

      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          menu.classList.remove('show');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });
})();
