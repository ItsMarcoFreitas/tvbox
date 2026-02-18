// Função para abrir WhatsApp
function openWhatsApp(message) {
    const phoneNumber = '555192387622';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Esperar o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    
    // Foco específico no botão "ASSINAR AGORA" dos planos
    const assinarPlanosButton = document.getElementById('btnAssinarPlanos');
    
    if (assinarPlanosButton) {
        console.log('Botão ASSINAR AGORA dos planos encontrado!');
        
        // Adicionar eventos para garantir funcionamento
        assinarPlanosButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('CLIQUE NO BOTÃO ASSINAR AGORA DOS PLANOS!');
            openWhatsApp('Olá, vim pelo site SmartPLAY e gostaria de saber mais sobre os planos disponíveis.');
        });
        
        // Adicionar suporte para touch (mobile)
        assinarPlanosButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            console.log('TOUCH NO BOTÃO ASSINAR AGORA DOS PLANOS!');
            openWhatsApp('Olá, vim pelo site SmartPLAY e gostaria de saber mais sobre os planos disponíveis.');
        });
        
        // Garantir que o botão esteja sempre clicável
        assinarPlanosButton.style.pointerEvents = 'auto';
        assinarPlanosButton.style.cursor = 'pointer';
        assinarPlanosButton.style.userSelect = 'none';
        
        console.log('Event listeners adicionados ao botão ASSINAR AGORA dos planos');
        
    } else {
        console.log('Botão ASSINAR AGORA dos planos NÃO encontrado');
    }
    
    // Botão "Solicitar Teste Grátis" - por href
    const testLinks = document.querySelectorAll('a[href*="wa.me"]');
    testLinks.forEach(link => {
        console.log('Link WhatsApp encontrado:', link.href);
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Clique no link WhatsApp');
            
            // Extrair mensagem do URL ou usar padrão
            let message = 'Quero solicitar o teste grátis!';
            if (link.href.includes('text=')) {
                const urlParams = new URLSearchParams(link.href.split('?')[1]);
                message = urlParams.get('text') || message;
            }
            
            openWhatsApp(message);
        });
    });
    
    // Scroll suave para links internos
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
    
    // Animações no scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar cards
    document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

console.log('Script.js carregado com sucesso!');
