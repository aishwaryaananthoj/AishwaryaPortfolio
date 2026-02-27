// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.textContent = '🌙';
}

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Update icon and save preference
        if (document.body.classList.contains('light-mode')) {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Terminal typing effect for hero section
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('h1.typing-text');
    const heroSubtitle = document.querySelector('h2.typing-text');
    
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        setTimeout(() => typeWriter(heroTitle, titleText, 100), 500);
    }
    
    if (heroSubtitle) {
        const subtitleText = heroSubtitle.textContent;
        setTimeout(() => typeWriter(heroSubtitle, subtitleText, 50), 2000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project card click effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-5px)';
        }, 100);
    });
});

// Terminal cursor blink in contact section
const cursor = document.querySelector('.cursor');
if (cursor) {
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

// Add dynamic background particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    document.body.prepend(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 136, 0.3);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        75% {
            transform: translateY(-40px) translateX(-10px);
        }
    }
    
    .fade-in {
        animation: fadeInUp 0.8s forwards;
    }
    
    .nav-links a.active {
        color: var(--accent-primary);
    }
    
    .nav-links a.active::before {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Console easter egg
console.log('%c👋 Hello, fellow developer!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the source!', 'color: #00d4ff; font-size: 14px;');
console.log('%c$ git clone https://github.com/aishwarya', 'color: #a1a1aa; font-family: monospace;');

// Performance optimization: Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: 100, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -100, behavior: 'smooth' });
    }
});

// Scroll Progress Bar
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Floating Action Button (FAB)
const fab = document.getElementById('scrollToTop');
if (fab) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            fab.classList.add('visible');
        } else {
            fab.classList.remove('visible');
        }
    });

    fab.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Cursor Trail Effect - Enhanced for entire webpage
const canvas = document.getElementById('cursorCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();

    const particles = [];
    const maxParticles = 40; // Reduced from 100

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1; // Reduced from 5 + 2
            this.speedX = (Math.random() - 0.5) * 2; // Reduced from 3
            this.speedY = (Math.random() - 0.5) * 2; // Reduced from 3
            this.life = 1;
            this.color = Math.random() > 0.5 ? 'rgba(0, 255, 136,' : 'rgba(0, 212, 255,';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.025; // Faster fade from 0.015
            if (this.size > 0.2) this.size -= 0.1; // Faster shrink from 0.08
        }

        draw() {
            ctx.fillStyle = `${this.color} ${this.life * 0.5})`; // Reduced opacity by 50%
            ctx.shadowBlur = 5; // Reduced from 10
            ctx.shadowColor = this.color.includes('255, 136') ? '#00ff88' : '#00d4ff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Create only 1 particle per movement (reduced from 3)
        if (particles.length < maxParticles) {
            particles.push(new Particle(mouseX, mouseY));
        }
    });

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', resizeCanvas);
}

// Section Reveal Animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('section').forEach(section => {
    revealObserver.observe(section);
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.setProperty('--target-width', width + '%');
            bar.classList.add('animated');
            skillBarObserver.unobserve(bar);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
});
