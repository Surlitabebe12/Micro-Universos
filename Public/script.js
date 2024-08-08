const cart = [];

function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            if (existingProduct.quantity + quantity <= product.quantity) {
                existingProduct.quantity += quantity;
            } else {
                alert(No hay más unidades disponibles para ${product.name});
            }
        } else {
            if (quantity <= product.quantity) {
                cart.push({ id: product.id, name: product.name, price: product.price, quantity: quantity, image: product.images[0] });
            } else {
                alert(No hay más unidades disponibles para ${product.name});
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
            cartList.innerHTML += 
                <li>
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-controls">
                        <button onclick="removeFromCart(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="addToCart(${item.id}, 1)">+</button>
                    </div>
                </li>
            ;
        });
        totalElement.style.display = 'block';
        totalElement.textContent = Total: $${total % 1 === 0 ? total : total.toFixed(2)};
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
    const cartItems = cart.map(item => ${item.name} (Cantidad: ${item.quantity})).join(', ');
    const message = Productos: ${cartItems};
    const phoneNumber = '+59897535096';
    const url = https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)};
    window.open(url, '_blank');
}

function renderProducts(products) {
    const productsContainer = document.querySelector('.products-container');

    products.forEach(product => {
        const img = new Image();
        img.src = product.images[0];

        img.onload = () => {
            const productElement = document.createElement('div');
            productElement.className = 'product';

            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            imageContainer.onclick = () => openProductModal(product.id);

            const imgElement = document.createElement('img');
            imgElement.src = product.images[0];
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
            price.textContent = $${product.price % 1 === 0 ? product.price : product.price.toFixed(2)};

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
            console.error(No se pudo cargar la imagen para el producto ${product.name});
        };
    });
}


function showPreviousImage(productId, imgElement) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let currentIndex = parseInt(imgElement.dataset.index, 10);
        const newIndex = (currentIndex - 1 + product.images.length) % product.images.length;
        imgElement.src = product.images[newIndex];
        imgElement.dataset.index = newIndex;
    }
}

function showNextImage(productId, imgElement) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let currentIndex = parseInt(imgElement.dataset.index, 10);
        const newIndex = (currentIndex + 1) % product.images.length;
        imgElement.src = product.images[newIndex];
        imgElement.dataset.index = newIndex;
    }
}

function animateCartButton(productId) {
    const productElement = document.querySelector(.product img[src*='${products.find(p => p.id === productId).images[0]}']).closest('.product');
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
    const url = https://wa.me/${phoneNumber};
    window.open(url, '_blank');
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const productModal = document.getElementById('product-modal');
        const productModalImage = document.getElementById('product-modal-image');
        const productModalDescription = document.getElementById('product-modal-description');
        const productModalCode = document.getElementById('product-modal-code');

        productModalImage.src = product.images[0];
        productModalDescription.textContent = product.description || '';

        if (product.code) {
            productModalCode.textContent = product.code;
            productModalCode.style.display = 'block';
        } else {
            productModalCode.style.display = 'none';
        }

        productModal.style.display = 'block';
    }
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