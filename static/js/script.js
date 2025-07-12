
    let cart = {};

    function addToCart(productId, productName, price) {
        if (cart[productId]) {
            cart[productId].quantity += 1;
        } else {
            cart[productId] = {
                name: productName,
                price: price,
                quantity: 1
            };
        }

        updateCartCount();
        console.log(cart); // Optional: for debugging
    }

    function updateCartCount() {
        let totalCount = 0;
        for (let key in cart) {
            totalCount += cart[key].quantity;
        }

        document.getElementById("cartCount").textContent = totalCount;
    }




        // Cart data
        let cartItems = [
            { id: 1, name: 'Premium Sneakers', price: 129.99, quantity: 2, emoji: '👟' },
            { id: 2, name: 'Designer Jacket', price: 249.99, quantity: 1, emoji: '🧥' },
            { id: 3, name: 'Luxury Watch', price: 399.99, quantity: 1, emoji: '⌚' }
        ];

        let promoDiscount = 0;
        const TAX_RATE = 0.08;

        // Update cart display
        function updateCartDisplay() {
            const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('itemCount').textContent = itemCount;

            const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            const tax = subtotal * TAX_RATE;
            const total = subtotal + tax - promoDiscount;

            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('total').textContent = `$${total.toFixed(2)}`;
            document.getElementById('discount').textContent = `-$${promoDiscount.toFixed(2)}`;

            // Show empty cart if no items
            if (cartItems.length === 0) {
                document.getElementById('cartContent').style.display = 'none';
                document.getElementById('emptyCart').style.display = 'block';
            } else {
                document.getElementById('cartContent').style.display = 'grid';
                document.getElementById('emptyCart').style.display = 'none';
            }
        }

        // Increase quantity
        function increaseQuantity(itemId) {
            const item = cartItems.find(item => item.id === itemId);
            if (item) {
                item.quantity += 1;
                document.getElementById(`qty${itemId}`).textContent = item.quantity;
                updateCartDisplay();
                showNotification('Quantity updated!');
            }
        }

        // Decrease quantity
        function decreaseQuantity(itemId) {
            const item = cartItems.find(item => item.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                document.getElementById(`qty${itemId}`).textContent = item.quantity;
                updateCartDisplay();
                showNotification('Quantity updated!');
            }
        }

        // Remove item
        function removeItem(itemId) {
            cartItems = cartItems.filter(item => item.id !== itemId);
            
            // Remove item from DOM
            const itemElement = document.querySelector(`[data-item-id="${itemId}"]`)?.closest('.cart-item');
            if (itemElement) {
                itemElement.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    itemElement.remove();
                    updateCartDisplay();
                }, 300);
            } else {
                updateCartDisplay();
            }
            
            showNotification('Item removed from cart!');
        }

        // Apply promo code
        function applyPromo() {
            const promoCode = document.getElementById('promoInput').value.toUpperCase();
            const validCodes = {
                'SAVE10': 0.10,
                'WELCOME20': 0.20,
                'FIRST15': 0.15
            };

            if (validCodes[promoCode]) {
                const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
                promoDiscount = subtotal * validCodes[promoCode];
                updateCartDisplay();
                showNotification(`Promo code applied! You saved $${promoDiscount.toFixed(2)}`);
                document.getElementById('promoInput').value = '';
            } else {
                showNotification('Invalid promo code!', 'error');
            }
        }

        // Proceed to checkout
        function proceedToCheckout() {
            if (cartItems.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            
            showNotification('Redirecting to checkout...');
            // Here you would typically redirect to checkout page
            setTimeout(() => {
                alert('This would redirect to the checkout page!');
            }, 1000);
        }

        // Show notification
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            if (type === 'error') {
                notification.style.background = '#ff6b6b';
            }
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

        // Add fadeOut animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(-100%); }
            }
        `;
        document.head.appendChild(style);

        // Initialize cart display
        updateCartDisplay();

        // Add data attributes for easier removal
        document.addEventListener('DOMContentLoaded', function() {
            const cartItemElements = document.querySelectorAll('.cart-item');
            cartItemElements.forEach((element, index) => {
                element.setAttribute('data-item-id', index + 1);
            });
        });
