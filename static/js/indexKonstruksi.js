(function($) {
    "use strict";
    $(document).ready(function() {
        // Spinner
        setTimeout(
            () => $("#spinner").length > 0 && $("#spinner").removeClass("show"),
            500
        );

        // AOS Initialization
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: "ease-in-out",
        });

        // Theme Toggle Logic
        const themeToggleButtons = $(".theme-toggle-button");
        let currentTheme = localStorage.getItem("theme");

        const applyTheme = (theme) => {
            $("html").attr("data-theme", theme);
            localStorage.setItem("theme", theme);
        };

        if (currentTheme) {
            applyTheme(currentTheme);
        } else {
            const prefersDark =
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches;
            applyTheme(prefersDark ? "dark" : "light");
        }

        themeToggleButtons.on("click", function() {
            let newTheme =
                $("html").attr("data-theme") === "dark" ? "light" : "dark";
            applyTheme(newTheme);
        });

        // Navbar Scroll Logic
        const navbar = $("#navbar")[0];
        if (navbar) {
            const handleScroll = () =>
                $(window).scrollTop() > 50 ?
                $(navbar)
                .addClass("navbar-scrolled")
                .removeClass("navbar-transparent") :
                $(navbar)
                .removeClass("navbar-scrolled")
                .addClass("navbar-transparent");
            handleScroll();
            $(window).on("scroll", handleScroll);
        }

        // Active Nav Link on Scroll
        const sections = $("section[id]"),
            navLinks = $(".navbar-nav .nav-link");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navLinks.removeClass("active");
                        $(
                            `.navbar-nav .nav-link[href="#${entry.target.id}"]`
                        ).addClass("active");
                    }
                });
            }, { rootMargin: "-40% 0px -60% 0px" }
        );
        sections.each((i, el) => observer.observe(el));

        // Parallax Effect (Desktop Only)
        $(window).on("scroll", () => {
            if ($(window).width() > 992) {
                $(".parallax-img").css(
                    "transform",
                    `translateY(${$(window).scrollTop() * 0.4}px)`
                );
            }
        });

        // Back to Top Button
        $(window).on("scroll", () =>
            $(window).scrollTop() > 300 ?
            $(".back-to-top").fadeIn("slow") :
            $(".back-to-top").fadeOut("slow")
        );
        $(".back-to-top").on(
            "click",
            () => (
                $("html, body").animate({ scrollTop: 0 }, 800, "easeInOutExpo"),
                false
            )
        );

        // Carousel untuk Portofolio
        $(".project-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            margin: 24,
            dots: true,
            loop: true,
            nav: false,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                992: { items: 3 },
            },
        });

        // ===== LOGIKA KONDISIONAL SLIDER MITRA (BERDASARKAN LEBAR) =====

        function manageMitraCarousel() {
            var $mitraCarousel = $(".mitra-carousel");
            if (!$mitraCarousel.length) return; // Keluar jika carousel tidak ada

            var $container = $mitraCarousel.parent();
            var $mitraItems = $mitraCarousel.find(".partner-item");
            var $swipeText = $container.find("p.text-center"); // Teks "Geser..."

            if (!$mitraItems.length) return; // Keluar jika tidak ada item

            // 1. Hitung total lebar semua item (termasuk margin)
            var totalItemsWidth = 0;
            $mitraItems.each(function() {
                // Gunakan outerWidth(true) untuk menyertakan margin
                totalItemsWidth += $(this).outerWidth(true);
            });

            // 2. Dapatkan lebar container (parent dari carousel)
            var containerWidth = $container.width();

            // 3. Bandingkan
            if (totalItemsWidth > containerWidth) {
                // JIKA OVERFLOW: Aktifkan slider (jika belum aktif)
                if (!$mitraCarousel.hasClass("owl-loaded")) {
                    $mitraCarousel.removeClass("slider-disabled-center"); // Hapus class statis
                    $mitraCarousel.owlCarousel({
                        autoplay: true,
                        smartSpeed: 1000,
                        dots: true,
                        loop: true, // Loop true karena itemnya sedikit
                        nav: false,
                        responsive: {
                            0: { items: 2, margin: 20 },
                            576: { items: 3, margin: 30 },
                            768: { items: 4, margin: 40 },
                            992: { items: 5, margin: 40 },
                            1200: { items: 6, margin: 40 }
                        },
                    });
                }
                $swipeText.show(); // Tampilkan teks "Geser"
            } else {
                // JIKA MUAT: Matikan slider (jika sedang aktif)
                if ($mitraCarousel.hasClass("owl-loaded")) {
                    $mitraCarousel.trigger('destroy.owl.carousel');
                }
                $mitraCarousel.addClass("slider-disabled-center"); // Tambah class statis
                $swipeText.hide(); // Sembunyikan teks "Geser"
            }
        }

        // Panggil fungsi saat dokumen siap
        manageMitraCarousel();

        // Panggil fungsi lagi setiap kali ukuran jendela berubah
        $(window).on('resize', manageMitraCarousel);

        // ===== AKHIR LOGIKA KONDISIONAL =====


        // Smooth scroll for anchor links
        $('a[href^="#"]').on("click", function(event) {
            let target = $(this.getAttribute("href"));
            if (target.length) {
                event.preventDefault();
                $("html, body")
                    .stop()
                    .animate({ scrollTop: target.offset().top - 70 },
                        800,
                        "easeInOutExpo"
                    );
                if ($(window).width() < 992)
                    $(".navbar-collapse").collapse("hide");
            }
        });
    });
})(jQuery);