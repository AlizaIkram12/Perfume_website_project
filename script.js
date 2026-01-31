// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Cursor effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .product-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(3)';
        cursorDot.style.background = 'rgba(201, 169, 97, 0.5)';
    });

    element.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorDot.style.background = '#C9A961';
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                const category = card.getAttribute('data-category');
                
                if (category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Shopping Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

// Add to cart from featured section
const addToCartButtons = document.querySelectorAll('.btn-add-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = this.closest('.featured-card').querySelector('.product-name').textContent;
        const productPrice = this.closest('.featured-card').querySelector('.product-price').textContent;
        
        addItemToCart(productName, productPrice);
        showNotification(`"${productName}" cart mein add ho gaya! ✨`);
    });
});

// Add to cart from collection section
const cartButtons = document.querySelectorAll('.btn-cart');
cartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = this.closest('.product-card').querySelector('h3').textContent;
        const productPrice = this.closest('.product-card').querySelector('.price').textContent;
        
        addItemToCart(productName, productPrice);
        showNotification(`"${productName}" cart mein add ho gaya! ✨`);
    });
});

function addItemToCart(name, price) {
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    // Animation for cart icon
    const navCart = document.querySelector('.nav-cart');
    navCart.style.transform = 'scale(1.3)';
    setTimeout(() => {
        navCart.style.transform = 'scale(1)';
    }, 300);
    
    console.log(`Added to cart: ${name} - ${price}`);
}

// Notification system
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        font-weight: 600;
        border-left: 4px solid #C9A961;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Quick View functionality
const quickViewButtons = document.querySelectorAll('.btn-quick-view');

quickViewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        const productImage = card.querySelector('img').src;
        const productPrice = card.querySelector('.price').textContent;
        const productDescription = card.querySelector('p').textContent;
        
        showQuickViewModal(productName, productImage, productPrice, productDescription);
    });
});

function showQuickViewModal(name, image, price, description) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 20px;
            max-width: 800px;
            width: 100%;
            padding: 50px;
            position: relative;
            animation: scaleIn 0.3s ease-out;
        ">
            <button style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 32px;
                cursor: pointer;
                color: #0A0A0A;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s;
            " onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='none'" onclick="this.closest('.quick-view-modal').remove()">×</button>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
                <div>
                    <img src="${image}" alt="${name}" style="width: 100%; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
                </div>
                <div>
                    <h2 style="font-family: 'Cinzel', serif; font-size: 36px; margin-bottom: 15px; color: #0A0A0A;">${name}</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">${description}</p>
                    <div style="margin-bottom: 30px;">
                        <span style="color: #C9A961; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Price</span>
                        <div style="font-family: 'Cinzel', serif; font-size: 42px; font-weight: 700; color: #C9A961; margin-top: 5px;">${price}</div>
                    </div>
                    <button onclick="this.textContent='Added to Cart ✓'; this.style.background='#C9A961'; this.style.color='#0A0A0A'; setTimeout(() => this.closest('.quick-view-modal').remove(), 1000);" style="
                        width: 100%;
                        padding: 18px;
                        background: #0A0A0A;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-size: 14px;
                    " onmouseover="this.style.background='#C9A961'; this.style.color='#0A0A0A'" onmouseout="this.style.background='#0A0A0A'; this.style.color='white'">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add modal animations
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes scaleIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        .quick-view-modal > div {
            padding: 30px !important;
        }
        .quick-view-modal > div > div {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
        }
    }
`;
document.head.appendChild(modalStyle);

// Newsletter form submission
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    showNotification(`Shukriya! ${email} successfully subscribe ho gaya hai 🎉`);
    
    newsletterForm.reset();
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.featured-card, .product-card, .testimonial-card, .feature-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Hero buttons functionality
const heroButtons = document.querySelectorAll('.hero-buttons .btn');

heroButtons[0].addEventListener('click', () => {
    document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' });
});

heroButtons[1].addEventListener('click', () => {
    showNotification('Video coming soon! Stay tuned 🎬');
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s';
                
                // Simulate loading
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Cart icon click
document.querySelector('.nav-cart').addEventListener('click', () => {
    if (cartCount === 0) {
        showNotification('Aapki cart khali hai! Perfumes add karein 🛒');
    } else {
        showNotification(`Aapki cart mein ${cartCount} items hain! 🛍️`);
    }
});

// Add hover sound effect (optional - you can remove this if you don't want sound)
function playHoverSound() {
    // This is just a placeholder - you can add actual sound if needed
    console.log('Hover effect');
}

// Add stagger animation to products grid
document.querySelectorAll('.products-grid .product-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Testimonials auto-rotate (optional)
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    testimonialCards.forEach((card, index) => {
        if (index === currentTestimonial) {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
        } else {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        }
    });
    
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
}

// Rotate testimonials every 5 seconds
setInterval(rotateTestimonials, 5000);

// Console welcome message
console.log('%c🌸 Welcome to ESSENCE! 🌸', 'font-size: 24px; color: #C9A961; font-weight: bold;');
console.log('%cPakistan ki behtereen perfume website', 'font-size: 14px; color: #666;');

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});