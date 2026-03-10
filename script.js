document.addEventListener('DOMContentLoaded', () => {

    // 1. Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon from bars to x
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // trigger once on load to catch if already scrolled down
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // 4. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        fadeElements.forEach(el => {
            appearOnScroll.observe(el);
        });
    } else {
        // Fallback for older browsers
        fadeElements.forEach(el => {
            el.classList.add('visible');
        });
    }

    // 5. Contact Form Submission mock behavior
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            // Simulate server network request
            setTimeout(() => {
                form.innerHTML = `
                    <div style="text-align:center; padding: 2rem 0;">
                        <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: var(--color-accent); margin-bottom: 1rem;"></i>
                        <h3 style="color: var(--color-primary-dark);">¡Solicitud Enviada!</h3>
                        <p>Gracias por contactarse con Carpon SRL. Nuestro equipo evaluará su solicitud y se comunicará a la brevedad.</p>
                    </div>
                `;
            }, 1500);
        });
    }
});
