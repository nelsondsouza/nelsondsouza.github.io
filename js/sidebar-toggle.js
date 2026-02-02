/**
 * Sidebar Toggle and Navigation Functionality
 * 
 * This script handles:
 * - Mobile sidebar toggle
 * - Mobile navigation menu toggle
 * - Smooth scrolling for anchor links
 * - Active link highlighting based on scroll position
 * - Responsive behavior
 * 
 * Minimal JavaScript for maximum compatibility
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        
        // ============================================
        // Mobile Menu Toggle
        // ============================================
        
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navbarMenu = document.querySelector('.navbar-menu');
        
        if (mobileMenuToggle && navbarMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                // Toggle menu visibility
                navbarMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
                
                // Update aria-expanded for accessibility
                const isExpanded = navbarMenu.classList.contains('active');
                mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            });
            
            // Close menu when clicking on a nav link
            const navLinks = navbarMenu.querySelectorAll('.nav-link');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        navbarMenu.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (window.innerWidth <= 768) {
                    const isClickInside = mobileMenuToggle.contains(event.target) || 
                                        navbarMenu.contains(event.target);
                    
                    if (!isClickInside && navbarMenu.classList.contains('active')) {
                        navbarMenu.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        }

        // ============================================
        // Sidebar Toggle for Mobile
        // ============================================
        
        const sidebar = document.getElementById('sidebar');
        
        // Create sidebar toggle button for mobile if it doesn't exist
        // This allows toggling sidebar on mobile separately from top nav
        function createSidebarToggle() {
            if (window.innerWidth <= 768 && !document.getElementById('sidebarToggle')) {
                const toggleBtn = document.createElement('button');
                toggleBtn.id = 'sidebarToggle';
                toggleBtn.className = 'sidebar-mobile-toggle';
                toggleBtn.innerHTML = '<span>☰</span>';
                toggleBtn.setAttribute('aria-label', 'Toggle sidebar');
                toggleBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; border-radius: 50%; background: #3b82f6; color: white; border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 1001; cursor: pointer; font-size: 1.5rem; display: flex; align-items: center; justify-content: center;';
                
                document.body.appendChild(toggleBtn);
                
                toggleBtn.addEventListener('click', function() {
                    sidebar.classList.toggle('active');
                });
            } else if (window.innerWidth > 768) {
                const existingToggle = document.getElementById('sidebarToggle');
                if (existingToggle) {
                    existingToggle.remove();
                }
            }
        }
        
        createSidebarToggle();
        
        // Recreate toggle on window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                createSidebarToggle();
                
                // Remove sidebar active class on desktop
                if (window.innerWidth > 768) {
                    if (sidebar) {
                        sidebar.classList.remove('active');
                    }
                    if (navbarMenu) {
                        navbarMenu.classList.remove('active');
                    }
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            }, 250);
        });
        
        // Close sidebar when clicking outside on mobile
        if (sidebar) {
            document.addEventListener('click', function(event) {
                if (window.innerWidth <= 768) {
                    const sidebarToggleBtn = document.getElementById('sidebarToggle');
                    const isClickInside = sidebar.contains(event.target) || 
                                        (sidebarToggleBtn && sidebarToggleBtn.contains(event.target));
                    
                    if (!isClickInside && sidebar.classList.contains('active')) {
                        sidebar.classList.remove('active');
                    }
                }
            });
        }

        // ============================================
        // Smooth Scrolling for Anchor Links
        // ============================================
        
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Don't prevent default for empty anchors
                if (href === '#' || href === '#!') {
                    return;
                }
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    // Calculate offset for fixed header
                    const headerOffset = 90;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menus after clicking
                    if (window.innerWidth <= 768) {
                        if (sidebar) {
                            sidebar.classList.remove('active');
                        }
                        if (navbarMenu) {
                            navbarMenu.classList.remove('active');
                        }
                        if (mobileMenuToggle) {
                            mobileMenuToggle.classList.remove('active');
                        }
                    }
                }
            });
        });

        // ============================================
        // Active Link Highlighting on Scroll
        // ============================================
        
        const sections = document.querySelectorAll('.content-section, .hero-section');
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        const topNavLinks = document.querySelectorAll('.nav-link');
        
        function updateActiveLinks() {
            let currentSection = '';
            
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop && 
                    window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            // Update sidebar links
            sidebarLinks.forEach(function(link) {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === '#' + currentSection) {
                    link.classList.add('active');
                }
            });
            
            // Update top nav links
            topNavLinks.forEach(function(link) {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === '#' + currentSection) {
                    link.classList.add('active');
                } else if (currentSection === 'home' && href === '#home') {
                    link.classList.add('active');
                }
            });
        }
        
        // Throttle scroll event for better performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrollTimeout = setTimeout(function() {
                updateActiveLinks();
            }, 100);
        });
        
        // Initial active link update
        updateActiveLinks();

        // ============================================
        // Theme Toggle (Placeholder for future implementation)
        // ============================================
        
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                // Placeholder for dark mode implementation
                const icon = this.querySelector('.theme-icon');
                if (icon.textContent === '🌙') {
                    icon.textContent = '☀️';
                    // Add dark mode class to body
                    // document.body.classList.add('dark-mode');
                    alert('Dark mode coming soon!');
                } else {
                    icon.textContent = '🌙';
                    // Remove dark mode class from body
                    // document.body.classList.remove('dark-mode');
                }
            });
        }

        // ============================================
        // Navbar Shadow on Scroll
        // ============================================
        
        const navbar = document.querySelector('.top-navbar');
        
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 10) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // ============================================
        // Console Message
        // ============================================
        
        console.log('🚀 Data Science Learning Dashboard initialized successfully!');
        console.log('📚 Ready for your learning journey');
    });
})();
