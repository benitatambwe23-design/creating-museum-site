const CART_KEY = "culturalVoicesCart";

function readCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(button) {
    const id = button.dataset.id;        // ID correct
    const name = button.dataset.name;    // NAME correct
    const price = parseFloat(button.dataset.price);
    const image = button.dataset.image;

    let cart = readCart();

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            unitPrice: price,
            qty: 1,
            image: image
        });
    }

    writeCart(cart);
    alert(name + " added to cart!");
}