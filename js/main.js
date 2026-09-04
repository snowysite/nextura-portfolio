/* =====================================================
   NEXORA MAIN CONTROLLER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* -----------------------------------------
       NAVBAR
    ----------------------------------------- */

    const navbar =
        document.querySelector(".navbar");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* -----------------------------------------
       MOBILE MENU
    ----------------------------------------- */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                mobileMenu.classList.toggle(
                    "open"
                );

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }


    /* -----------------------------------------
       MAGNETIC BUTTONS
    ----------------------------------------- */

    document
        .querySelectorAll(".btn, .nav-contact")
        .forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    if (
                        typeof gsap !== "undefined"
                    ) {

                        gsap.to(button, {

                            x: x * .12,

                            y: y * .12,

                            duration: .3,

                            ease: "power2.out"

                        });

                    }

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    if (
                        typeof gsap !== "undefined"
                    ) {

                        gsap.to(button, {

                            x: 0,

                            y: 0,

                            duration: .6,

                            ease: "elastic.out(1,.4)"

                        });

                    }

                }
            );

        });


});