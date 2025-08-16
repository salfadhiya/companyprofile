(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();

    document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked tab and its content
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-white shadow-sm').css('top', '-1px');
        } else {
            $('.sticky-top').removeClass('bg-white shadow-sm').css('top', '-100px');
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Experience
    $('.experience').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });
    
    // Enhanced Article Carousel - Tambahkan ke main.js atau buat file terpisah

class ArticleCarousel {
    constructor() {
        this.currentIndex = 0;
        this.articles = document.querySelectorAll('.article-card');
        this.indicators = document.querySelectorAll('.indicator');
        this.totalArticles = this.articles.length;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.updateArticles();
        this.addClickHandlers();
        this.startAutoPlay();
        this.addKeyboardNavigation();
    }
    
    addClickHandlers() {
        // Only allow clicks on current article, not side articles
        this.articles.forEach((article, index) => {
            article.addEventListener('click', () => {
                if (article.classList.contains('article-current')) {
                    // Action for current article - could open modal or navigate to link
                    const link = article.querySelector('a');
                    if (link) {
                        window.open(link.href, '_blank');
                    }
                }
                // Remove click handlers for side articles - only arrows work
            });
        });

        // Hover pause auto-play only on container, not individual articles
        const container = document.querySelector('.article-container');
        if (container) {
            container.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            container.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
    }
    
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previous();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.next();
            } else if (e.key >= '1' && e.key <= '5') {
                e.preventDefault();
                const index = parseInt(e.key) - 1;
                if (index < this.totalArticles) {
                    this.goTo(index);
                }
            }
        });
    }
    
    updateArticles() {
        if (this.isAnimating) return;
        
        // Remove all position classes
        this.articles.forEach(article => {
            article.classList.remove('article-current', 'article-prev', 'article-next');
        });
        
        // Set current article
        this.articles[this.currentIndex].classList.add('article-current');
        
        // Set previous article
        const prevIndex = (this.currentIndex - 1 + this.totalArticles) % this.totalArticles;
        this.articles[prevIndex].classList.add('article-prev');
        
        // Set next article
        const nextIndex = (this.currentIndex + 1) % this.totalArticles;
        this.articles[nextIndex].classList.add('article-next');
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });

        // Update navigation buttons accessibility
        this.updateNavButtons();
    }
    
    updateNavButtons() {
        const prevBtn = document.querySelector('.nav-prev .nav-btn');
        const nextBtn = document.querySelector('.nav-next .nav-btn');
        
        if (prevBtn) {
            prevBtn.setAttribute('aria-label', `Previous article (${this.currentIndex + 1} of ${this.totalArticles})`);
        }
        
        if (nextBtn) {
            nextBtn.setAttribute('aria-label', `Next article (${this.currentIndex + 1} of ${this.totalArticles})`);
        }
    }
    
    next() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.currentIndex = (this.currentIndex + 1) % this.totalArticles;
        this.updateArticles();
        
        // Add animation feedback
        this.addAnimationFeedback('next');
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
    
    previous() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.currentIndex = (this.currentIndex - 1 + this.totalArticles) % this.totalArticles;
        this.updateArticles();
        
        // Add animation feedback
        this.addAnimationFeedback('prev');
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
    
    goTo(index) {
        if (this.isAnimating || index === this.currentIndex || index >= this.totalArticles || index < 0) return;
        this.isAnimating = true;
        
        this.currentIndex = index;
        this.updateArticles();
        
        // Add animation feedback
        this.addAnimationFeedback('goto');
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
    
    addAnimationFeedback(type) {
        const container = document.querySelector('.article-container');
        if (container) {
            container.classList.add(`animating-${type}`);
            setTimeout(() => {
                container.classList.remove(`animating-${type}`);
            }, 600);
        }
    }
    
    startAutoPlay() {
        this.stopAutoPlay(); // Clear existing interval
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 6000); // Auto-advance every 6 seconds
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    // Method untuk mengatur artikel berdasarkan data dinamis
    updateArticleData(articlesData) {
        this.articles.forEach((article, index) => {
            if (articlesData[index]) {
                const data = articlesData[index];
                
                // Update image
                const img = article.querySelector('.article-image');
                if (img && data.image) {
                    img.src = data.image;
                    img.alt = data.title;
                }
                
                // Update badge
                const badge = article.querySelector('.article-badge');
                if (badge && data.badge) {
                    badge.textContent = data.badge.text;
                    badge.className = `article-badge ${data.badge.class}`;
                }
                
                // Update meta
                const meta = article.querySelector('.article-meta');
                if (meta && data.date) {
                    meta.textContent = data.date;
                }
                
                // Update title
                const title = article.querySelector('.article-title');
                if (title && data.title) {
                    title.textContent = data.title;
                }
                
                // Update excerpt
                const excerpt = article.querySelector('.article-excerpt');
                if (excerpt && data.excerpt) {
                    excerpt.textContent = data.excerpt;
                }
                
                // Update link
                const link = article.querySelector('a');
                if (link && data.link) {
                    link.href = data.link;
                }
            }
        });
    }
    
    // Method untuk pause/resume
    pause() {
        this.stopAutoPlay();
    }
    
    resume() {
        this.startAutoPlay();
    }
    
    // Method untuk destroy carousel
    destroy() {
        this.stopAutoPlay();
        this.articles.forEach(article => {
            article.classList.remove('article-current', 'article-prev', 'article-next');
        });
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
    }
}

// Global functions for backward compatibility and manual control
let articleCarousel;

function nextArticle() {
    if (articleCarousel) articleCarousel.next();
}

function previousArticle() {
    if (articleCarousel) articleCarousel.previous();
}

function goToArticle(index) {
    if (articleCarousel) articleCarousel.goTo(index);
}

function pauseArticleCarousel() {
    if (articleCarousel) articleCarousel.pause();
}

function resumeArticleCarousel() {
    if (articleCarousel) articleCarousel.resume();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah artikel section ada
    if (document.querySelector('.article-container')) {
        articleCarousel = new ArticleCarousel();
        
        // Optional: Load article data from API
        // loadArticleData();
    }
});

// Optional: Function untuk load data artikel dari API
function loadArticleData() {
    // Contoh implementasi untuk load data dinamis
    /*
    fetch('/api/articles')
        .then(response => response.json())
        .then(data => {
            if (articleCarousel) {
                articleCarousel.updateArticleData(data);
            }
        })
        .catch(error => {
            console.error('Error loading articles:', error);
        });
    */
}

// Touch support untuk mobile
if ('ontouchstart' in window) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - go to previous
                previousArticle();
            } else {
                // Swipe left - go to next
                nextArticle();
            }
        }
    }
}
})(jQuery);

