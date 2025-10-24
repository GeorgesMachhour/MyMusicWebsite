/**
 * Modern UI/UX Enhancements JavaScript
 * Adds smooth animations, scroll effects, and interactive elements
 */

(function($) {
    'use strict';

    // ===== Loading Animation =====
    $(window).on('load', function() {
        // Hide loading overlay after page is fully loaded
        setTimeout(function() {
            $('.loading-overlay').addClass('hidden');
        }, 500);
    });

    // ===== Scroll-Triggered Animations =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(function(element) {
            observer.observe(element);
        });
    }

    // ===== Add Animation Classes to Elements =====
    function addAnimationClasses() {
        // Featured items
        $('.featured-item').addClass('fade-in');
        
        // Why items (Work with us)
        $('.why-item').each(function(index) {
            $(this).addClass(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        });
        
        // Event items
        $('.events-item').addClass('scale-in');
        
        // Contact items
        $('.contact-item').addClass('fade-in');
        
        // Playlist items
        $('.playlist-number').each(function(index) {
            $(this).css('animation-delay', (index * 0.1) + 's');
        });
    }

    // ===== Music Equalizer Effect =====
    function addMusicEqualizer() {
        // Add equalizer to play buttons
        $('.music-icon a').each(function() {
            if (!$(this).find('.music-equalizer').length) {
                $(this).append(
                    '<span class="music-equalizer" style="display: none;">' +
                    '<span></span><span></span><span></span><span></span>' +
                    '</span>'
                );
            }
        });

        // Toggle equalizer on music play
        $('.music-icon a').on('click', function(e) {
            var $equalizer = $(this).find('.music-equalizer');
            var $icon = $(this).find('i');
            
            // Toggle all other equalizers off
            $('.music-equalizer').not($equalizer).hide();
            $('.music-icon a i').removeClass('fa-pause').addClass('fa-play');
            
            // Toggle current equalizer
            if ($icon.hasClass('fa-play')) {
                $equalizer.show();
                $icon.removeClass('fa-play').addClass('fa-pause');
            } else {
                $equalizer.hide();
                $icon.removeClass('fa-pause').addClass('fa-play');
            }
        });
    }

    // ===== Smooth Scroll Enhancement =====
    function enhanceSmoothScroll() {
        $('a[href^="#"]').on('click', function(e) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000, 'swing');
                
                // Close mobile menu if open
                if ($(window).width() < 768) {
                    $('.navbar-collapse').collapse('hide');
                }
            }
        });
    }

    // ===== Active Navigation Highlight =====
    function updateActiveNav() {
        var scrollPos = $(window).scrollTop() + 100;
        
        $('.navbar-nav li a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            
            if (refElement.length && refElement.position().top <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar-nav li').removeClass('active');
                currLink.parent('li').addClass('active');
            }
        });
    }

    // ===== Parallax Enhancement =====
    function initParallax() {
        $(window).on('scroll', function() {
            var scrolled = $(window).scrollTop();
            
            // Parallax effect for banner
            $('.banner .carousel-inner').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
            
            // Parallax sections
            $('.parallax-one, .parallax-two, .parallax-three').each(function() {
                var offset = $(this).offset().top;
                var diff = scrolled - offset;
                $(this).css('background-position', '50% ' + (diff * 0.3) + 'px');
            });
        });
    }

    // ===== Card Flip Effect for Featured Albums =====
    function enhanceFeaturedItems() {
        $('.featured-item').each(function() {
            var $item = $(this);
            var $figure = $item.find('.figure');
            var $info = $item.find('.featured-item-info');
            
            $item.on('mouseenter', function() {
                $(this).addClass('pulse-animation');
            }).on('mouseleave', function() {
                $(this).removeClass('pulse-animation');
            });
        });
    }

    // ===== Typing Effect for Hero Heading =====
    function addTypingEffect() {
        var $heroHeading = $('.hero-content h2');
        if ($heroHeading.length) {
            var text = $heroHeading.text();
            $heroHeading.text('');
            $heroHeading.css('border-right', '2px solid');
            
            var i = 0;
            function typeWriter() {
                if (i < text.length) {
                    $heroHeading.append(text.charAt(i));
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(function() {
                        $heroHeading.css('border-right', 'none');
                    }, 500);
                }
            }
            
            // Start typing effect when element is visible
            var observer = new IntersectionObserver(function(entries) {
                if (entries[0].isIntersecting) {
                    typeWriter();
                    observer.disconnect();
                }
            });
            observer.observe($heroHeading[0]);
        }
    }

    // ===== Form Validation Enhancement =====
    function enhanceFormValidation() {
        $('form input, form textarea').on('blur', function() {
            var $this = $(this);
            if ($this.val().trim() === '' && $this.prop('required')) {
                $this.addClass('error-shake');
                setTimeout(function() {
                    $this.removeClass('error-shake');
                }, 500);
            }
        });
    }

    // ===== Counter Animation for Numbers =====
    function animateCounters() {
        $('.why-number').each(function() {
            var $this = $(this);
            var countTo = parseInt($this.text());
            
            var observer = new IntersectionObserver(function(entries) {
                if (entries[0].isIntersecting) {
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    }, {
                        duration: 1000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(countTo);
                        }
                    });
                    observer.disconnect();
                }
            });
            observer.observe($this[0]);
        });
    }

    // ===== Image Lazy Loading Enhancement =====
    function enhanceLazyLoading() {
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // ===== Navbar Background Change on Scroll =====
    function navbarScrollEffect() {
        $(window).on('scroll', function() {
            var scroll = $(window).scrollTop();
            
            if (scroll >= 50) {
                $('.navbar').addClass('scrolled');
            } else {
                $('.navbar').removeClass('scrolled');
            }
        });
    }

    // ===== Add Ripple Effect to Buttons =====
    function addRippleEffect() {
        $('.btn').on('click', function(e) {
            var $button = $(this);
            var $ripple = $('<span class="ripple"></span>');
            
            var diameter = Math.max($button.width(), $button.height());
            var radius = diameter / 2;
            
            $ripple.css({
                width: diameter,
                height: diameter,
                left: e.pageX - $button.offset().left - radius,
                top: e.pageY - $button.offset().top - radius
            });
            
            $button.append($ripple);
            
            setTimeout(function() {
                $ripple.remove();
            }, 600);
        });
    }

    // ===== Initialize Tooltips =====
    function initTooltips() {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover',
            animation: true,
            delay: { show: 300, hide: 100 }
        });
    }

    // ===== Add Progress Bar for Page Scroll =====
    function addScrollProgressBar() {
        var $progressBar = $('<div class="scroll-progress-bar"></div>');
        $('body').prepend($progressBar);
        
        $(window).on('scroll', function() {
            var scrollTop = $(window).scrollTop();
            var docHeight = $(document).height();
            var winHeight = $(window).height();
            var scrollPercent = (scrollTop) / (docHeight - winHeight);
            var scrollPercentRounded = Math.round(scrollPercent * 100);
            
            $progressBar.css('width', scrollPercentRounded + '%');
        });
    }

    // ===== Add CSS for Dynamic Elements =====
    function addDynamicStyles() {
        var styles = `
            <style>
                .error-shake {
                    animation: shake 0.5s;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                .scroll-progress-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #f23030, #ff4d4d);
                    z-index: 999999;
                    transition: width 0.2s ease;
                    box-shadow: 0 2px 4px rgba(242, 48, 48, 0.5);
                }
                .navbar.scrolled {
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }
            </style>
        `;
        $('head').append(styles);
    }

    // ===== Initialize All Enhancements =====
    $(document).ready(function() {
        // Add dynamic styles
        addDynamicStyles();
        
        // Add animation classes to elements
        addAnimationClasses();
        
        // Initialize scroll animations
        if ('IntersectionObserver' in window) {
            initScrollAnimations();
        }
        
        // Add music equalizer effect
        addMusicEqualizer();
        
        // Enhance smooth scrolling
        enhanceSmoothScroll();
        
        // Enhance featured items
        enhanceFeaturedItems();
        
        // Add form validation
        enhanceFormValidation();
        
        // Animate counters
        animateCounters();
        
        // Enhance lazy loading
        enhanceLazyLoading();
        
        // Navbar scroll effect
        navbarScrollEffect();
        
        // Add ripple effect
        addRippleEffect();
        
        // Initialize tooltips
        initTooltips();
        
        // Add scroll progress bar
        addScrollProgressBar();
        
        // Add typing effect (optional, can be disabled if not desired)
        // addTypingEffect();
        
        // Update active navigation on scroll
        $(window).on('scroll', function() {
            updateActiveNav();
        });
        
        // Initialize parallax
        initParallax();
    });

    // ===== Performance Optimization: Debounce Scroll Events =====
    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    // Apply debounce to scroll events
    $(window).on('scroll', debounce(function() {
        // Scroll-dependent functions that need debouncing
    }, 10));

})(jQuery);
