document.addEventListener('DOMContentLoaded', function () {
    const cartDisplay = document.getElementById('cartDisplay');
    const cartIcon = document.querySelector('.cart-icon');
    const closeBtn = document.querySelector('.close');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cartItems');

    let itemCount = 0;

    localStorage.setItem('cartItems', '[]');

    cartIcon.addEventListener('click', function () {
        cartDisplay.style.display = 'block';
    });

    closeBtn.addEventListener('click', function () {
        cartDisplay.style.display = 'none';

    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            const productImage = this.getAttribute('data-image');

            addToCart(productName, productPrice, productImage);
        });
    });

    function addToCart(name, price, image) {
        const cartItems = getExistingCartItems();

        const newItem = {name, price, image};
        cartItems.push(newItem);

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        itemCount = cartItems.length;
        updateCartCount();
        updateCart(cartItems);
    }

    function updateCart(cartItems) {
        cartItemsContainer.innerHTML = '';

        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>${item.price}</p>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }

    function updateCartCount() {
        cartCount.textContent = itemCount;
    }

    function getExistingCartItems() {
        return JSON.parse(localStorage.getItem('cartItems')) || [];
    }
});
