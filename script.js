document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Hero Slider Logic
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.timeline-dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        if (!slides.length) return;
        
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Reset animation
        const progress = dots[currentSlide].querySelector('.timeline-progress');
        if (progress) progress.style.animation = 'none';
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        const newProgress = dots[currentSlide].querySelector('.timeline-progress');
        if (newProgress) {
            // trigger reflow
            void newProgress.offsetWidth;
            newProgress.style.animation = 'timelineFill 5s linear forwards';
        }
        
        resetInterval();
    }

    function nextSlide() {
        if (!slides.length) return;
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    if (slides.length > 0) {
        const initProgress = dots[currentSlide].querySelector('.timeline-progress');
        if(initProgress) initProgress.style.animation = 'timelineFill 5s linear forwards';
        slideInterval = setInterval(nextSlide, 5000);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== currentSlide) {
                    goToSlide(index);
                }
            });
        });
    }

    // Header scroll effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animate Progress Bar on Scroll
    const progressSection = document.querySelector('.goal-tracker');
    const progressBar = document.querySelector('.progress');
    let progressAnimated = false;

    window.addEventListener('scroll', () => {
        if (!progressSection) return;
        
        const sectionPos = progressSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.1;

        if (sectionPos < screenPos && !progressAnimated) {
            const target = progressBar.getAttribute('data-target');
            progressBar.style.width = target + '%';
            progressAnimated = true;
        }
    });



    // Scroll Fade-In Animation
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation delay based on sibling index
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Portfolio Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(button => button.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Construct the mailto link
            const mailtoLink = `mailto:zeniithdigitalworks@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
            
            // Open the default email client
            window.location.href = mailtoLink;
            
            contactForm.reset();
            formMessage.textContent = "Opening your email client...";
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#d1ecf1';
            formMessage.style.color = '#0c5460';
            formMessage.style.border = '1px solid #bee5eb';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
});

// Global function for Coming Soon popup
window.showComingSoon = function(event) {
    event.preventDefault();
    const popup = document.getElementById('coming-soon-popup');
    if (popup) {
        popup.classList.add('active');
        
        // Auto close after 1 second (1000ms)
        setTimeout(() => {
            popup.classList.remove('active');
        }, 1000);
    }
};
