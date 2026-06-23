// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. DESTACAR O MENU CONFORME O SCROLL (SCROLL SPY)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const changeActiveNav = () => {
        let scrollPosition = window.scrollY + 150; // Ajuste para detetar a secção um pouco antes

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', changeActiveNav);

    // 2. ANIMAÇÃO DE REVELAÇÃO AO DESLIZAR (FADE-IN EFFECT)
    const observerOptions = {
        root: null,
        threshold: 0.15, // Ativa quando 15% da secção está visível
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Deixa de observar após animar
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // Configuração inicial das secções antes de serem animadas
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // 3. CRIAR E CONTROLAR BOTÃO "VOLTAR AO TOPO"
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('title', 'Voltar ao Topo');
    
    // Estilização direta via JS para manter o ficheiro único limpo
    Object.assign(backToTopBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#2e7559',
