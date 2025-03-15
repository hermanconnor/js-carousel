'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-inner');
  const slides = document.querySelectorAll('.carousel-slide');
  const dotsContainer = document.querySelector('.carousel-indicators');
  const prevButton = document.querySelector('.carousel-control-prev');
  const nextButton = document.querySelector('.carousel-control-next');

  let currentIndex = 0;
  let autoplayInterval;

  const AUTOPLAY_DELAY = 5000;

  // Create Indicator Dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-indicator');

    if (index === 0) {
      dot.classList.add('active');
      dot.setAttribute('aria-current', 'true');
    }

    dot.dataset.index = index;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dotsContainer.appendChild(dot);
  });

  const indicators = document.querySelectorAll('.carousel-indicator');

  // Function to go to a specific slide
  const gotToSlide = (index) => {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    carousel.style.transform = `translateX(-${index * 100}%)`;

    // Update active dot
    indicators.forEach((dot) => dot.classList.remove('active'));
    indicators[index].classList.add('active');
    indicators[index].setAttribute('aria-current', 'true');

    currentIndex = index;
  };

  // Event listeners for navigation arrows
  prevButton.addEventListener('click', () => {
    gotToSlide(currentIndex - 1);
    resetAutoplay();
  });

  nextButton.addEventListener('click', () => {
    gotToSlide(currentIndex + 1);
    resetAutoplay();
  });

  // Event listeners for indicator dots
  indicators.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      gotToSlide(index);
      resetAutoplay();
    });

    // Keyboard accessibility for dots
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key == ' ') {
        e.preventDefault();

        const index = parseInt(dot.dataset.index);
        gotToSlide(index);
        resetAutoplay();
      }
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      gotToSlide(currentIndex - 1);
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      gotToSlide(currentIndex + 1);
      resetAutoplay();
    }
  });

  // Autoplay Functionality
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      gotToSlide(currentIndex + 1);
    }, AUTOPLAY_DELAY);
  }

  function pauseAutoplay() {
    clearInterval(autoplayInterval);
  }

  function resetAutoplay() {
    pauseAutoplay();
    startAutoplay();
  }

  // Pause autoplay when user hovers over slider
  carousel.addEventListener('mouseenter', pauseAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // Pause autoplay when the page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Start autoplay
  startAutoplay();
});
