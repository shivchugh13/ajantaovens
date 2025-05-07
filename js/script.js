document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTop = document.querySelector('.back-to-top');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const productGrids = document.querySelectorAll('.product-grid');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const orderTypeSelect = document.getElementById('orderType');
    const specificProductContainer = document.getElementById('specificProductContainer');
    const specificProductSelect = document.getElementById('specificProduct');
    
    let currentTestimonial = 0;
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
    });
    
    // Mobile Menu Toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.add('active');
        
        // Create close button if it doesn't exist
        if (!document.querySelector('.close-menu')) {
            const closeBtn = document.createElement('div');
            closeBtn.classList.add('close-menu');
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            navMenu.appendChild(closeBtn);
            
            closeBtn.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Product Categories Tab System
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all product grids
            productGrids.forEach(grid => grid.classList.remove('active'));
            
            // Show the selected product grid
            const categoryId = this.getAttribute('data-category');
            document.getElementById(categoryId).classList.add('active');
        });
    });
    
    // Testimonial Slider
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Next testimonial
    nextBtn.addEventListener('click', function() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonialCards.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    });
    
    // Previous testimonial
    prevBtn.addEventListener('click', function() {
        let prevIndex = currentTestimonial - 1;
        if (prevIndex < 0) {
            prevIndex = testimonialCards.length - 1;
        }
        showTestimonial(prevIndex);
    });
    
    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto slide testimonials every 5 seconds
    setInterval(function() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonialCards.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    }, 5000);
    
    // Order form - Dynamic product selection
    orderTypeSelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        
        if (selectedCategory === '') {
            specificProductContainer.style.display = 'none';
            return;
        }
        
        // Show the specific product dropdown
        specificProductContainer.style.display = 'block';
        
        // Clear previous options
        specificProductSelect.innerHTML = '<option value="">Select a product</option>';
        
        // Add new options based on selected category
        let options = [];
        
        switch(selectedCategory) {
            case 'bread':
                options = [
                    'Whole Wheat Naan',
                    'Masala Kulcha',
                    'Sourdough',
                    'Garlic Loaf'
                ];
                break;
            case 'cake':
                options = [
                    'Eggless Fruit Cake',
                    'Vanilla Sponge Cake',
                    'Khajoor Cake',
                    'Pineapple Cake',
                    'Chocolate Cake'
                ];
                break;
            case 'cookie':
                options = [
                    'Spiced Jeera Biscuit',
                    'Nankhatai',
                    'Atta Biscuit'
                ];
                break;
            case 'sweet':
                options = [
                    'Rum Balls',
                    'Ladoos',
                    'Caramel Popcorn'
                ];
                break;
            case 'custom':
                specificProductContainer.style.display = 'none';
                return;
        }
        
        // Add options to select
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            specificProductSelect.appendChild(optionElement);
        });
    });
    
    // Form validation
    const preOrderForm = document.getElementById('preOrderForm');
    
    preOrderForm.addEventListener('submit', function(e) {
        const phone = document.getElementById('phone').value;
        const deliveryDate = document.getElementById('deliveryDate').value;
        
        // Basic phone validation
        if (!/^\d{10,}$/.test(phone.replace(/[^0-9]/g, ''))) {
            e.preventDefault();
            alert('Please enter a valid phone number with at least 10 digits');
            return;
        }
        
        // Validate delivery date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(deliveryDate);
        
        if (selectedDate < today) {
            e.preventDefault();
            alert('Please select a future date for delivery/pickup');
            return;
        }
        
        // Check if delivery date is at least 24 hours in advance
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (selectedDate < tomorrow) {
            e.preventDefault();
            alert('Please select a date at least 24 hours in advance');
            return;
        }
    });
    
    // Set min date for delivery date input
    const deliveryDateInput = document.getElementById('deliveryDate');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format date as YYYY-MM-DD
    const formattedDate = tomorrow.toISOString().split('T')[0];
    deliveryDateInput.setAttribute('min', formattedDate);
    
    // Initialize first testimonial
    showTestimonial(0);
});
