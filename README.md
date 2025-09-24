# TeleSaúde HC (React)

Aplicação criada com React + Vite que moderniza o site TeleSaúde HC, mantendo o conteúdo original da landing page em componentes reutilizáveis e com navegação por rotas.

## Principais funcionalidades
- Layout responsivo com menu fixo, overlay mobile e efeito de shrink ao rolar.
- Páginas Home, Integrantes, FAQ, Contato e Solução convertidas dos arquivos HTML originais.
- Formulário de contato com validação em tempo real (sem back-end ligado).
- Integração com o chat do IBM Watson Assistant, carregado dinamicamente.

## Scripts disponíveis
- `npm run dev` – inicia o servidor de desenvolvimento (Vite) com hot reload.
- `npm run build` – gera o bundle otimizado na pasta `dist/`.
- `npm run preview` – serve localmente o build de produção para validação.
- `npm run lint` – executa as regras de ESLint configuradas pelo template Vite.

## Estrutura de pastas (src)
```
src/
├── components/        # Header, Footer e WatsonChat
├── pages/             # Páginas React equivalentes (Home, Faq, Contato, etc.)
├── styles/            # CSS reaproveitado do projeto original
├── App.jsx            # Layout principal + <Outlet />
├── main.jsx           # Configuração do React Router e bootstrap
└── index.css          # Reset/Base global complementar
```

Os assets (imagens e ícones) ficam em `public/assets` para serem servidos diretamente pelo Vite.

## Conteúdo legado
O material estático usado como base da migração (HTML, CSS e JS puros) foi preservado em `legacy-static/` dentro deste projeto. Caso precise consultar ou comparar com a versão original, o diretório mantém exatamente os arquivos anteriores à migração.
