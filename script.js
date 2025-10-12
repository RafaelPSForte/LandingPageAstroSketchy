// ------------------------ ESTRELAS ------------------------
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 200;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random();
    }
    update() {
        this.y -= this.speed;
        if (this.y < 0) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) stars.push(new Star());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => { star.update(); star.draw(); });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initStars();
});
initStars();
animate();

// ------------------------ CARROUSEL ------------------------
const reviewsGrid = document.querySelector('.reviews-grid');
const reviewCards = document.querySelectorAll('.review-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (reviewsGrid && reviewCards.length > 0) {
    let currentIndex = 0;

    function updateCarousel() {
        const cardWidth = reviewCards[0].offsetWidth + 24;
        reviewsGrid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % reviewCards.length; // Loop infinito
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
}
