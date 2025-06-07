document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements on scroll
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-up');

    const appearOptions = {
        threshold: 0.2, // When 20% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Adjust for earlier/later appearance
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

    // Navbar background change on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Typing effect for tagline (optional, but adds a nice touch)
    const tagline = document.querySelector('.tagline');
    const text = "Full Stack Developer | Crafting seamless web experiences with MEAN/MERN";
    let i = 0;
    const typingSpeed = 50; // milliseconds per character
    const deletingSpeed = 30; // milliseconds per character
    const delayBetweenTexts = 1000; // milliseconds

    function typeWriter() {
        if (i < text.length) {
            tagline.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    // Initial call to start typing after hero animation
    setTimeout(typeWriter, 1500); // Start after hero content fades in
});
