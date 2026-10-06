let cart = JSON.parse(localStorage.getItem("tomorrowlandCart")) || [];


function saveCart() {

    localStorage.setItem(
        "tomorrowlandCart",
        JSON.stringify(cart)
    );

}


function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    saveCart();

    updateCartCount();

    alert("Producto agregado al carrito 🖤");

}


function updateCartCount() {

    const counters =
        document.querySelectorAll("#cart-count");

    counters.forEach(counter => {

        counter.textContent = cart.length;

    });

}


function formatPrice(price) {

    return new Intl.NumberFormat(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    ).format(price);

}


function showCart() {

    const container =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("cart-total");


    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML =
            "<p>Tu carrito está vacío.</p>";

        totalElement.textContent =
            "$0";

        return;

    }


    container.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        const item =
            document.createElement("div");


        item.className =
            "cart-item";


        item.innerHTML = `

            <span>
                ${product.name}
            </span>

            <strong>
                ${formatPrice(product.price)}
            </strong>

            <button
                onclick="removeFromCart(${index})">

                ✕

            </button>

        `;


        container.appendChild(item);

    });


    totalElement.textContent =
        formatPrice(total);

}


function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    showCart();

}


function sendWhatsApp() {

    if (cart.length === 0) {

        alert(
            "Agrega al menos un producto al carrito."
        );

        return;

    }


    let message =
        "Hola, quiero realizar un pedido en Tomorrowland Store:%0A%0A";


    let total = 0;


    cart.forEach(product => {

        message +=
            `• ${product.name} - ${formatPrice(product.price)}%0A`;

        total += product.price;

    });


    message +=
        `%0ATotal: ${formatPrice(total)}`;


    /*
       CAMBIA ESTE NÚMERO
       POR EL WHATSAPP DE TU TIENDA
    */

    const phone =
        "573000000000";


    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );

}


function filterProducts(category) {

    const products =
        document.querySelectorAll(".shop-product");


    products.forEach(product => {

        if (
            category === "all" ||
            product.classList.contains(category)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        showCart();

    }
);