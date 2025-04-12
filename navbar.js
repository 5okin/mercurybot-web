document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
        let currentScroll = window.scrollY;

        if (currentScroll > lastScrollTop && currentScroll > 50) {
            // Scrolling Down → Hide Navbar
            navbar.style.transform = "translateY(-100%)";
        } else {
            // Scrolling Up → Show Navbar
            navbar.style.transform = "translateY(0)";
        }
        lastScrollTop = currentScroll;
    });
});