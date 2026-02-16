const TAX_RATE = 0.102;
const MEMBER_DISCOUNT_RATE = 0.15;
const SHIPPING_RATE = 25;
const CART_KEY = "culturalVoicesCart";

/* =========================
   READ & WRITE CART
========================= */

function readCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* =========================
   REMOVE ITEM
========================= */

function removeItem(id) {
    let cart = readCart();
    cart = cart.filter(item => item.id !== id);
    writeCart(cart);
    renderCart();
}

/* =========================
   RENDER CART
========================= */

function renderCart() {
    const cart = readCart();
    const container = document.getElementById("cartContainer");

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let itemTotal = 0;

    let html = `
        <table class="cart-table">
        <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Line Total</th>
            <th>Remove</th>
        </tr>
    `;

    cart.forEach(item => {
        const lineTotal = item.unitPrice * item.qty;
        itemTotal += lineTotal;

        html += `
            <tr>
                <td>
                    <img src="${item.image}" width="60">
                    ${item.name}
                </td>
                <td>${item.qty}</td>
                <td>$${item.unitPrice.toFixed(2)}</td>
                <td>$${lineTotal.toFixed(2)}</td>
                <td>
                    <button onclick="removeItem('${item.id}')">
                        Remove
                    </button>
                </td>
            </tr>
        `;
    });

    /* =========================
       MEMBER DISCOUNT
    ========================= */

    const memberCheckbox = document.getElementById("memberDiscount");
    const memberChecked = memberCheckbox ? memberCheckbox.checked : false;

    let memberDiscount = 0;

    if (memberChecked) {
        memberDiscount = itemTotal * MEMBER_DISCOUNT_RATE;
    }

    const discountedTotal = itemTotal - memberDiscount;
    const shipping = SHIPPING_RATE;
    const taxAmount = (discountedTotal + shipping) * TAX_RATE;
    const invoiceTotal = discountedTotal + shipping + taxAmount;

    html += `
        </table>
        <p>Subtotal: $${itemTotal.toFixed(2)}</p>
        <p>Member Discount: -$${memberDiscount.toFixed(2)}</p>
        <p>Shipping: $${shipping.toFixed(2)}</p>
        <p>Tax: $${taxAmount.toFixed(2)}</p>
        <h3>Invoice Total: $${invoiceTotal.toFixed(2)}</h3>
    `;

    container.innerHTML = html;
}

/* =========================
   EVENTS
========================= */

document.getElementById("memberDiscount")
    ?.addEventListener("change", renderCart);

document.getElementById("clearCart")
    ?.addEventListener("click", () => {
        writeCart([]);
        renderCart();
    });

renderCart();