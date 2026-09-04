/* =========================================
   NEXORA
   GLOBAL ANIMATION SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") {
        return;
    }


    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    /* =====================================
       PAGE HERO
    ===================================== */

    const pageHero = document.querySelector(".page-hero");

    if (pageHero) {

        gsap.fromTo(
            ".page-hero .reveal",
            {
                opacity: 0,
                y: 60
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.12,
                ease: "power4.out"
            }
        );

    }


    /* =====================================
       GENERIC REVEALS
    ===================================== */

    const reveals = document.querySelectorAll(
        ".reveal:not(.page-hero .reveal)"
    );

    reveals.forEach(element => {

        if (typeof ScrollTrigger === "undefined") {

            gsap.set(element, {
                opacity: 1,
                y: 0
            });

            return;

        }


        gsap.fromTo(
            element,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    once: true
                }

            }
        );

    });


    /* =====================================
       PROJECT CARDS
    ===================================== */

    const cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            gsap.to(card, {
                y: -10,
                duration: .5,
                ease: "power3.out"
            });

        });


        card.addEventListener("mouseleave", () => {

            gsap.to(card, {
                y: 0,
                duration: .7,
                ease: "power3.out"
            });

        });

    });


    /* =====================================
       SERVICE HOVER
    ===================================== */

    const services =
        document.querySelectorAll(".service-detail");


    services.forEach(service => {

        const arrow =
            service.querySelector(".service-arrow");


        service.addEventListener("mouseenter", () => {

            if (arrow) {

                gsap.to(arrow, {
                    x: 10,
                    y: -10,
                    duration: .4,
                    ease: "power3.out"
                });

            }

        });


        service.addEventListener("mouseleave", () => {

            if (arrow) {

                gsap.to(arrow, {
                    x: 0,
                    y: 0,
                    duration: .5,
                    ease: "power3.out"
                });

            }

        });

    });


    /* =====================================
       HERO GRID PARALLAX
    ===================================== */

    const heroGrid =
        document.querySelector(".hero-grid");


    if (
        heroGrid &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.to(heroGrid, {

            yPercent: 20,

            ease: "none",

            scrollTrigger: {
                trigger: heroGrid,
                start: "top top",
                end: "bottom top",
                scrub: true
            }

        });

    }


});