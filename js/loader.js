/* =====================================================
   NEXORA SYSTEM LOADER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    const bar = document.getElementById("loader-bar");
    const percent = document.getElementById("loader-percent");
    const message = document.getElementById("loader-message");

    if (!loader) return;

    document.body.classList.add("loading");


    const messages = [

        "INITIALIZING SYSTEM",

        "LOADING DIGITAL CORE",

        "CONNECTING MODULES",

        "CALIBRATING INTERFACE",

        "LOADING EXPERIENCE",

        "SYSTEM READY"

    ];


    let progress = 0;


    const interval = setInterval(() => {

        progress += Math.floor(
            Math.random() * 8
        ) + 3;


        if (progress >= 100) {

            progress = 100;

            clearInterval(interval);

        }


        bar.style.width = `${progress}%`;

        percent.textContent = `${progress}%`;


        const index = Math.min(
            Math.floor(progress / 20),
            messages.length - 1
        );


        message.textContent =
            messages[index];


        if (progress === 100) {

            setTimeout(() => {

                if (typeof gsap !== "undefined") {

                    gsap.to(loader, {

                        yPercent: -100,

                        duration: 1.2,

                        ease: "power4.inOut",

                        onComplete: () => {

                            loader.remove();

                            document.body.classList.remove(
                                "loading"
                            );

                            window.dispatchEvent(
                                new Event("nexoraReady")
                            );

                        }

                    });

                } else {

                    loader.remove();

                    document.body.classList.remove(
                        "loading"
                    );

                }

            }, 500);

        }

    }, 100);

});