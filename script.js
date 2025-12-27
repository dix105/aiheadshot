document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Change icon
            menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    // ==========================================
    // SCROLL ANIMATIONS (IntersectionObserver)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // ==========================================
    // FAQ ACCORDION
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = question.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current
            if (!isOpen) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // ==========================================
    // MODALS (PRIVACY / TERMS)
    // ==========================================
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');
    
    function openModal(modalId) {
        const modal = document.getElementById(modalId + '-modal');
        if (modal) {
            modal.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden'; // Prevent body scroll
        }
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore body scroll
        }, 300); // Match CSS transition duration
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const target = trigger.getAttribute('data-modal-target');
            openModal(target);
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    // Close on click outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // ==========================================
    // LOCKED PLAYGROUND ANIMATION
    // ==========================================
    // Simple visual effect for the progress bar in locked state
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        // Subtle pulsing effect via width adjustment
        setInterval(() => {
            const currentWidth = 85;
            const randomFlux = (Math.random() * 2) - 1; // +/- 1%
            progressBar.style.width = (currentWidth + randomFlux) + '%';
        }, 2000);
    }
});