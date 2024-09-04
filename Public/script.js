const imageBaseUrl = 'https://www.microuniversos.com/Public/';
const cart = [];

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

    products.forEach(product => {
        const img = new Image();
        const imgSrc = `${imageBaseUrl}${product.images[0]}`; // Utilizar la primera imagen del array
        img.src = imgSrc;

        img.onload = () => {
            const productElement = document.createElement('div');
            productElement.className = 'product';

            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            
            // Cambiar onclick para abrir el modal con la imagen y el producto actual
            imageContainer.onclick = () => openImageModal(imgSrc, product);

            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = product.name;
            imgElement.dataset.index = 0;

            imageContainer.appendChild(imgElement);
            productElement.appendChild(imageContainer);

            // Se puede agregar el resto de los elementos si se desea
            productsContainer.appendChild(productElement);
        };

        img.onerror = () => {
            console.error(`No se pudo cargar la imagen para el producto ${product.name}`);
        };
    });
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

// Función para abrir la ventana con la descripción del producto
function openDescriptionWindow() {
    // Verifica que el producto actual tenga una descripción disponible.
    if (!currentProduct || !currentProduct.description) {
        alert("No hay descripción disponible para este producto.");
        return;
    }

    // Abre una nueva ventana con la descripción del producto.
    const newWindow = window.open('', '_blank', 'width=600,height=400');
    newWindow.document.write(`
        <html>
        <head>
            <title>Descripción del Producto</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { font-size: 1.5em; margin-bottom: 10px; }
                p { white-space: pre-wrap; }
            </style>
        </head>
        <body>
            <h1>Descripción del Producto</h1>
            <p>${currentProduct.description}</p>
        </body>
        </html>
    `);
    newWindow.document.close();
}


let currentProduct = null; // Variable para almacenar el producto actual

function openDescriptionWindow() {
    // Asegúrate de que currentProduct tenga la descripción cargada
    if (!currentProduct || !currentProduct.description) {
        alert("No hay descripción disponible para este producto.");
        return;
    }

    // Crear una nueva ventana y cargar la descripción
    const newWindow = window.open('', '_blank', 'width=600,height=400');
    newWindow.document.write(`
        <html>
        <head>
            <title>Descripción del Producto</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { font-size: 1.5em; margin-bottom: 10px; }
                p { white-space: pre-wrap; }
            </style>
        </head>
        <body>
            <h1>Descripción del Producto</h1>
            <p>${currentProduct.description}</p>
        </body>
        </html>
    `);
    newWindow.document.close();
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const productModal = document.getElementById('product-modal');
        const productModalImage = document.getElementById('product-modal-image');

        // Mostrar solo la imagen del producto
        productModalImage.src = `${imageBaseUrl}${product.images[0]}`;
        productModal.style.display = 'block'; // Muestra el modal
    }
}

// Función para abrir el modal de la imagen y establecer el producto actual
function openImageModal(imageSrc, product) {
    currentProduct = product; // Establecer el producto actual
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


function closeProductModal() {
    const productModal = document.getElementById('product-modal');
    productModal.style.display = 'none';
}


// Añadir evento para cerrar el carrito con la tecla Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCartModal();
        closeProductModal();
    }
});

// Fetch products from products.json and render them
document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            window.products = data; // Save products globally
            renderProducts(data);
        })
        .catch(error => console.error('Error al cargar los productos:', error));
});
