// Cart management
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.initializeCart();
    }

    initializeCart() {
        this.updateCartCount();
        this.renderCartItems();
    }

    addItem(productId, productData) {
        const existingItem = this.items.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                ...productData,
                quantity: 1
            });
        }

        this.saveToLocalStorage();
        this.updateCartCount();
        this.renderCartItems();
        this.showNotification('Produk ditambah ke keranjang');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToLocalStorage();
        this.updateCartCount();
        this.renderCartItems();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item && quantity >= 0) {
            item.quantity = quantity;
            this.saveToLocalStorage();
            this.renderCartItems();
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        document.getElementById('cart-count').textContent = this.items.length;
    }

    renderCartItems() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = '';

        if (this.items.length === 0) {
            cartContainer.innerHTML = '<p class="text-center py-3">Keranjang kosong</p>';
            return;
        }

        let totalPrice = 0;

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'd-flex align-items-center mb-3 pb-2 border-bottom';

            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="me-3" style="width: 80px; height: 80px; object-fit: cover;">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${item.name}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                        <span>Rp ${this.formatPrice(item.price * item.quantity)}</span>
                        <div class="d-flex align-items-center">
                            <button onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})" class="btn btn-sm btn-outline-secondary">-</button>
                            <span class="mx-2">${item.quantity}</span>
                            <button onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})" class="btn btn-sm btn-outline-secondary">+</button>
                        </div>
                    </div>
                </div>
                <button onclick="cart.removeItem('${item.id}')" class="btn btn-close ms-auto"></button>
            `;

            cartContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });

        document.getElementById('total-price').textContent = `Rp ${this.formatPrice(totalPrice)}`;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification alert alert-success';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

const cart = new ShoppingCart();

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// Load sample products
async function loadProducts() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Sepatu Sneakers',
            price: 599999,
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            name: 'Jam Tangan',
            price: 299999,
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            name: 'Smartphone',
            price: 4999999,
            image: 'https://via.placeholder.com/150'
        }
    ];

    const grid = document.getElementById('product-grid');

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'col-md-3 col-sm-6 product-card';
        card.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" alt="${product.name}" class="card-img-top product-image">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Rp ${new Intl.NumberFormat('id-ID').format(product.price)}</p>
                    <button onclick="cart.addItem(${product.id}, {name:'${product.name}',price:${product.price},image:'${product.image}'})"
                            class="btn btn-primary w-100">
                        Masukkan ke Keranjang
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadProducts);
