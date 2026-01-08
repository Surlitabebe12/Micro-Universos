const imageBaseUrl = 'https://www.microuniversos.com/Public/';
const cart = [];
let allProducts = [];
let renderVersion = 0;
const visitBadgeBase = 'https://api.visitorbadge.io/api/visitors';
const visitPath = 'microuniversos.com';
const visitOptOutKey = 'mu_nohit';

function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            if (existingProduct.quantity + quantity <= product.quantity) {
                existingProduct.quantity += quantity;
            } else {
                alert(`No hay más unidades disponibles para ${product.name}`);
            }
        } else {
            if (quantity <= product.quantity) {
                cart.push({ id: product.id, name: product.name, price: product.price, quantity: quantity, image: product.images[0] });
            } else {
                alert(`No hay más unidades disponibles para ${product.name}`);
            }
        }
        updateCart();
        animateCartButton(productId);
        animateCartIcon();
    }
}


function updateCart() {
    const cartList = document.querySelector('#cart-modal ul');
    const totalElement = document.getElementById('total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartCounter = document.getElementById('cart-counter');
    let total = 0;
    let itemCount = 0;

    cartList.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        totalElement.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        cart.forEach(item => {
            total += item.price * item.quantity;
            itemCount += item.quantity;
            cartList.innerHTML += `
                <li>
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-controls">
                        <button onclick="removeFromCart(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="addToCart(${item.id}, 1)">+</button>
                    </div>
                </li>
            `;
        });
        totalElement.style.display = 'block';
        totalElement.textContent = `Total: $${total % 1 === 0 ? total : total.toFixed(2)}`;
    }

    cartCounter.textContent = itemCount;
    animateCartIcon();
}


function removeFromCart(productId) {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
        productInCart.quantity--;
        if (productInCart.quantity === 0) {
            const index = cart.indexOf(productInCart);
            cart.splice(index, 1);
        }
        updateCart();
    }
}

function shareCart() {
    const cartItems = cart.map(item => `${item.name} (Cantidad: ${item.quantity})`).join(', ');
    const message = `Productos: ${cartItems}`;
    const phoneNumber = '+59897535096';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}


function renderProducts(products) {
    const productsContainer = document.querySelector('.products-container');
    const currentVersion = ++renderVersion;
    productsContainer.innerHTML = '';

    if (!products || products.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No se encontraron productos.';
        productsContainer.appendChild(empty);
        return;
    }

    products.forEach(product => {
        const img = new Image();
        const imgSrc = `${imageBaseUrl}${product.images[0]}`; // Utilizar la primera imagen del array
        img.src = imgSrc;

        img.onload = () => {
            if (currentVersion !== renderVersion) {
                return;
            }
            const productElement = document.createElement('div');
            productElement.className = 'product';

            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            imageContainer.onclick = () => openProductPage(product.id);

            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = product.name;
            imgElement.dataset.index = 0;

            const arrowLeft = document.createElement('button');
            arrowLeft.className = 'arrow arrow-left';
            arrowLeft.innerHTML = '&lt;';
            arrowLeft.onclick = (e) => {
                e.stopPropagation();
                showPreviousImage(product.id, imgElement);
            };

            const arrowRight = document.createElement('button');
            arrowRight.className = 'arrow arrow-right';
            arrowRight.innerHTML = '&gt;';
            arrowRight.onclick = (e) => {
                e.stopPropagation();
                showNextImage(product.id, imgElement);
            };

            imageContainer.appendChild(imgElement);
            imageContainer.appendChild(arrowLeft);
            imageContainer.appendChild(arrowRight);

            const name = document.createElement('p');
            name.className = 'product-name';
            name.textContent = product.name;

            const quantityContainer = document.createElement('div');
            quantityContainer.className = 'quantity-container';

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.min = 1;
            quantityInput.max = product.quantity;
            quantityInput.value = 1;

            const incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.onclick = () => {
                if (quantityInput.value < product.quantity) {
                    quantityInput.value = parseInt(quantityInput.value) + 1;
                }
            };

            const decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.onclick = () => {
                if (quantityInput.value > 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                }
            };

            quantityContainer.appendChild(decrementButton);
            quantityContainer.appendChild(quantityInput);
            quantityContainer.appendChild(incrementButton);

            const price = document.createElement('p');
            price.className = 'product-price';
            price.textContent = `$${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}`;

            const addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'add-to-cart-btn';
            addToCartBtn.innerHTML = 'Al carrito<span class="cart-animation"></span>';
            addToCartBtn.onclick = (e) => {
                e.stopPropagation();
                addToCart(product.id, parseInt(quantityInput.value));
            };

            productElement.appendChild(imageContainer);
            productElement.appendChild(name);
            productElement.appendChild(price);
            productElement.appendChild(quantityContainer);
            productElement.appendChild(addToCartBtn);

            productsContainer.appendChild(productElement);
        };

        img.onerror = () => {
            console.error(`No se pudo cargar la imagen para el producto ${product.name}`);
        };
    });
}

let bestSellersTimer = null;

function renderBestSellers(products) {
    const track = document.getElementById('best-sellers-track');
    if (!track) {
        return;
    }
    if (bestSellersTimer) {
        clearInterval(bestSellersTimer);
        bestSellersTimer = null;
    }
    track.innerHTML = '';

    const list = pickBestSellers(products, 8);
    if (list.length === 0) {
        return;
    }

    list.forEach(product => {
        track.appendChild(createBestSellerCard(product));
    });
    list.forEach(product => {
        track.appendChild(createBestSellerCard(product));
    });

    startBestSellersCarousel(track, list.length);
}

function createBestSellerCard(product) {
    const card = document.createElement('div');
    card.className = 'best-seller-card';
    card.onclick = () => openProductPage(product.id);

    const img = document.createElement('img');
    img.src = `${imageBaseUrl}${product.images[0]}`;
    img.alt = product.name;

    const title = document.createElement('div');
    title.className = 'best-seller-title';
    title.textContent = product.name;

    const price = document.createElement('div');
    price.className = 'best-seller-price';
    const priceValue = parseFloat(product.price);
    price.textContent = `$${priceValue % 1 === 0 ? priceValue : priceValue.toFixed(2)}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    return card;
}

function pickBestSellers(products, count) {
    const items = [...products];
    const seed = Math.floor(Date.now() / (5 * 24 * 60 * 60 * 1000));
    seededShuffle(items, seed);
    return items.slice(0, Math.min(count, items.length));
}

function seededShuffle(array, seed) {
    let state = seed % 2147483647;
    if (state <= 0) state += 2147483646;
    const rand = () => {
        state = (state * 16807) % 2147483647;
        return (state - 1) / 2147483646;
    };

    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(rand() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startBestSellersCarousel(track, itemCount) {
    const card = track.querySelector('.best-seller-card');
    if (!card) {
        return;
    }
    const gap = 12;
    const cardWidth = card.getBoundingClientRect().width + gap;
    let index = 0;

    bestSellersTimer = setInterval(() => {
        index += 1;
        track.style.transform = `translateX(-${index * cardWidth}px)`;
        if (index >= itemCount) {
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';
                index = 0;
                void track.offsetWidth;
                track.style.transition = 'transform 0.6s ease';
            }, 650);
        }
    }, 2800);
}




function showPreviousImage(productId, imgElement) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let currentIndex = parseInt(imgElement.dataset.index, 10);
        const newIndex = (currentIndex - 1 + product.images.length) % product.images.length;
        imgElement.src = `${imageBaseUrl}${product.images[newIndex]}`;
        imgElement.dataset.index = newIndex;
    }
}




function showNextImage(productId, imgElement) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let currentIndex = parseInt(imgElement.dataset.index, 10);
        const newIndex = (currentIndex + 1) % product.images.length;
        imgElement.src = `${imageBaseUrl}${product.images[newIndex]}`;
        imgElement.dataset.index = newIndex;
    }
}




function animateCartButton(productId) {
    const productElement = document.querySelector(`.product img[src*='${products.find(p => p.id === productId).images[0].toLowerCase()}']`).closest('.product');
    const addToCartBtn = productElement.querySelector('.add-to-cart-btn');
    const cartAnimation = addToCartBtn.querySelector('.cart-animation');

    addToCartBtn.classList.add('active');
    cartAnimation.addEventListener('transitionend', () => {
        addToCartBtn.classList.remove('active');
    }, { once: true });
}


function animateCartIcon() {
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 300);
}

function openCartModal() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'block';
    updateCart();
}

function closeCartModal() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
}

function openWhatsApp() {
    const phoneNumber = '+59897535096';
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
}

let currentProduct = null; // Variable para almacenar el producto actual

function openDescriptionWindow(productId) {
    // Busca el producto correspondiente por su ID
    const product = products.find(p => p.id === productId);

    // Verifica si el producto tiene descripción o utiliza el campo 'code'
    const descriptionContent = product.description.trim() || product.code.trim();

    if (descriptionContent) {
        // Crear una nueva ventana y cargar la descripción o el código
        const newWindow = window.open('', '_blank', 'width=600,height=400');
        newWindow.document.write(`
            <html>
            <head>
                <title>Descripción del Producto</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { font-size: 1.5em; margin-bottom: 10px; }
                    p { white-space: pre-wrap; }
                    .exit-button {
                        color: blue;
                        text-decoration: underline;
                        cursor: pointer;
                        display: block;
                        margin-top: 20px;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>Descripción del Producto</h1>
                <p>${descriptionContent}</p>
                <a href="#" class="exit-button" onclick="window.close(); return false;">Salir</a>
            </body>
            </html>
        `);
        newWindow.document.close();
    } else {
        alert("No hay descripción disponible para este producto.");
    }
}



function openDescriptionWindow(productId) {
    // Busca el producto correspondiente por su ID
    const product = products.find(p => p.id === productId);

    // Verifica si el producto tiene descripción o utiliza el campo 'code'
    const descriptionContent = product.description.trim() || product.code.trim();

    if (descriptionContent) {
        // Crear una nueva ventana y cargar la descripción o el código
        const newWindow = window.open('', '_blank', 'width=600,height=400');
        const htmlContent = `
            <html>
            <head>
                <title>Descripción del Producto</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { font-size: 1.5em; margin-bottom: 10px; }
                    p { white-space: pre-wrap; }
                    .exit-button {
                        color: blue;
                        text-decoration: underline;
                        cursor: pointer;
                        display: block;
                        margin-top: 20px;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>Descripción del Producto</h1>
                <p>${descriptionContent}</p>
                <a href="#" class="exit-button" onclick="window.close(); return false;">Salir</a>
            </body>
            </html>
        `;

        // Escribir el contenido HTML y cerrar el documento para que se renderice correctamente
        newWindow.document.open();
        newWindow.document.write(htmlContent);
        newWindow.document.close();
    } else {
        alert("No hay descripción disponible para este producto.");
    }
}

function openCodeWindow(productId) {
    // Busca el producto correspondiente por su ID
    const product = products.find(p => p.id === productId);

    if (product && product.code) {
        // Crear una nueva ventana y cargar el código de ejemplo
        const newWindow = window.open('', '_blank', 'width=800,height=600');
        const htmlContent = `
            <html>
            <head>
                <title>Código de Ejemplo</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/default.min.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js"></script>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; background-color: #2e2e2e; color: #f8f8f2; }
                    h1 { font-size: 1.6em; margin-bottom: 12px; color: #f8f8f2; }
                    pre { background-color: #1e1e1e; padding: 18px; border-radius: 8px; overflow-x: auto; }
                    code { font-size: 16px; line-height: 1.5; }
                    .exit-button {
                        color: #66d9ef;
                        text-decoration: underline;
                        cursor: pointer;
                        display: block;
                        margin-top: 20px;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>Código de Ejemplo</h1>
                <pre><code class="language-javascript">${product.code}</code></pre>
                <a href="#" class="exit-button" onclick="window.close(); return false;">Salir</a>
                <script>hljs.highlightAll();</script>
            </body>
            </html>
        `;

        // Escribir el contenido HTML y cerrar el documento para que se renderice correctamente
        newWindow.document.open();
        newWindow.document.write(htmlContent);
        newWindow.document.close();
    } else {
        alert("No hay código de ejemplo disponible para este producto.");
    }
}



function openProductPage(productId) {
    const params = new URLSearchParams(window.location.search);
    params.set('product', productId);
    const url = `${window.location.pathname}?${params.toString()}`;
    window.location.href = url;
}

function renderProductPage(product) {
    currentProduct = product;
    const productPage = document.getElementById('product-page');
    const productPageImage = document.getElementById('product-page-image');
    const productPageThumbs = document.getElementById('product-page-thumbs');
    const productPageTitle = document.getElementById('product-page-title');
    const productPagePrice = document.getElementById('product-page-price');
    const productPageStock = document.getElementById('product-page-stock');
    const productPageDesc = document.getElementById('product-page-desc');
    const productPageQty = document.getElementById('product-page-qty');
    const productPageAdd = document.getElementById('product-page-add');
    const productPageCode = document.getElementById('product-page-code');

    if (product.images && product.images.length > 0) {
        productPageImage.src = `${imageBaseUrl}${product.images[0]}`;
    } else {
        productPageImage.src = `${imageBaseUrl}default-image.png`;
    }

    if (productPageThumbs) {
        productPageThumbs.innerHTML = '';
        (product.images || []).forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = `${imageBaseUrl}${imgSrc}`;
            thumb.alt = `${product.name} ${index + 1}`;
            thumb.onclick = () => {
                productPageImage.src = `${imageBaseUrl}${imgSrc}`;
            };
            productPageThumbs.appendChild(thumb);
        });
    }

    if (productPageTitle) {
        productPageTitle.textContent = product.name;
    }
    if (productPagePrice) {
        const priceValue = parseFloat(product.price);
        productPagePrice.textContent = `$${priceValue % 1 === 0 ? priceValue : priceValue.toFixed(2)}`;
    }
    if (productPageStock) {
        productPageStock.textContent = `Stock: ${product.quantity}`;
    }
    if (productPageDesc) {
        productPageDesc.textContent = product.description || 'Sin descripci?n.';
    }
    if (productPageQty) {
        productPageQty.value = 1;
        productPageQty.max = product.quantity;
    }
    if (productPageAdd) {
        productPageAdd.onclick = () => {
            const qty = parseInt(productPageQty.value, 10) || 1;
            addToCart(product.id, qty);
        };
    }
    if (productPageCode) {
        if (product.code && product.code.trim()) {
            productPageCode.style.display = 'inline-flex';
            productPageCode.setAttribute('onclick', `openCodeWindow(${product.id})`);
        } else {
            productPageCode.style.display = 'none';
        }
    }

    if (productPage) {
        productPage.classList.add('active');
    }
    toggleHomeSections(true);
}

function closeProductPage() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('product')) {
        return;
    }
    params.delete('product');
    const url = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.location.href = url;
}

function toggleHomeSections(hidden) {
    const homeSections = document.getElementById('home-sections');
    const productsContainer = document.querySelector('.products-container');
    const bestSellers = document.querySelector('.best-sellers');
    const trustBanner = document.querySelector('.trust-banner');
    const promoSection = document.querySelector('.promo-section');

    [homeSections, productsContainer, bestSellers, trustBanner, promoSection].forEach((el) => {
        if (!el) return;
        if (hidden) {
            el.classList.add('hide-on-product');
        } else {
            el.classList.remove('hide-on-product');
        }
    });
}


// Función para abrir el modal de la imagen
function openImageModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-product-image');
    modalImage.src = imageSrc;
    modal.style.display = 'block';
}

// Función para cerrar el modal de la imagen
function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
}

// Función para abrir una ventana vacía
function openEmptyWindow() {
    window.open('', '_blank', 'width=600,height=400'); // Abre una ventana vacía con dimensiones especificadas
}


// Añadir evento para cerrar el carrito con la tecla Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCartModal();
        closeProductPage();
    }
});

// Fetch products from products.json and render them
document.addEventListener('DOMContentLoaded', () => {
    handleVisitOptOut();
    trackVisit();
    maybeShowVisitStats();
    enableWhatsAppDrag();
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            window.products = data; // Save products globally
            allProducts = data;
            renderProducts(allProducts);
            renderBestSellers(allProducts);

            const params = new URLSearchParams(window.location.search);
            const productId = params.get('product');
            if (productId) {
                const product = allProducts.find(p => `${p.id}` === productId);
                if (product) {
                    renderProductPage(product);
                }
            } else {
                toggleHomeSections(false);
            }

            const searchInput = document.getElementById('product-search');
            const searchBtn = document.getElementById('search-btn');
            if (searchInput && searchBtn) {
                searchBtn.addEventListener('click', () => {
                    applySearch(searchInput.value);
                });
                searchInput.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        applySearch(searchInput.value);
                    }
                });
            }

        })
        .catch(error => console.error('Error al cargar los productos:', error));
});

function normalizeText(text) {

function applySearch(rawQuery) {
    const query = normalizeText(rawQuery);
    if (!query) {
        renderProducts(allProducts);
        toggleSearchSections(false);
        return;
    }
    const filtered = allProducts.filter(product =>
        normalizeText(product.name).includes(query)
    );
    renderProducts(filtered);
    toggleSearchSections(true);
}

function toggleSearchSections(hidden) {
    const sections = [
        document.querySelector('.promo-section'),
        document.querySelector('.trust-banner'),
        document.querySelector('.best-sellers'),
        document.querySelector('.courses-banner')
    ];
    sections.forEach((section) => {
        if (!section) return;
        if (hidden) {
            section.classList.add('hide-on-product');
        } else {
            section.classList.remove('hide-on-product');
        }
    });
}

function enableWhatsAppDrag() {
    const bubble = document.getElementById('wa-float');
    if (!bubble) {
        return;
    }
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let origX = 0;
    let origY = 0;

    const onMove = (clientX, clientY) => {
        if (!dragging) return;
        const dx = clientX - startX;
        const dy = clientY - startY;
        bubble.style.right = 'auto';
        bubble.style.bottom = 'auto';
        bubble.style.left = `${origX + dx}px`;
        bubble.style.top = `${origY + dy}px`;
    };

    bubble.addEventListener('pointerdown', (event) => {
        dragging = true;
        bubble.setPointerCapture(event.pointerId);
        const rect = bubble.getBoundingClientRect();
        startX = event.clientX;
        startY = event.clientY;
        origX = rect.left;
        origY = rect.top;
    });

    bubble.addEventListener('pointermove', (event) => {
        onMove(event.clientX, event.clientY);
    });

    bubble.addEventListener('pointerup', (event) => {
        dragging = false;
        bubble.releasePointerCapture(event.pointerId);
    });

    bubble.addEventListener('pointercancel', (event) => {
        dragging = false;
        bubble.releasePointerCapture(event.pointerId);
    });
}
    return (text || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

function trackVisit() {
    if (!shouldTrackVisit()) {
        return;
    }
    const img = new Image();
    img.src = `${visitBadgeBase}?path=${encodeURIComponent(visitPath)}`;
    img.style.width = '1px';
    img.style.height = '1px';
    img.style.position = 'absolute';
    img.style.left = '-9999px';
    img.style.top = '-9999px';
    document.body.appendChild(img);
}

function maybeShowVisitStats() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('stats') !== '1') {
        return;
    }
    const badge = document.createElement('img');
    badge.src = `${visitBadgeBase}?path=${encodeURIComponent(visitPath)}&label=Visitas&countColor=%23000080&labelColor=%231a1a1a`;
    badge.alt = 'Visitas';
    badge.style.position = 'fixed';
    badge.style.right = '16px';
    badge.style.bottom = '16px';
    badge.style.zIndex = '9999';
    badge.style.borderRadius = '10px';
    badge.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
    document.body.appendChild(badge);
}

function shouldTrackVisit() {
    return localStorage.getItem(visitOptOutKey) !== '1';
}

function handleVisitOptOut() {
    const params = new URLSearchParams(window.location.search);
    const nohit = params.get('nohit');
    if (nohit === '1') {
        localStorage.setItem(visitOptOutKey, '1');
    } else if (nohit === '0') {
        localStorage.removeItem(visitOptOutKey);
    }
}
