// Funciones para deslizar los productos en el segundo carrusel
let positionMore = 0;
const itemWidth = 220; // Ancho de cada producto (incluyendo margen)
const visibleItems = 3; // Número de productos visibles a la vez
const moreCarouselInner = document.getElementById('moreCarouselInner');

function slideLeftMore() {
    if (positionMore < 0) {
        positionMore += itemWidth;
        updateCarousel(moreCarouselInner);
    }
}

function slideRightMore() {
    if (positionMore > -(moreCarouselInner.children.length - visibleItems) * itemWidth) {
        positionMore -= itemWidth;
        updateCarousel(moreCarouselInner);
    }
}

function updateCarousel(inner) {
    inner.style.transform = `translateX(${positionMore}px)`;
}

// Deslizar automáticamente los productos en el carrusel
function autoSlide() {
    if (positionMore > -(moreCarouselInner.children.length - visibleItems) * itemWidth) {
        slideRightMore();
    } else {
        positionMore = 0;
        updateCarousel(moreCarouselInner);
    }
}

setInterval(autoSlide, 10000); // Desliza cada 3 segundos

// Cargar imágenes de forma diferida
document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback para navegadores no compatibles con IntersectionObserver
        let lazyLoad = function() {
            lazyImages.forEach(function(image) {
                if (image.getBoundingClientRect().top < window.innerHeight && image.getBoundingClientRect().bottom > 0 && getComputedStyle(image).display !== "none") {
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                }
            });
            if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
            }
        };

        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
        lazyLoad();
    }
});

// Búsqueda en Amazon
function searchAmazon() {
    const query = document.getElementById("search-bar").value;
    if (query) {
        window.location.href = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
    }
}

// Abrir categoría
function openCategory(url) {
    window.location.href = url;
}
let slideIndex = 0;
//carrusel imagenes de cabecera
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-image');
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }
    const offset = -slideIndex * 100;
    document.querySelector('.carousel-header').style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    showSlide(slideIndex + step);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(slideIndex);
});

