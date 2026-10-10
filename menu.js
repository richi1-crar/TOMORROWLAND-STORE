
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");

    if (!boton || !menu) return;

    boton.addEventListener("click", () => {
        const abierto = menu.classList.toggle("active");

        boton.classList.toggle("active", abierto);
        boton.setAttribute("aria-expanded", String(abierto));
        boton.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );
    });

    menu.querySelectorAll("a").forEach(enlace => {
        enlace.addEventListener("click", () => {
            menu.classList.remove("active");
            boton.classList.remove("active");
            boton.setAttribute("aria-expanded", "false");
            boton.setAttribute("aria-label", "Abrir menú");
        });
    });
});