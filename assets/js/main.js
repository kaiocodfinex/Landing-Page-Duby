// 1. Initialize Icons
        lucide.createIcons();

        // 2. Generate Floating Particles
        document.addEventListener("DOMContentLoaded", () => {
            const container = document.getElementById("particles-container");
            const w = window.innerWidth;
            const h = window.innerHeight;

            for (let i = 0; i < 40; i++) {
                let p = document.createElement("div");
                p.className = "particle";
                container.appendChild(p);

                let size = Math.random() * 3 + 1;
                gsap.set(p, {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    width: size,
                    height: size,
                    opacity: Math.random() * 0.4 + 0.1
                });

                gsap.to(p, {
                    y: "-=150",
                    x: "+=" + (Math.random() * 100 - 50),
                    duration: Math.random() * 15 + 10,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }

            // 3. Main GSAP Entrance Animations
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Await a slight delay for aesthetic flow
            tl.to({}, { duration: 0.2 })
                .to(".hero-badge", { y: -20, opacity: 1, duration: 0.8, startAt: { y: 20 } })
                .to(".hero-headline", { y: -20, opacity: 1, duration: 1, startAt: { y: 30 } }, "-=0.6")
                .to(".hero-description", { y: -20, opacity: 1, duration: 0.8, startAt: { y: 20 } }, "-=0.6")
                .to(".hero-ctas", { y: -20, opacity: 1, duration: 0.8, startAt: { y: 20 } }, "-=0.6")
                .to(".hero-microtext", { y: -10, opacity: 1, duration: 0.8, startAt: { y: 10 } }, "-=0.6")
                .to(".hero-proofs", { y: -20, opacity: 1, duration: 0.8, startAt: { y: 20 } }, "-=0.6")
                .to(".dashboard-wrapper", {
                    y: -20,
                    opacity: 1,
                    duration: 1.5,
                    startAt: { y: 100, rotateX: 20, scale: 0.9 },
                    rotateX: 0,
                    scale: 1,
                    ease: "power4.out"
                }, "-=0.5");

            // Initialize Premium Slider
            initPremiumSlider();

            // Initialize Glowing Cards Hover
            initGlowingCards();

            // Initialize Scroll Animations for Third Fold
            initScrollAnimations();
        });

        // Ensure ScrollTrigger recalculates after all heavy images load
        window.addEventListener("load", () => {
            ScrollTrigger.refresh();
        });

        function initScrollAnimations() {
            // Animate Clients Marquee Block
            gsap.from(".cl-anim", {
                scrollTrigger: {
                    trigger: ".clients-marquee-section",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                clearProps: "all"
            });

            gsap.from(".cl-anim-late", {
                scrollTrigger: {
                    trigger: ".clients-marquee-section",
                    start: "top 70%",
                },
                y: 30,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                clearProps: "all"
            });

            // Animate Testimonials Header
            gsap.to(".testimonials-header", {
                scrollTrigger: {
                    trigger: ".testimonials",
                    start: "top 80%",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                startAt: { y: 24 },
                ease: "power3.out"
            });

            // Animate Process Header
            gsap.to(".process-header", {
                scrollTrigger: {
                    trigger: ".process",
                    start: "top 85%",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                startAt: { y: 30 },
                ease: "power3.out"
            });

            // Staggered Fade Up for Process Bento Cards
            gsap.to(".bento-anim", {
                scrollTrigger: {
                    trigger: ".bento-grid",
                    start: "top 80%",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1, // Staggered sequence for 1, 2, 3, 4, 5
                startAt: { y: 40, opacity: 0 },
                ease: "power4.out"
            });

            // Dashboards Section Animations
            gsap.from(".dash-anim", {
                scrollTrigger: {
                    trigger: ".dash-section",
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 1.4,
                stagger: 0.25,
                ease: "power3.out"
            });

            // Differentials Section Animations
            gsap.from(".diff-anim", {
                scrollTrigger: {
                    trigger: ".diff-section",
                    start: "top 75%",
                },
                y: 60,
                opacity: 0,
                duration: 1.5,
                stagger: 0.3,
                ease: "power3.out",
                clearProps: "all"
            });

            gsap.from(".diff-feat-anim", {
                scrollTrigger: {
                    trigger: ".diff-features",
                    start: "top 80%",
                },
                y: 30, /* Animate vertically to guarantee NO horizontal misalignment bugs */
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                clearProps: "all"
            });

            // Pricing Section Animations
            gsap.from(".prc-anim", {
                scrollTrigger: {
                    trigger: ".pricing-section",
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 1.4,
                stagger: 0.3,
                ease: "power3.out",
                clearProps: "all"
            });

            gsap.from(".prc-card-anim", {
                scrollTrigger: {
                    trigger: ".pricing-grid",
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 1.5,
                stagger: 0.25,
                ease: "power3.out",
                clearProps: "all"
            });

            // FAQ Section Animations
            gsap.from(".faq-anim", {
                scrollTrigger: {
                    trigger: ".faq-section",
                    start: "top 75%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from(".faq-item-anim", {
                scrollTrigger: {
                    trigger: ".faq-list",
                    start: "top 80%",
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });

            // FAQ Accordion Logic
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const button = item.querySelector('.faq-question');
                button.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Close all
                    faqItems.forEach(faq => faq.classList.remove('active'));

                    // If it wasn't active, open it
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });

            // Lead Form Animations
            gsap.from(".lead-panel-anim", {
                scrollTrigger: {
                    trigger: ".lead-section",
                    start: "top 75%",
                },
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from(".lead-form-anim", {
                scrollTrigger: {
                    trigger: ".lead-section",
                    start: "top 75%",
                },
                x: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out"
            });

            // Lead Form Validation and Masking
            const leadForm = document.getElementById('leadCaptureForm');
            const phoneInput = document.getElementById('telefone');

            if (phoneInput) {
                // Phone Mask (00) 00000-0000
                phoneInput.addEventListener('input', function (e) {
                    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                    if (value.length > 11) value = value.slice(0, 11); // Max 11 digits

                    if (value.length > 2) {
                        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                    }
                    if (value.length > 10) {
                        value = `${value.slice(0, 10)}-${value.slice(10)}`;
                    }

                    e.target.value = value;
                    e.target.classList.remove('error'); // Clear error on typing
                });
            }

            if (leadForm) {
                // Clear errors on input
                leadForm.querySelectorAll('.lead-input').forEach(input => {
                    input.addEventListener('input', () => input.classList.remove('error'));
                    input.addEventListener('change', () => input.classList.remove('error'));
                });

                leadForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    let isValid = true;

                    // Validate Required fields
                    const requiredFields = ['plano', 'empresa', 'telefone', 'email'];
                    requiredFields.forEach(id => {
                        const input = document.getElementById(id);
                        if (!input.value.trim()) {
                            input.classList.add('error');
                            isValid = false;
                        } else {
                            input.classList.remove('error');
                        }
                    });

                    // Email Format Validation
                    const emailInput = document.getElementById('email');
                    if (emailInput.value.trim()) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(emailInput.value.trim())) {
                            emailInput.classList.add('error');
                            isValid = false;
                        }
                    }

                    // Phone Format Validation (needs at least 10 digits)
                    if (phoneInput.value.trim()) {
                        const rawPhone = phoneInput.value.replace(/\D/g, '');
                        if (rawPhone.length < 10) {
                            phoneInput.classList.add('error');
                            isValid = false;
                        }
                    }

                    if (isValid) {
                        const submitBtn = document.getElementById('leadSubmitBtn');
                        const btnText = submitBtn.querySelector('.btn-text');

                        // Simulate Submission State
                        submitBtn.disabled = true;
                        btnText.textContent = "Enviando...";

                        setTimeout(() => {
                            // Show Success State
                            document.getElementById('leadSuccessOverlay').classList.add('show');
                            lucide.createIcons(); // Instatiate icon in overlay

                            // Reset button state
                            submitBtn.disabled = false;
                            btnText.textContent = "Agendar diagnóstico estratégico agora";
                            leadForm.reset();

                            // Hide overlay after 4 seconds
                            setTimeout(() => {
                                document.getElementById('leadSuccessOverlay').classList.remove('show');
                            }, 4000);

                        }, 1500);
                    }
                });
            }

            // Header Entrance Animation
            gsap.to("#mainHeader", {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                delay: 0.5 // Drops in shortly after page load
            });

            // Footer Animations
            gsap.from(".footer-anim", {
                scrollTrigger: {
                    trigger: ".footer-section",
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });

            // Staggered Fade Up for Client Logos removed - replaced by marquee
        }

        function initGlowingCards() {
            const grid = document.getElementById("cards-grid");
            const cards = document.querySelectorAll(".feature-card");

            if (!grid || !cards.length) return;

            grid.addEventListener("mousemove", (e) => {
                for (const card of cards) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    card.style.setProperty("--mouse-x", `${x}px`);
                    card.style.setProperty("--mouse-y", `${y}px`);
                }
            });
        }

        // Mouse glow for Differentials feature cards
        document.querySelectorAll('.diff-feature').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                card.style.setProperty('--mx', x + 'px');
                card.style.setProperty('--my', y + 'px');
            });
            card.addEventListener('mouseleave', function () {
                card.style.setProperty('--mx', '-9999px');
                card.style.setProperty('--my', '-9999px');
            });
        });

        function initPremiumSlider() {
            const slides = document.querySelectorAll('.db-slide');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            if (!slides.length) return;

            let currentIndex = 0;
            let isAnimating = false;

            const updateSlider = () => {
                isAnimating = true;

                slides.forEach((slide, i) => {
                    // Logic for 3 elements:
                    // 0 = active
                    // 1 = next / top visible stacked
                    // 2 = last / smallest stacked
                    let diff = (i - currentIndex + slides.length) % slides.length;

                    let zIndex = slides.length - diff;
                    let scale = 1 - (diff * 0.06);
                    // Push up significantly to show behind the active card
                    let yOffset = -(diff * 40);
                    let opacity = diff === 0 ? 1 : Math.max(0.1, 0.7 - (diff * 0.25));
                    let blurFactor = diff === 0 ? 0 : diff * 2.5;

                    gsap.to(slide, {
                        scale: scale,
                        y: yOffset,
                        zIndex: zIndex,
                        opacity: opacity,
                        filter: `blur(${blurFactor}px)`,
                        duration: 0.8,
                        ease: "power4.out",
                        onComplete: () => {
                            if (i === slides.length - 1) {
                                isAnimating = false;
                                // Re-initialize icons just in case structure changes
                                lucide.createIcons();
                            }
                        }
                    });

                    if (diff === 0) {
                        slide.style.pointerEvents = 'auto';
                    } else {
                        slide.style.pointerEvents = 'none';
                    }
                });
            };

            updateSlider();

            nextBtn.addEventListener('click', () => {
                if (isAnimating) return;
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            });

            prevBtn.addEventListener('click', () => {
                if (isAnimating) return;
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            });

            // Click on a blurred slide to bring it directly to front
            slides.forEach((slide, idx) => {
                slide.addEventListener('click', () => {
                    if (idx !== currentIndex && !isAnimating) {
                        currentIndex = idx;
                        updateSlider();
                    }
                });
            });

            // Auto Play setup
            let autoLoop = setInterval(() => nextBtn.click(), 5000);

            // Pause on hover
            const container = document.querySelector('.db-slider-container');
            container.addEventListener('mouseenter', () => clearInterval(autoLoop));
        }

        // ─── Dashboard Modules Carousel ───────────────────────────────────────
        (function initDashCarousel() {
            const track = document.getElementById('dash-slider');
            const prevBtn = document.getElementById('dash-prev');
            const nextBtn = document.getElementById('dash-next');
            const steps = document.querySelectorAll('.dash-info-step');
            const idleTabs = document.querySelectorAll('.dash-idle-tab');

            if (!track || !steps.length) return;

            let current = 0;
            const total = steps.length;

            function goTo(index) {
                // loop-around
                if (index < 0) index = total - 1;
                if (index >= total) index = 0;
                current = index;

                // 1. Slide images horizontally
                track.style.transform = `translateX(-${current * 100}%)`;

                // 2. Show the right text card
                steps.forEach(function (step) {
                    var s = parseInt(step.getAttribute('data-step'), 10);
                    if (s === current) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });

                // 3. Hide current ghost-tab, show the others
                idleTabs.forEach(function (tab) {
                    var t = parseInt(tab.getAttribute('data-target'), 10);
                    if (t === current) {
                        tab.style.display = 'none';
                    } else {
                        tab.style.display = 'flex';
                    }
                });
            }

            // Arrow Buttons
            if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
            if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

            // Ghost Tabs
            idleTabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    goTo(parseInt(tab.getAttribute('data-target'), 10));
                });
            });
        })();

        // ─── Mobile Menu Toggle ───────────────────────────────────────────────
        function initMobileMenu() {
            const toggleBtn = document.querySelector('.header-mobile-toggle');
            const closeBtn = document.getElementById('closeMobileMenu');
            const mobileMenu = document.getElementById('mobileMenu');
            const menuLinks = document.querySelectorAll('.mobile-menu-link, .mobile-menu-cta');

            if (!toggleBtn || !closeBtn || !mobileMenu) return;

            function openMenu() {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            }

            function closeMenu() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = ''; 
            }

            toggleBtn.addEventListener('click', openMenu);
            closeBtn.addEventListener('click', closeMenu);

            menuLinks.forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        }
        initMobileMenu();

        // Re-initialize lucide icons for the new elements
        lucide.createIcons();

    