const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 200;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Star {
    constructor() {
        this.reset();
    }
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
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
        star.update();
        star.draw();
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
    initializeCarousel(); // Garante que o carrossel se ajuste
});

initStars();
animate();

// --------------------------------------------------------
// --- NOVO CÓDIGO: FUNCIONALIDADE DO CARROSSEL ---
// --------------------------------------------------------

const reviewsGrid = document.querySelector('.reviews-grid');
const reviewCards = document.querySelectorAll('.review-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Verifica se todos os elementos necessários para o carrossel existem antes de prosseguir
if (reviewsGrid && reviewCards.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;
    let cardsPerPage; 

    // Função para determinar quantos cards mostrar com base na largura da tela
    function getCardsPerPage() {
        if (window.innerWidth <= 767) {
            return 1; // 1 card em telas pequenas
        } else {
            return 2; // 2 cards em telas maiores
        }
    }

    // Função principal para atualizar a posição e a visibilidade dos botões
    function updateCarousel() {
        cardsPerPage = getCardsPerPage();

        // 1. Calcular o deslocamento (largura do card + gap de 1.5rem ou 24px)
        // Usamos .offsetWidth para obter a largura real do elemento renderizado
        const cardWidth = reviewCards[0].offsetWidth;
        const gap = 24; // 1.5rem convertido para pixels
        const totalStep = cardWidth + gap; 
        
        // 2. Aplica o deslocamento usando CSS transform
        reviewsGrid.style.transform = `translateX(-${currentIndex * totalStep}px)`;

        // 3. Gerencia o estado dos botões (início e fim do carrossel)
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= reviewCards.length - cardsPerPage;
    }

    // Event Listener para o botão anterior
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Event Listener para o próximo botão
    nextBtn.addEventListener('click', () => {
        if (currentIndex < reviewCards.length - cardsPerPage) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Função para ser chamada ao carregar e redimensionar
    function initializeCarousel() {
        currentIndex = 0; // Reinicia a posição
        updateCarousel();
    }

    // Inicializa o carrossel ao carregar a página
    document.addEventListener('DOMContentLoaded', initializeCarousel);
    
    // O evento 'resize' já está no bloco das estrelas e chama initializeCarousel
}