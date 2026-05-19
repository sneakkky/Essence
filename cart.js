let cartItems = [];

function loadCart() {
    let saved = localStorage.getItem('essence_cart');
    if (saved) {
        cartItems = JSON.parse(saved);
    } else {
        cartItems = [];
    }
    return cartItems;
}

function saveCart() {
    localStorage.setItem('essence_cart', JSON.stringify(cartItems));
}

function addToCart(name, price, size) {
    loadCart();
    let item = {
        name: name,
        price: price,
        size: size,
        id: Date.now()
    };
    cartItems.push(item);
    saveCart();
    updateCartCount();
    alert(name + ' добавлен в корзину!');
    console.log('Товар добавлен:', cartItems);
}

function removeFromCart(index) {
    loadCart();
    cartItems.splice(index, 1);
    saveCart();
    updateCartCount();
    showCart();
}

function clearCart() {
    cartItems = [];
    saveCart();
    updateCartCount();
    showCart();
}

function updateCartCount() {
    loadCart();
    let count = cartItems.length;
    let cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        if (count > 0) {
            cartBtn.innerHTML = 'корзина (' + count + ')';
        } else {
            cartBtn.innerHTML = 'корзина';
        }
    }
}

function showCart() {
    loadCart();
    let container = document.getElementById('cartContainer');
    let totalSpan = document.getElementById('totalPrice');
    
    console.log('showCart вызван, товаров:', cartItems.length);
    
    if (!container) {
        console.log('Контейнер cartContainer не найден');
        return;
    }
    
    if (cartItems.length === 0) {
        container.innerHTML = '<div class="empty-message">Корзина пуста</div>';
        if (totalSpan) totalSpan.innerHTML = 'BYN 0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        let priceNum = parseInt(item.price.replace('€', '').replace('.', '').replace(',', ''));
        total += priceNum;
        
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-size">Размер: ${item.size}</div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${i})">Удалить</button>
            </div>
        `;
    }
    
    container.innerHTML = html;
    if (totalSpan) totalSpan.innerHTML = 'BYN' + total.toLocaleString();
}

loadCart();
updateCartCount();

if (document.getElementById('cartContainer')) {
    showCart();
}