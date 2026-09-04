/* =========================================
   NEXORA
   PROJECT FILTER SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const filters = document.querySelectorAll(".project-filter");
    const projects = document.querySelectorAll(".project-card");

    if (!filters.length || !projects.length) {
        return;
    }


    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            const selectedCategory =
                filter.dataset.filter;


            /* Remove active state */

            filters.forEach(button => {
                button.classList.remove("active");
            });


            filter.classList.add("active");


            /* Filter projects */

            projects.forEach(project => {

                const category =
                    project.dataset.category;


                const shouldShow =
                    selectedCategory === "all" ||
                    category === selectedCategory;


                if (shouldShow) {

                    project.style.display = "";

                    if (typeof gsap !== "undefined") {

                        gsap.fromTo(
                            project,
                            {
                                opacity: 0,
                                y: 30
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                ease: "power3.out"
                            }
                        );

                    }

                } else {

                    project.style.display = "none";

                }

            });

        });

    });

});