// Menu mobile
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// FAQ Accordion
const perguntas = document.querySelectorAll('.pergunta');

perguntas.forEach(pergunta => {
    pergunta.addEventListener('click', () => {
        const isActive = pergunta.classList.contains('active');
        
        // Fecha todas as perguntas
        perguntas.forEach(p => p.classList.remove('active'));
        
        // Se a pergunta clicada não estava ativa, abre ela
        if (!isActive) {
            pergunta.classList.add('active');
        }
    });
});

// Form Validation
const form = document.querySelector('.contato-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value.trim();
        
        let isValid = true;
        let errorMessage = '';
        
        if (nome.length < 3) {
            isValid = false;
            errorMessage = 'O nome deve ter pelo menos 3 caracteres';
        } else if (!email.includes('@') || !email.includes('.')) {
            isValid = false;
            errorMessage = 'Digite um e-mail válido';
        } else if (!assunto) {
            isValid = false;
            errorMessage = 'Selecione um assunto';
        } else if (mensagem.length < 10) {
            isValid = false;
            errorMessage = 'A mensagem deve ter pelo menos 10 caracteres';
        }
        
        if (!isValid) {
            alert(errorMessage);
            return;
        }
        
        // Aqui você pode adicionar o código para enviar o formulário
        alert('Mensagem enviada com sucesso!');
        form.reset();
    });
} 