
const products = [
    { id: 1, name: 'Bornera Pcb 2 Pines (x10)', price: 110, quantity: 3, images: ['Imagenes/1/1_1.png'], description: '', code: '' },
    { id: 2, name: 'Display Led 8 Bit Max7219', price: 300, quantity: 10, images: ['Imagenes/2/2_1.png', 'Imagenes/2/2_2.png', 'Imagenes/2/2_3.png'], description: '', code: '' },
    { id: 3, name: 'Pantalla Tft De 1,8 Pulgadas', price: 430, quantity: 10, images: ['Imagenes/3/3_1.png'], description: '', code: '' },
    { id: 4, name: 'Placa Expansión I2c 8 Canales', price: 180, quantity: 2, images: ['Imagenes/4/4_1.png', 'Imagenes/4/4_2.png', 'Imagenes/4/4_3.png', 'Imagenes/4/4_4.png', 'Imagenes/4/4_5.png'], description: '', code: '' },
    { id: 5, name: 'Módulo Inalámbrico Nodemcu V3 (esp8266) Usb Ch340', price: 320, quantity: 7, images: ['Imagenes/5/5_1.png', 'Imagenes/5/5_2.png' ,'Imagenes/5/5_3.png'], description: '', code: '' },
    { id: 6, name: 'Optoacoplador Pc817c (pack X 10)', price: 160, quantity: 10, images: ['Imagenes/6/6_1.png'], description: '', code: '' },
    { id: 7, name: 'Diodo Rectificador Schottky Sr5100 (pack X 10)', price: 180, quantity: 2, images: ['Imagenes/7/7_1.png'], description: '', code: '' },
    { id: 8, name: 'Diodo Rectificador 10a 1000v (pack X10)', price: 180, quantity: 7, images: ['Imagenes/8/8_1.png', 'Imagenes/8/8_2.png'], description: '', code: '' },
    { id: 9, name: 'Diodo Puente Rectificador Kbpc5010 50a 1000v', price: 190, quantity: 1, images: ['Imagenes/9/9_1.png', 'Imagenes/9/9_2.png', 'Imagenes/9/9_3.png'], description: '', code: '' },
    { id: 10, name: 'Triac Bta41-600b', price: 150, quantity: 40, images: ['Imagenes/10/10_1.png', 'Imagenes/10/10_2.png'], description: '', code: '' },
    { id: 11, name: 'Chip Attiny85-20pu', price: 300, quantity: 10, images: ['Imagenes/11/11_1.png', 'Imagenes/11/11_2.png', 'Imagenes/11/11_3.png'], description: '', code: '' },
    { id: 12, name: 'Programador Universal Usb Avr Isp (con Adaptador)', price: 300, quantity: 10, images: ['Imagenes/12/12_1.png', 'Imagenes/12/12_2.png'], description: '', code: '' },
    { id: 13, name: 'Malla Desoldadora Para Desoldar Estaño 2.0 Mm De Ancho', price: 180, quantity: 1, images: ['Imagenes/13/13_1.png'], description: '', code: '' },
    { id: 14, name: 'Disipador De Calor De Aluminio, 25x24x16mm (4 Unidades)', price: 200, quantity: 3, images: ['Imagenes/14/14_1.png'], description: '', code: '' },
    { id: 15, name: 'Conector De Alimentación De Cc, Macho-hembra (5 Juegos)', price: 400, quantity: 1, images: ['Imagenes/15/15_1.png'], description: '', code: '' },
    { id: 16, name: 'Diodo Db3 Disparador 20 Piezas', price: 280, quantity: 7, images: ['Imagenes/16/16_1.png', 'Imagenes/16/16_2.png'], description: '', code: '' },
    { id: 17, name: 'Kit De 5 Puntas De Hierro Para Soldador', price: 400, quantity: 2, images: ['Imagenes/17/17_1.png', 'Imagenes/17/17_2.png'], description: '', code: '' },
    { id: 18, name: 'Kit Micro Pulsadores Con Tapa De 5 Colores, 25 Pcs', price: 650, quantity: 2, images: ['Imagenes/18/18_1.png'], description: '', code: '' },
    { id: 19, name: 'Placa Expansión  Esp32. Nuevo Modelo.', price: 380, quantity: 10, images: ['Imagenes/19/19_1.png'], description: '', code: '' },
    { id: 20, name: 'Módulo De Pantalla Led Tm1637 Para Arduino, 7 Segmentos, 4 B', price: 120, quantity: 4, images: ['Imagenes/20/20_1.png'], description: '', code: '' },
    { id: 21, name: 'Interruptor Mosfet (x2) De Alta Potencia (400w)', price: 400, quantity: 1, images: ['Imagenes/21/21_1.png'], description: '', code: '' },
    { id: 22, name: 'Módulo Usb A Ttl Cp2102 Con Cables Dupont', price: 380, quantity: 5, images: ['Imagenes/22/22_1.png', 'Imagenes/22/22_2.png'], description: '', code: '' },
    { id: 23, name: 'Prensacable Pg11 (5 Unidades)', price: 200, quantity: 1, images: ['Imagenes/23/23_1.png'], description: '', code: '' },
    { id: 24, name: 'Conversor Serie--bluetooth Jdy-30', price: 380, quantity: 3, images: ['Imagenes/24/24_1.png'], description: '', code: '' },
    { id: 25, name: 'Diodo Rectificador M7 1n4007 Smd 1a 100 V. (20 Unidades)', price: 210, quantity: 3, images: ['Imagenes/25/25_1.png'], description: '', code: '' },
    { id: 26, name: 'Lámpara Led Indoor 200w Reales. Dimerizable. Luz Combinada!(USD)', price: 1, quantity: 130, images: ['Imagenes/26/26_1.png'], description: '', code: '' },
    { id: 27, name: 'Caja De Separadores De Nailon Hexagonal, M3 (300 Piezas)', price: 820, quantity: 1, images: ['Imagenes/27/27_1.png'], description: '', code: '' },
    { id: 28, name: 'Sensor De Hall 49e (bici Eléctrica) 5 Unidades', price: 180, quantity: 22, images: ['Imagenes/28/28_1.png'], description: '', code: '' },
    { id: 29, name: 'Led Cob YXO 50w, Dual Spectrum', price: 380, quantity: 20, images: ['Imagenes/29/29_1.png'], description: '', code: '' },
    { id: 30, name: 'Esp32 Wifi Con Placa De Expansión Último Modelo', price: 1000, quantity: 5, images: ['Imagenes/30/30_1.png'], description: '', code: '' },
    { id: 31, name: 'Cable Usb A Micro, Alta Calidad, Tipo A. 0.3m', price: 100, quantity: 6, images: ['Imagenes/31/31_1.png'], description: '', code: '' },
    { id: 32, name: 'Módulo De Fuente De Alimentación Usb', price: 270, quantity: 10, images: ['Imagenes/32/32_1.png'], description: '', code: '' },
    { id: 33, name: 'Sensor De Distancia Ultrasónico X2 (compatible Arduino)', price: 280, quantity: 4, images: ['Imagenes/33/33_1.png'], description: '', code: '' },
    { id: 34, name: 'Caja De Plástico Para Proyecto De Electrónica', price: 230, quantity: 6, images: ['Imagenes/34/34_1.png'], description: '', code: '' },
    { id: 35, name: 'Sensor Capacitivo De Humedad Del Suelo', price: 170, quantity: 2, images: ['Imagenes/35/35_1.png'], description: '', code: '' },
    { id: 36, name: 'Módulo Relé 5v 1 Canal', price: 100, quantity: 7, images: ['Imagenes/36/36_1.png'], description: '', code: '' },
    { id: 37, name: 'Sensor De Luz Lm393 Arduino', price: 130, quantity: 9, images: ['Imagenes/37/37_1.png'], description: '', code: '' },
    { id: 38, name: 'Sensor De Humedad Tierra (alta Precisión)', price: 400, quantity: 20, images: ['Imagenes/38/38_1.png','Imagenes/38/38_2.png','Imagenes/38/38_3.png'], description: '', code: '' },
    { id: 39, name: 'Mini Humidificador Usb-c (placa Electrónica)', price: 380, quantity: 1, images: ['Imagenes/39/39_1.png'], description: '', code: '' },
    { id: 40, name: 'Pcb Prototipo Pack De 4', price: 350, quantity: 3, images: ['Imagenes/40/40_1.png'], description: '', code: '' },
    { id: 41, name: 'Kit Surtido De Transistores, Regulador De Voltaje (16 Pcs)', price: 500, quantity: 2, images: ['Imagenes/41/41_1.png'], description: '', code: '' },
    { id: 42, name: 'Sensor De Temperatura Y Humedad', price: 300, quantity: 5, images: ['Imagenes/42/42_1.png'], description: '', code: '' },
    { id: 43, name: 'Dip-switch 4 Posiciones (pack De 5)', price: 200, quantity: 2, images: ['Imagenes/43/43_1.png'], description: '', code: '' },
    { id: 44, name: 'Led Cob YXO 50w FRIO', price: 290, quantity: 11, images: ['Imagenes/44/44_1.png'], description: '', code: '' },
    { id: 45, name: 'Maceta Red Para Hidroponia.', price: 180, quantity: 11, images: ['Imagenes/45/45_1.png'], description: '', code: '' },
    { id: 46, name: 'Placa De Desarrollo Esp-wroom-32 Wifi', price: 650, quantity: 4, images: ['Imagenes/46/46_1.png'], description: '', code: '' },
    { id: 47, name: 'Diodos De Recuperación Rápida 10 Piezas Fr607 6a 1000v', price: 180, quantity: 5, images: ['Imagenes/47/47_1.png'], description: '', code: '' },
    { id: 48, name: 'Diodo De Recuperación Rápida Fr207 (20 Unidades)', price: 180, quantity: 15, images: ['Imagenes/48/48_1.png'], description: '', code: '' },
    { id: 49, name: 'Potenciómetro Lineal De 3 Pines, 1k', price: 80, quantity: 10, images: ['Imagenes/49/49_1.png'], description: '', code: '' },
    { id: 50, name: 'Potenciómetro Lineal De 3 Pines, 2k', price: 80, quantity: 10, images: ['Imagenes/50/50_1.png'], description: '', code: '' },
    { id: 51, name: 'Potenciómetro Lineal De 3 Pines, 100k', price: 80, quantity: 10, images: ['Imagenes/51/51_1.png'], description: '', code: '' },
    { id: 52, name: 'Wemos D1 Mini Pro V3.0 Wifi', price: 330, quantity: 10, images: ['Imagenes/52/52_1.png'], description: '', code: '' },
    { id: 53, name: 'Ne555 Circuito Integrado (10 Unidades)', price: 180, quantity: 9, images: ['Imagenes/53/53_1.png'], description: '', code: '' },
    { id: 54, name: 'Puente Rectificador Kbu1510 15a, 1000v', price: 150, quantity: 15, images: ['Imagenes/54/54_1.png'], description: '', code: '' },
    { id: 55, name: 'Potenciómetro Lineal De 3 Pines, 1m', price: 80, quantity: 10, images: ['Imagenes/55/55_1.png'], description: '', code: '' },
    { id: 56, name: 'Potenciómetro Lineal De 3 Pines, 50k', price: 80, quantity: 10, images: ['Imagenes/56/56_1.png'], description: '', code: '' },
    { id: 57, name: 'Potenciómetro Lineal De 3 Pines, 20k', price: 80, quantity: 10, images: ['Imagenes/57/57_1.png'], description: '', code: '' },
    { id: 58, name: 'Transistor 2n2222 (100 Unidades)', price: 350, quantity: 4, images: ['Imagenes/58/58_1.png'], description: '', code: '' },
    { id: 59, name: 'Potenciómetro Lineal De 3 Pines, 250k', price: 80, quantity: 10, images: ['Imagenes/59/59_1.png'], description: '', code: '' },
    { id: 60, name: 'Triac Bta10-600b (x5 Unidades)', price: 500, quantity: 3, images: ['Imagenes/60/60_1.png'], description: '', code: '' },
    { id: 61, name: 'Triac Bta16-600b X 4 Unidades', price: 450, quantity: 4, images: ['Imagenes/61/61_1.png'], description: '', code: '' },
    { id: 62, name: 'Módulo De Interruptor Mosfet 4 Canales', price: 380, quantity: 2, images: ['Imagenes/62/62_1.png','Imagenes/62/62_2.png'], description: '', code: '' },
    { id: 63, name: 'Led Bridgelux (muy Buenos) 50w, Dimerizable, Blanco Frío', price: 380, quantity: 20, images: ['Imagenes/63/63_1.png'], description: '', code: '' },
    { id: 64, name: 'Placa Mosfet Superior Irf520 Mos (x2)', price: 300, quantity: 1, images: ['Imagenes/64/64_1.png', 'Imagenes/64/64_2.png'], description: '', code: '' },
    { id: 65, name: 'Portafusibles De Tubo De Vidrio, 5x20mm (pack X5)', price: 250, quantity: 3, images: ['Imagenes/65/65_1.png', 'Imagenes/65/65_2.png'], description: '', code: '' },
    { id: 66, name: 'Teclado Membrana 4x5 (arduino U Otros Micros)', price: 150, quantity: 3, images: ['Imagenes/66/66_1.png'], description: '', code: '' },
    { id: 67, name: 'Sensor De Corriente De Precisión (arduino)', price: 280, quantity: 2, images: ['Imagenes/67/67_1.png', 'Imagenes/67/67_2.png'], description: '', code: '' },
    { id: 68, name: 'Módulo De Pantalla Lcd Tft De 1,8 (ej Arduino)', price: 500, quantity: 8, images: ['Imagenes/68/68_1.png', 'Imagenes/68/68_2.png'], description: '', code: '' },
    { id: 69, name: 'Caja De Fusibles De Tubo De Vidrio, Soplado Rápido (100uds)', price: 800, quantity: 9, images: ['Imagenes/69/69_1.png'], description: '', code: '' },
    { id: 70, name: 'Chip Led. 10w. Blanco Cálido', price: 100, quantity: 4, images: ['Imagenes/70/70_1.png'], description: '', code: '' },
    { id: 71, name: 'Microcontrolador W806 (placa De Desarrollo)', price: 450, quantity: 2, images: ['Imagenes/71/71_1.png'], description: '', code: '' },
    { id: 72, name: 'Sensor De Temperatura Y Humedad De Alta Precisión Aht21', price: 300, quantity: 2, images: ['Imagenes/72/72_1.png'], description: '', code: '' },
    { id: 73, name: 'Conversor Dc-dc De Intensidad Y Voltaje Regulables', price: 260, quantity: 11, images: ['Imagenes/73/73_1.png', 'Imagenes/73/73_2.png'], description: '', code: '' }
];
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
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
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

function renderProducts() {
    const productsContainer = document.querySelector('.products-container');

    products.forEach(product => {
        const img = new Image();
        img.src = product.images[0];

        img.onload = () => {
            const productElement = document.createElement('div');
            productElement.className = 'product';

            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            imageContainer.onclick = () => openProductModal(product.id);  // Mover el evento onclick aquí

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
            price.textContent = `$${product.price.toFixed(2)}`;

            const addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'add-to-cart-btn';
            addToCartBtn.innerHTML = 'Al carrito<span class="cart-animation"></span>';
            addToCartBtn.onclick = (e) => {
                e.stopPropagation();
                addToCart(product.id, parseInt(quantityInput.value));
            };

            productElement.appendChild(imageContainer);  // Aquí se anexa el contenedor de la imagen con el evento onclick
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
    const productElement = document.querySelector(`.product img[src*='${products.find(p => p.id === productId).images[0]}']`).closest('.product');
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

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
