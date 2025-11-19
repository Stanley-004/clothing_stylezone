// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    slides[index].classList.add('active');
    indicators[index]?.classList.add('active');
}

// Next/Previous buttons
document.querySelector('.carousel-next')?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

document.querySelector('.carousel-prev')?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Auto-rotate carousel
setInterval(() => {
    if (slides.length > 0) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
}, 5000);

// Countdown Timer for Flash Deals
function updateCountdown() {
    const countdownElements = document.querySelectorAll('.countdown-timer');
    
    countdownElements.forEach(element => {
        const endTime = new Date();
        endTime.setHours(23, 59, 59, 999); // End of today
        
        const now = new Date();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            element.innerHTML = `
                <span>${String(hours).padStart(2, '0')}h</span>
                <span>${String(minutes).padStart(2, '0')}m</span>
                <span>${String(seconds).padStart(2, '0')}s</span>
            `;
        } else {
            element.innerHTML = '<span>Ended</span>';
        }
    });
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    mobileMenuToggle?.classList.toggle('active');
});

// Mega menu hover effects
const categoryDropdowns = document.querySelectorAll('.category-dropdown');

categoryDropdowns.forEach(dropdown => {
    const parent = dropdown.closest('.nav-item');
    
    parent?.addEventListener('mouseenter', () => {
        dropdown.classList.add('active');
    });
    
    parent?.addEventListener('mouseleave', () => {
        dropdown.classList.remove('active');
    });
});

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn?.addEventListener('click', () => {
    const query = searchInput?.value.trim();
    if (query) {
        // Implement search functionality
        console.log('Searching for:', query);
        // You can redirect to search results page or filter products
    }
});

searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn?.click();
    }
});

// Product card interactions
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    const wishlistBtn = card.querySelector('.wishlist-btn');
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    
    wishlistBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        wishlistBtn.classList.toggle('active');
        const icon = wishlistBtn.querySelector('i');
        if (wishlistBtn.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
    
    addToCartBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        // Add to cart functionality
        const productName = card.querySelector('.product-name')?.textContent;
        console.log('Added to cart:', productName);
        
        // Show success feedback
        addToCartBtn.textContent = 'Added!';
        addToCartBtn.style.background = '#10b981';
        
        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.style.background = '';
        }, 2000);
    });
});

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    if (email) {
        console.log('Newsletter subscription:', email);
        // Show success message
        const formContainer = newsletterForm.parentElement;
        formContainer.innerHTML = '<p style="color: #10b981; font-weight: 600;">✓ Successfully subscribed!</p>';
    }
});

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Page load animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .category-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
});

// Add smooth hover effects
document.querySelectorAll('button, .product-card, .category-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
