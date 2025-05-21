document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    body.appendChild(overlay);

    // Efeito de scroll no header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // Função para abrir o menu
    function openMenu() {
        nav.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
        hamburger.setAttribute('aria-expanded', 'true');
    }

    // Função para fechar o menu
    function closeMenu() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // Toggle do menu mobile
    hamburger.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', closeMenu);

    // Fechar menu ao clicar em um link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Validação do Formulário de Contato
    const form = document.querySelector('.contato-form');
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        const errorMessages = {};

        // Função para mostrar mensagem de erro
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            
            if (!formGroup.querySelector('.error-message')) {
                formGroup.appendChild(errorDiv);
            }
            
            input.classList.add('error');
        }

        // Função para remover mensagem de erro
        function removeError(input) {
            const formGroup = input.closest('.form-group');
            const errorDiv = formGroup.querySelector('.error-message');
            if (errorDiv) {
                errorDiv.remove();
            }
            input.classList.remove('error');
        }

        // Validação em tempo real
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
            });

            input.addEventListener('blur', () => {
                validateInput(input);
            });
        });

        // Função de validação
        function validateInput(input) {
            removeError(input);

            if (input.required && !input.value.trim()) {
                showError(input, 'Este campo é obrigatório');
                return false;
            }

            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    showError(input, 'Digite um e-mail válido');
                    return false;
                }
            }

            if (input.id === 'nome' && input.value.length < 3) {
                showError(input, 'O nome deve ter pelo menos 3 caracteres');
                return false;
            }

            if (input.id === 'mensagem' && input.value.length < 10) {
                showError(input, 'A mensagem deve ter pelo menos 10 caracteres');
                return false;
            }

            return true;
        }

        // Validação no envio do formulário
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Aqui você pode adicionar o código para enviar o formulário
                alert('Mensagem enviada com sucesso!');
                form.reset();
            }
        });
    }
}); 