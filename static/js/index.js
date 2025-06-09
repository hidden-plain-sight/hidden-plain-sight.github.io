document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    const bibTexSection = document.querySelector('#BibTeX .citation');
    const bibTexTitle = document.querySelector('#BibTeX .label');
    if (bibTexSection) {
        bibTexSection.style.cursor = 'pointer';
        bibTexTitle.innerHTML = 'Click to copy citation';
        
        bibTexSection.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(function() {
                const originalTitle = bibTexTitle.innerHTML;
                bibTexTitle.innerHTML = '📝 Copied to clipboard!';
                setTimeout(() => {
                    bibTexTitle.innerHTML = originalTitle;
                }, 2000);
            });
        });
    }

    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
