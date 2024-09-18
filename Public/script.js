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
            imageContainer.onclick = () => openProductModal(product.id); // Clic en la imagen abre el modal

            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = product.name;
            imgElement.dataset.index = 0;

            imageContainer.appendChild(imgElement);

            const name = document.createElement('p');
            name.className = 'product-name';
            name.textContent = product.name;
            name.onclick = () => openProductModal(product.id); // Clic en el nombre abre el modal

            // Agregar los demás elementos como precio, cantidad, etc.
            // ...

            productElement.appendChild(imageContainer);
            productElement.appendChild(name);
            // Agrega los otros elementos (precio, cantidad, etc.) aquí
            productsContainer.appendChild(productElement);
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
                    h1 { font-size: 1.5em; margin-bottom: 10px; color: #f8f8f2; }
                    pre { background-color: #1e1e1e; padding: 15px; border-radius: 5px; overflow-x: auto; }
                    code { font-size: 14px; }
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



function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        currentProduct = product; // Establecer el producto actual
        const productModal = document.getElementById('product-modal');
        const productModalImage = document.getElementById('product-modal-image');
        const productInfoLink = document.getElementById('product-info-link');
        const productCodeLink = document.getElementById('product-code-link');
        const productModalTitle = document.getElementById('product-modal-title'); // Agrega el título

        // Mostrar el nombre del producto en el título del modal
        productModalTitle.textContent = product.name;

        // Verificar que la imagen exista y esté definida
        if (product.images && product.images.length > 0) {
            productModalImage.src = `${imageBaseUrl}${product.images[0]}`;
        } else {
            // Si no hay imagen, usar una imagen predeterminada
            productModalImage.src = `${imageBaseUrl}default-image.png`;
        }

        // Actualizar los enlaces para abrir la descripción y el código del producto
        productInfoLink.setAttribute('onclick', `openDescriptionWindow(${product.id})`);
        productCodeLink.setAttribute('onclick', `openCodeWindow(${product.id})`);

        productModal.style.display = 'block'; // Mostrar el modal
    }
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
