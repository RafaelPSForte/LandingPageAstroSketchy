// 🔮 Carrossel otimizado
function initializeCarousel() {
  const reviewsGrid = document.querySelector('.reviews-grid');
  const reviewCards = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (!reviewsGrid || reviewCards.length === 0) return;

  let currentIndex = 0;
  let cardsPerPage = getCardsPerPage();

  function getCardsPerPage() {
    return window.innerWidth <= 767 ? 1 : 2;
  }

  function updateCarousel() {
    cardsPerPage = getCardsPerPage();

    const totalCards = reviewCards.length;
    const cardWidth = reviewCards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(reviewsGrid).gap) || 24;
    const step = cardWidth + gap;

    const maxIndex = Math.max(totalCards - cardsPerPage, 0);
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    reviewsGrid.style.transform = `translateX(-${currentIndex * step}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    prevBtn.style.opacity = prevBtn.disabled ? '0.4' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.4' : '1';
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalCards = reviewCards.length;
    if (currentIndex < totalCards - cardsPerPage) {
      currentIndex++;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}

document.addEventListener('DOMContentLoaded', initializeCarousel);
