document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => console.error('Error al cargar los productos:', error));
});

function renderProducts(products) {
    const productsContainer = document.querySelector('.products-container');
    productsContainer.innerHTML = ''; // Clear the container before rendering

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
                showPreviousImage(product.id, imgElement, products);
            };

            const arrowRight = document.createElement('button');
            arrowRight.className = 'arrow arrow-right';
            arrowRight.innerHTML = '&gt;';
            arrowRight.onclick = (e) => {
                e.stopPropagation();
                showNextImage(product.id, imgElement, products);
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
            price.textContent = `$${product.price.toFixed(2)}`;

            const addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'add-to-cart-btn';
            addToCartBtn.innerHTML = 'Al carrito<span class="cart-animation"></span>';
            addToCartBtn.onclick = (e) => {
                e.stopPropagation();
                addToCart(product.id, parseInt(quantityInput.value), products);
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

function addToCart(productId, quantity, products) {
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

function showPreviousImage(productId, imgElement, products) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let currentIndex = parseInt(imgElement.dataset.index, 10);
        const newIndex = (currentIndex - 1 + product.images.length) % product.images.length;
        imgElement.src = product.images[newIndex];
        imgElement.dataset.index = newIndex;
    }
}

function showNextImage(productId, imgElement, products) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let currentIndex = parseInt(imgElement.dataset.index, 10);
        const newIndex = (currentIndex + 1) % product.images.length;
        imgElement.src = product.images[newIndex];
        imgElement.dataset.index = newIndex;
    }
}

// Add the rest of your existing JavaScript code for managing the cart and modals here...
