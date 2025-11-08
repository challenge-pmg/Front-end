# TeleSaÃºde HC - Frontend

## ðŸ“‹ Sobre o Projeto
Sistema de telemedicina desenvolvido para o Hospital das ClÃ­nicas, permitindo atendimento mÃ©dico remoto com agendamento online, prontuÃ¡rio eletrÃ´nico e videochamadas.

## ðŸš€ Tecnologias Utilizadas
- **React** + **Vite** + **TypeScript**
- **TailwindCSS** para estilizaÃ§Ã£o
- **React Router DOM** para navegaÃ§Ã£o SPA
- **React Hook Form** para validaÃ§Ãµes
- **React Icons** para Ã­cones

## ðŸ‘¥ Integrantes do Grupo
- Guilherme Lisboa Silva - RM565187 - 1TDSPW
- Pedro Henrique de Oliveira - RM562312 - 1TDSPW
- Rafael Rodrigues Trindade** - RM564303 - 1TDSPJ

## ðŸ“ Estrutura do Projeto
src/
â”œâ”€â”€ components/ # Componentes reutilizÃ¡veis
â”‚ â”œâ”€â”€ Header.tsx # CabeÃ§alho com navegaÃ§Ã£o
â”‚ â”œâ”€â”€ Logo.tsx # Logo da aplicaÃ§Ã£o
â”‚ â””â”€â”€ ContactForm.tsx # FormulÃ¡rio de contato
â”œâ”€â”€ pages/ # PÃ¡ginas da aplicaÃ§Ã£o
â”‚ â”œâ”€â”€ Home.tsx # PÃ¡gina inicial
â”‚ â”œâ”€â”€ Sobre.tsx # Sobre o projeto
â”‚ â”œâ”€â”€ FAQ.tsx # Perguntas frequentes
â”‚ â”œâ”€â”€ Integrantes.tsx # Equipe de desenvolvimento
â”‚ â””â”€â”€ Contato.tsx # PÃ¡gina de contato
â”œâ”€â”€ hooks/ # Custom hooks
â”‚ â””â”€â”€ usePageTitle.ts # Hook para tÃ­tulos dinÃ¢micos
â””â”€â”€ App.tsx # Componente principal

text

## ðŸŽ¯ Funcionalidades Implementadas
- âœ… **SPA (Single Page Application)** com React Router
- âœ… **FormulÃ¡rios validados** com React Hook Form
- âœ… **Design responsivo** com TailwindCSS
- âœ… **ComponentizaÃ§Ã£o** e reutilizaÃ§Ã£o
- âœ… **Hooks React** (useState, useEffect)
- âœ… **NavegaÃ§Ã£o** entre pÃ¡ginas
- âœ… **ValidaÃ§Ãµes** em tempo real
- âœ… **Interface moderna** e acessÃ­vel

## ðŸ›  Como Executar
```bash
# Instalar dependÃªncias
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produÃ§Ã£o
npm run build


ðŸ”— Links Importantes
RepositÃ³rio: [https://github.com/challenge-pmg/Front-end.git]

VÃ­deo Demo: [https://www.youtube.com/watch?v=T-LoQZWZnUQ]
## API HC Teleconsulta – Páginas adicionadas pela Sprint 4
- **Usuários**: listagem, criação, detalhe/edição e remoção usando `/usuarios`.
- **Pacientes**: CRUD completo com bloqueio visual para pacientes acessarem apenas o próprio cadastro.
- **Profissionais**: CRUD completo + manutenção de tipos em `/profissionais/tipos`.
- **Consultas**: agenda com filtros por papel, formulário completo e tela para atualização de status.
- Componentes utilitários adicionados (`LoginModal`, `Table`, `FormField`) e sessão provisória controlada via `AuthContext`.

## Como rodar o projeto (Sprint 4)
```bash
npm install
npm run dev
# abre em http://localhost:5173
```

### Variável opcional
Crie um arquivo `.env.local` (ou `.env`) com:
```
VITE_API_BASE_URL=https://hc-teleonsulta-api-java.onrender.com
```
Sem essa variável o app usa automaticamente a URL acima.

## Fluxo de login via Header (modal)
1. Clique em **Entrar** no cabeçalho (desktop ou mobile).
2. Escolha **Entrar** e selecione um usuário já existente (GET `/usuarios`) **ou** abra a aba **Criar conta** (POST `/usuarios`).
3. Ao concluir, o modal fecha e a sessão `{ userId, role, nome, email }` é armazenada em `localStorage`. Os botões/ações passam a respeitar o papel logado.

## Endpoints consumidos
| Método | Rota | Uso |
| --- | --- | --- |
| GET/POST/PUT/DELETE | `/usuarios`, `/usuarios/{id}` | CRUD de usuários e login fake |
| GET/POST/PUT/DELETE | `/pacientes`, `/pacientes/{id}` | Cadastro de pacientes e autoatendimento |
| GET/POST/PUT/DELETE | `/profissionais`, `/profissionais/{id}` | Cadastro da equipe |
| GET/POST | `/profissionais/tipos` | Manutenção das especialidades |
| GET/POST/PUT/DELETE | `/consultas`, `/consultas/{id}` | Agenda administrativa |
| PUT | `/consultas/{id}/status` | Atualização rápida de status |

## Regras e restrições da Sprint 4
- Nenhum arquivo pré-existente foi removido; mudanças estruturais foram adicionadas como apêndice.
- Todo consumo HTTP usa **fetch** nativo, sem Axios/Bootstrap/CDNs externas.
- Headers `X-User-Id`/`X-User-Role` são aplicados automaticamente via `src/services/api.js`.
- Regras de visibilidade por papel são “soft guards”: ações ficam ocultas/desabilitadas para perfis sem permissão, mantendo as rotas públicas existentes.

## Atualização agenda + slots (Sprint atual)
- Login agora usa POST /auth/login com email/senha e guarda pacienteId/profissionalId no contexto.
- Criação de contas dividida em paciente e profissional (com validação de VITE_FUNCIONARIO_CODE).
- Dashboard do paciente exibe disponibilidades, permite selecionar slot e agendar via POST /consultas, além de listar/cancelar futuras.
- Dashboard do profissional permite abrir/remover slots (/disponibilidades) e atualizar o status das consultas do dia.
- Client HTTP atualizado em src/services/api.js com os novos endpoints (uth, disponibilidades, consultas filtradas).
- Adicionamos fixtures (src/mocks/sampleCredentials.ts) e utilidades de data em src/utils/dateHelpers.ts (com testes via Vitest).

### Variáveis de ambiente
`
VITE_API_BASE_URL=https://hc-teleonsulta-api-java.onrender.com
VITE_FUNCIONARIO_CODE=HC-ACCESS
`
> Dica: durante o desenvolvimento você pode remover VITE_API_BASE_URL para usar o proxy /teleconsulta-api configurado no Vite.

### Fluxo principal
1. Acesse /login, autentique-se com um dos logins de exemplo ou crie uma conta.
2. Você será redirecionado para /dashboard, que alterna automaticamente entre os painéis de paciente e profissional.
3. Pacientes: filtre por profissional, selecione um slot e confirme o tipo de consulta. Consultas futuras podem ser canceladas.
4. Profissionais: crie/remova disponibilidades e atualize o status das consultas sem sair do painel.

### Testes e build
- 
pm run test executa os testes unitários do Vitest para os helpers de data.
- 
pm run build garante que o bundle (Vite) continua íntegro e pronto para deploy.

## Nova API de slots
- Login via `POST /auth/login`, guardando `pacienteId`/`profissionalId`.
- Dashboards remodelados: pacientes agendam via disponibilidades e profissionais mantêm a agenda.
- Serviços atualizados em `src/services/api.js`.

### Ambiente
```
VITE_API_BASE_URL=https://hc-teleonsulta-api-java.onrender.com
VITE_FUNCIONARIO_CODE=HC-ACCESS
```

### Fluxos
1. `/login` ? autenticação ou criação de conta.
2. `/dashboard` ? exibe painel automático conforme role.
3. Pacientes escolhem slots livres e cancelam consultas.
4. Profissionais administram disponibilidades e status.

### Testes
- `npm run test`
- `npm run build`
**Backend remoto**
Defina `VITE_API_BASE_URL=https://hc-teleonsulta-api-java.onrender.com` tanto no `.env.local` quanto nas variáveis da Vercel para que o front use sempre a mesma API (sem proxy local). O proxy `/teleconsulta-api` permanece disponível apenas como fallback.
