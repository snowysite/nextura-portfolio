/* =========================================================
   NEXORA CUSTOM CURSOR
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Don't run custom cursor on touch devices
    const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
        return;
    }

    // Create cursor elements
    const cursor = document.createElement("div");
    const cursorDot = document.createElement("div");

    cursor.className = "nexora-cursor";
    cursorDot.className = "nexora-cursor-dot";

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    // Cursor position
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

    });

    // Smooth outer cursor
    function animateCursor() {

        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    // Interactive elements
    function setupInteractiveElements() {

        const elements = document.querySelectorAll(
            "a, button, input, textarea, select, .project-card, .service-card"
        );

        elements.forEach((element) => {

            element.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });

        });

    }

    setupInteractiveElements();


    // Hide cursor when leaving browser
    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
        cursorDot.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
        cursorDot.style.opacity = "1";
    });

});