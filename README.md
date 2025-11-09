# HC Teleconsulta – Front-end (Sprint 4)

Aplicação SPA em React + Vite + TypeScript responsável por consumir a API Java do HC Teleconsulta. O objetivo desta sprint foi migrar todo o front-end para uma arquitetura modular, responsiva e integrada ao backend oficial (slots/disponibilidades, consultas e autenticação).

## 🔗 Links importantes
- **Deploy (Vercel):** https://hc-teleconsulta-pg.vercel.app
- **Repositório GitHub:** https://github.com/challenge-pmg/Front-end
- **API Java (Render):** https://hc-teleonsulta-api-java-1.onrender.com
  - OpenAPI: https://hc-teleonsulta-api-java-1.onrender.com/q/openapi
  - Swagger UI: https://hc-teleonsulta-api-java-1.onrender.com/q/swagger-ui/
- **Vídeo (YouTube):** https://www.youtube.com/watch?v=p7-iea1Cgkk

## 🧰 Stack principal
- React 18 + Vite + TypeScript
- React Router DOM (SPA com rotas públicas/privadas)
- TailwindCSS (estilização responsiva)
- React Hook Form (cadastros)
- React Icons
- Fetch nativo + Context API (sessão, headers `X-User-Id` / `X-User-Role`)

## ✅ Requisitos e execução
| Requisito | Status |
| --- | --- |
| SPA com rotas estáticas e dinâmicas (`/consultas/:id`) | ✔️ |
| Tipagens (types, unions) no client | ✔️ |
| Tailwind responsivo (XS → XL) | ✔️ |
| Deploy na Vercel + consumo remoto | ✔️ |
| Integração completa com API Java (CRUD, erros, headers) | ✔️ |
| README em Markdown + links | ✔️ |
| Vídeo demonstrativo (≤3 min) | ✔️ |

### Pré-requisitos
- Node.js 18+
- npm 9+

### Como rodar
```bash
git clone https://github.com/challenge-pmg/Front-end.git
cd Front-end
npm install
cp .env.example .env.local   # ou crie manualmente
npm run dev                  # http://localhost:5173

# Testes / build
npm run test
npm run build
```

### Variáveis de ambiente
Crie `.env.local` (não versionado):
```
VITE_API_BASE_URL=https://hc-teleonsulta-api-java-1.onrender.com
VITE_FUNCIONARIO_CODE=HC-ACCESS
```
> No deploy foi configurado o mesmo host para evitar divergências.

## 🗂️ Estrutura resumida
```
src/
├─ components/        # Header, FormField, Table, LoginModal etc.
├─ context/           # AuthContext (localStorage + headers)
├─ pages/
│   ├─ Home, FAQ, Integrantes, Contato, Login
│   └─ dashboard/
│        ├─ PatientDashboard.tsx
│        ├─ ProfessionalDashboard.tsx
│        └─ ConsultaDetail.tsx   <-- rota dinâmica /consultas/:id
├─ services/api.ts    # Fetch helper, tipos, endpoints
├─ mocks/             # sampleCredentials.ts (logins oficiais)
├─ styles/            # Tailwind globals
└─ utils/             # date helpers (com testes Vitest)
```

## 🔐 Fluxos implementados
1. **Login** (`POST /auth/login`) – Armazena `{ usuarioId, role, pacienteId, profissionalId }` no `AuthContext`.
2. **Dashboard do paciente**
   - Lista disponibilidades (`GET /disponibilidades`) e marca consulta via `POST /consultas`.
   - Cancela consultas (`PUT /consultas/{id}/status`) e abre detalhes (`/consultas/:id`).
3. **Dashboard do profissional**
   - Gerencia slots (`GET/POST/DELETE /disponibilidades`).
   - Acompanha consultas (`GET /consultas?profissionalId=...`), atualiza status e abre detalhes.
4. **Consulta detail page** – rota dinâmica `/consultas/:id`, permitindo revisar informações e alterar status.
5. **Logins/mocks** – acessíveis no `/login` e descritos abaixo para testes rápidos.

## 🌐 Integração com a API
| Verbo | Endpoint | Uso no front |
| --- | --- | --- |
| POST | `/auth/login` | autenticação (paciente/profissional) |
| GET  | `/profissionais`, `/profissionais/tipos` | combos e dashboards |
| GET/POST/DELETE | `/disponibilidades` | slots do profissional |
| GET | `/consultas?pacienteId=`, `/consultas?profissionalId=` | dashboards filtrados |
| GET | `/consultas/{id}` | rota dinâmica de detalhes |
| POST | `/consultas` | agendamento (link gerado pelo back) |
| PUT  | `/consultas/{id}/status` | atualização de status ou cancelamento |

Todas as chamadas usam fetch nativo e `fetchJson` (timeout + retry + mapeamento de mensagens 400/401/403/404/409).

## 👩‍⚕️ Logins oficiais (script `load_sample_data.sql`)
| Perfil | Email | Senha |
| --- | --- | --- |
| Paciente – Ana | ana.paciente@hc.com | 123456 |
| Paciente – Bruno | bruno.paciente@hc.com | 123456 |
| Paciente – Carla | carla.paciente@hc.com | 123456 |
| Profissional – Henrique | henrique.prof@hc.com | 123456 |
| Profissional – Marina | marina.prof@hc.com | 123456 |

> Para criar profissionais manualmente, informe o código interno definido em `VITE_FUNCIONARIO_CODE`.

## 📱 Responsividade & UI
- Layout fluido usando utilitários Tailwind (`grid`, `flex`, `md:`, `lg:` etc.) cobrindo XS → XL.
- Header fixo com CTA “Entrar” (modal) e navegação condicional por role.
- Padrões de feedback (`text-red-600`, `bg-emerald-50`, alerts para erros de API) e avisos de reconexão.

## 📦 Deploy & versionamento
- **Deploy automático**: branch `main` → Vercel (`hc-teleconsulta-pg.vercel.app`). Após cada deploy, utilize `GET /warmup` (Render) ou aguarde o ping automático para evitar cold start.
- **Versionamento**: repositório GitHub público com histórico de commits por integrante (≥5). Utilize Git/GitHub/Gitflow para novas features e mantenha o README como fonte de verdade.

## ▶️ Vídeo
Apresentação de até 3 minutos mostrando funcionalidades, layout responsivo e integração com a API:  
https://www.youtube.com/watch?v=p7-iea1Cgkk

---
Em caso de dúvidas sobre ambiente, testes ou integrações adicionais, consulte este README ou abra uma issue no repositório. Boas contribuições!

