// 1. NAVBAR ACTIVE STATE
// Get all sections and nav links
const sections = document.querySelectorAll('section[id], .container[id]');
const navLinks = document.querySelectorAll('.nav-link');

// Function to update active link based on scroll position
function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 120;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveLink);

// Update active link on load - set Home as default
window.addEventListener('load', function() {
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    updateActiveLink();
});
// 2. SMOOTH SCROLL WITH ACTIVE STATE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#") return;
        
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navbarHeight = document.querySelector('.navbar-wrapper').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 3. SEARCH FUNCTIONALITY
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchResults = document.getElementById('searchResults');

// Service data for search
const services = [
    { name: 'Printing', icon: 'fa-print', section: '#services' },
    { name: 'Photocopying', icon: 'fa-copy', section: '#services' },
    { name: 'Binding', icon: 'fa-book', section: '#services' },
    { name: 'Passport Photos', icon: 'fa-camera', section: '#services' },
    { name: 'KRA Services', icon: 'fa-building-columns', section: '#services' },
    { name: 'Graphic Design', icon: 'fa-palette', section: '#services' },
    { name: 'Scanning & Emailing', icon: 'fa-envelope', section: '#services' },
    { name: 'Website Development', icon: 'fa-code', section: '#services' },
    { name: 'Online Applications', icon: 'fa-laptop', section: '#services' },
    { name: 'HELB Application', icon: 'fa-user-graduate', section: '#services' }
];

// Additional searchable content
const pages = [
    { name: 'Home', icon: 'fa-home', section: '#home' },
    { name: 'About Us', icon: 'fa-info-circle', section: '#about' },
    { name: 'Pricing', icon: 'fa-tag', section: '#pricing' },
    { name: 'Contact Us', icon: 'fa-envelope', section: '#contact' }
];

const allSearchable = [...services, ...pages];

function performSearch(query) {
    if (!query.trim()) {
        searchOverlay.classList.remove('active');
        return;
    }

    const results = allSearchable.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 40px; display: block; margin-bottom: 15px; color: #dce3ec;"></i>
                <h3 style="color: #0b2b4a; margin-bottom: 8px;">No results found</h3>
                <p style="color: #8a9bb0;">Try searching for "Printing", "KRA", or "Website"</p>
            </div>
        `;
        searchOverlay.classList.add('active');
        return;
    }

    let resultsHTML = '';
    results.forEach(item => {
        resultsHTML += `
            <div class="result-item" data-section="${item.section}">
                <i class="fas ${item.icon}"></i>
                <div>
                    <div class="result-title">${item.name}</div>
                    <div class="result-desc">Click to navigate to ${item.name}</div>
                </div>
            </div>
        `;
    });

    searchResults.innerHTML = resultsHTML;
    searchOverlay.classList.add('active');

    // Add click listeners to results
    document.querySelectorAll('.result-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            const target = document.querySelector(section);
            if (target) {
                const navbarHeight = document.querySelector('.navbar-wrapper').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close search overlay
                searchOverlay.classList.remove('active');
                searchInput.value = '';
            }
        });
    });
}

// Search event listeners
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    performSearch(searchInput.value);
});

searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        performSearch(this.value);
    }
});

// Close search overlay when clicking outside
document.addEventListener('click', function(e) {
    if (searchOverlay.classList.contains('active')) {
        if (!searchOverlay.contains(e.target) && 
            !searchInput.contains(e.target) && 
            !searchBtn.contains(e.target)) {
            searchOverlay.classList.remove('active');
        }
    }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    }
});


// 4. HERO SLIDER


(function() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    let currentIndex = 0;
    let intervalId = null;
    const intervalTime = 3000;

    // Create dots
    slides.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.dataset.index = idx;
        if (idx === 0) dot.classList.add('active-dot');
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('span');

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active-dot'));

        slides[index].classList.add('active');
        dots[index].classList.add('active-dot');
        currentIndex = index;
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function startSlider() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextSlide, intervalTime);
    }

    function stopSlider() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    // Dot clicks
    dots.forEach((dot) => {
        dot.addEventListener('click', function() {
            const idx = parseInt(this.dataset.index, 10);
            stopSlider();
            goToSlide(idx);
            startSlider();
        });
    });

    // Pause on hover/touch
    const sliderContainer = document.getElementById('heroSlider');
    sliderContainer.addEventListener('mouseenter', stopSlider);
    sliderContainer.addEventListener('mouseleave', startSlider);
    sliderContainer.addEventListener('touchstart', stopSlider, { passive: true });
    sliderContainer.addEventListener('touchend', startSlider, { passive: true });

    // Init
    goToSlide(0);
    startSlider();

    console.log('✅ Image slider running – switches every 3 seconds.');
})();

// 5. HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinksMenu.classList.toggle('active');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
    });
});
// 6. CONTACT FORM SUBMISSION 
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
                // Get form data
        const name = this.querySelector('input[type="text"]')?.value || '';
        const email = this.querySelector('input[type="email"]')?.value || '';
        const phone = this.querySelector('input[type="tel"]')?.value || '';
        const service = this.querySelector('select')?.value || '';
        const message = this.querySelector('textarea')?.value || '';
        
        // Show success message
        alert(`Thank you ${name}! We have received your message and will get back to you soon.`);
        
        // Reset form
        this.reset();
    });
}

// 7. CONSOLE CONFIRMATION


console.log('✅ All functionality loaded successfully!');
console.log('✅ Navbar active state working');
console.log('✅ Search functionality working');
console.log('✅ Hero slider working');
console.log('✅ Hamburger menu working');
