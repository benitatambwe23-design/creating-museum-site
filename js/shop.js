const CART_KEY = "culturalVoicesCart";

function readCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(button) {
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const image = button.dataset.image;

    let cart = readCart();

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            id,
            name,
            unitPrice: price,
            qty: 1,
            image
        });
    }

    writeCart(cart);
    alert(name + " added to cart!");
}