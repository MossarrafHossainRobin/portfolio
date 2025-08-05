  document.addEventListener('DOMContentLoaded', () => {
            // Particles.js configuration
            particlesJS("particles-js", {
                "particles": {
                    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#00e5ff" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
                   "size": { "value": 1.5, "random": true, "anim": { "enable": false } },
                    "line_linked": { "enable": true, "distance": 150, "color": "#00e5ff", "opacity": 0.4, "width": 1 },
                    "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                    "modes": {
                        "grab": { "distance": 400, "line_linked": { "opacity": 1 } },
                        "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                        "repulse": { "distance": 200, "duration": 0.4 },
                        "push": { "particles_nb": 4 },
                        "remove": { "particles_nb": 2 }
                    }
                },
                "retina_detect": true
            });

            // Theme toggle functionality
            const themeToggle = document.getElementById('theme-toggle');
          /*  const body = document.body;
            const themeIcon = themeToggle.querySelector('i');

            // Set initial theme based on localStorage or system preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                body.classList.add(savedTheme);
                if (savedTheme === 'light-mode') {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                    particlesJS('particles-js', { particles: { color: { value: '#007bff' }, line_linked: { color: '#007bff' } } });
                }
            } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                body.classList.add('light-mode');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                particlesJS('particles-js', { particles: { color: { value: '#007bff' }, line_linked: { color: '#007bff' } } });
            }

            themeToggle.addEventListener('click', () => {
                body.classList.toggle('light-mode');
                if (body.classList.contains('light-mode')) {
                    localStorage.setItem('theme', 'light-mode');
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                    particlesJS('particles-js', { particles: { color: { value: '#007bff' }, line_linked: { color: '#007bff' } } });
                } else {
                    localStorage.setItem('theme', 'dark-mode');
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                    particlesJS('particles-js', { particles: { color: { value: '#00e5ff' }, line_linked: { color: '#00e5ff' } } });
                }
                // Re-initialize particles to apply new colors, if needed.
                // This is a simplified example; a more robust solution might just update particle colors directly.
                // For simplicity and quick changes, re-initializing works, but can be less efficient.
            });*/

            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const closeMenuButton = document.getElementById('close-menu-button');
            const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            const navLinks = mobileMenu.querySelectorAll('.nav-link');

            function toggleMobileMenu() {
                mobileMenu.classList.toggle('open');
                mobileMenuOverlay.classList.toggle('open');
                document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
            }

            mobileMenuButton.addEventListener('click', toggleMobileMenu);
            closeMenuButton.addEventListener('click', toggleMobileMenu);
            mobileMenuOverlay.addEventListener('click', toggleMobileMenu); // Close when clicking overlay

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (mobileMenu.classList.contains('open')) {
                        toggleMobileMenu(); // Close menu after clicking a link
                    }
                });
            });


            // Scroll animation (fade-in-up)
            const faders = document.querySelectorAll('.fade-in-up');
            const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }; // Appear slightly before entering viewport fully

            const appearOnScroll = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                });
            }, appearOptions);

            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });

            // Project filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectItems = document.querySelectorAll('.project-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const filter = button.dataset.filter;
                    projectItems.forEach(item => {
                        if (filter === 'all' || item.dataset.categories.includes(filter)) {
                            item.style.display = 'block'; // Or flex, grid depending on layout
                            setTimeout(() => item.classList.add('visible'), 50); // Re-add animation for filtered items
                        } else {
                            item.classList.remove('visible');
                            setTimeout(() => item.style.display = 'none', 500); // Hide after animation
                        }
                    });
                });
            });

            // Animate skill bars on scroll
            const skillBars = document.querySelectorAll('.skill-bar');
            const skillSection = document.getElementById('skills');

            const skillObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        skillBars.forEach(bar => {
                            bar.classList.add('filled');
                        });
                        observer.unobserve(skillSection); // Stop observing once animated
                    }
                });
            }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

            if (skillSection) {
                skillObserver.observe(skillSection);
            }

            // Contact form submission (basic example - replace with actual backend submission)
            const contactForm = document.getElementById('contactForm');
            const formStatus = document.getElementById('form-status');

            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                formStatus.innerHTML = '<div class="loading-spinner mx-auto"></div><p class="text-[var(--primary-color)] mt-2">Sending message...</p>';
                
                // Simulate network request
                await new Promise(resolve => setTimeout(resolve, 2000)); 
                
                // Replace this with actual form submission logic (e.g., fetch API to your backend)
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());

               
         
                console.log('Form data submitted:', data);
                formStatus.innerHTML = '<p class="text-green-500 font-semibold">Message sent successfully! (Demo Mode)</p>';
                contactForm.reset();
            });
        });