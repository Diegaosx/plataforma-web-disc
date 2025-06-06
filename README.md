# 🎯 Plataforma DISC - Sistema de Avaliação Comportamental

Uma plataforma moderna, segura e ética para aplicação de avaliações DISC, desenvolvida com Next.js 14, PostgreSQL e NextAuth.js.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Configuração do Banco](#-configuração-do-banco)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Deploy](#-deploy)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API](#-api)
- [Segurança e LGPD](#-segurança-e-lgpd)
- [Contribuição](#-contribuição)

## 🎯 Visão Geral

A Plataforma DISC é um sistema completo para aplicação de avaliações comportamentais DISC, oferecendo:

- **Dashboard intuitivo** com métricas em tempo real
- **Gestão de candidatos** e projetos
- **Sistema de autenticação** robusto
- **Relatórios DISC** automatizados
- **Conformidade LGPD** integrada
- **Arquitetura escalável** para qualquer servidor

## 🚀 Tecnologias

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Shadcn/ui** - Componentes UI modernos
- **Recharts** - Gráficos interativos

### Backend
- **Next.js API Routes** - API REST integrada
- **NextAuth.js** - Autenticação completa
- **Prisma ORM** - Gerenciamento de banco de dados
- **bcryptjs** - Hash de senhas seguro

### Banco de Dados
- **PostgreSQL** - Banco relacional robusto
- **Railway** - Hospedagem de banco na nuvem

### Deploy
- **Vercel** - Deploy automático
- **EasyPanel** - Compatível com VPS
- **Docker** - Containerização (opcional)

## 🏗️ Arquitetura

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • Dashboard     │    │ • Authentication│    │ • Users         │
│ • Forms         │    │ • CRUD APIs     │    │ • Companies     │
│ • Charts        │    │ • File Upload   │    │ • Candidates    │
│ • Reports       │    │ • Email Service │    │ • Assessments   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
\`\`\`

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm/yarn/pnpm
- PostgreSQL (local ou Railway)

### 1. Clone o repositório
\`\`\`bash
git clone https://github.com/seu-usuario/plataforma-disc.git
cd plataforma-disc
\`\`\`

### 2. Instale as dependências
\`\`\`bash
npm install
# ou
yarn install
# ou
pnpm install
\`\`\`

### 3. Configure as variáveis de ambiente
\`\`\`bash
cp .env.example .env
\`\`\`

Edite o arquivo `.env` com suas configurações:

\`\`\`env
# Database
DATABASE_URL="postgresql://postgres:acjYotltzhUqFreHrjavjxvXHyyDtVPD@crossover.proxy.rlwy.net:34006/railway"

# NextAuth.js
NEXTAUTH_SECRET="sua-chave-secreta-muito-segura-aqui-deve-ter-pelo-menos-32-caracteres"
NEXTAUTH_URL="http://localhost:3000"

# Email (opcional)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="seu-email@gmail.com"
EMAIL_SERVER_PASSWORD="sua-senha-app"
EMAIL_FROM="noreply@dezorzi.com"
\`\`\`

## 🗄️ Configuração do Banco

### ✅ Integração Railway Configurada

Como vocês já têm a integração Railway + PostgreSQL configurada, basta executar os scripts SQL:

### 1. Acesse o Railway Dashboard
1. Vá para [railway.app](https://railway.app)
2. Acesse seu projeto
3. Clique no serviço PostgreSQL
4. Abra o **Query Editor** ou use o **Connect** para acessar via psql

### 2. Execute os Scripts SQL

**Primeiro, execute o script de criação da estrutura:**
\`\`\`sql
-- Copie e cole todo o conteúdo do arquivo scripts/create-database.sql
-- no Query Editor do Railway
\`\`\`

**Depois, execute o script de dados iniciais:**
\`\`\`sql
-- Copie e cole todo o conteúdo do arquivo scripts/seed-data.sql
-- no Query Editor do Railway
\`\`\`

### 3. Verificar Conexão

A variável `DATABASE_URL` já está configurada automaticamente pelo Railway:
\`\`\`env
DATABASE_URL="postgresql://postgres:acjYotltzhUqFreHrjavjxvXHyyDtVPD@crossover.proxy.rlwy.net:34006/railway"
\`\`\`

### ✅ Usuários de Teste Criados

| Tipo | Email | Senha | Descrição |
|------|-------|-------|-----------|
| Admin | admin@dezorzi.com | admin123 | Acesso total ao sistema |
| Consultor | consultant@dezorzi.com | consultant123 | Gestão de candidatos |
| Cliente | client@empresa.com | client123 | Visualização de relatórios |

## 🔧 Variáveis de Ambiente

### ✅ Configuração Railway

As variáveis já estão configuradas na integração Railway:

| Variável | Status | Descrição |
|----------|--------|-----------|
| `DATABASE_URL` | ✅ **Configurada** | URL automática do PostgreSQL Railway |
| `NEXTAUTH_SECRET` | ✅ **Configurada** | Chave secreta para autenticação |
| `NEXTAUTH_URL` | ✅ **Configurada** | URL da aplicação |

### Variáveis Opcionais (Futuras)

| Variável | Descrição | Necessário |
|----------|-----------|------------|
| `EMAIL_SERVER_HOST` | Servidor SMTP para emails | Opcional |
| `EMAIL_SERVER_PORT` | Porta SMTP | Opcional |
| `EMAIL_FROM` | Email remetente | Opcional |

## 🚀 Deploy

### ✅ Railway + Vercel (Configuração Atual)

Sua configuração atual:
- **Banco de Dados:** Railway PostgreSQL
- **Aplicação:** Vercel (recomendado)
- **Variáveis:** Já configuradas

#### Deploy Automático
1. **Push para o repositório** - Deploy automático no Vercel
2. **Variáveis sincronizadas** - Railway + Vercel integrados
3. **Banco conectado** - PostgreSQL Railway funcionando

#### Comandos Locais
\`\`\`bash
# Desenvolvimento local
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
\`\`\`

### Alternativas de Deploy

#### EasyPanel/VPS
\`\`\`bash
# Build da aplicação
npm run build

# Iniciar em produção
npm start

# Ou com PM2
pm2 start npm --name "plataforma-disc" -- start
\`\`\`

#### Docker
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## ✨ Funcionalidades

### 🔐 Autenticação
- Login com email/senha
- Sessões seguras com NextAuth.js
- Controle de acesso por roles (Admin, Consultor, Cliente)
- Hash de senhas com bcrypt

### 📊 Dashboard
- Métricas em tempo real
- Gráficos DISC interativos
- Estatísticas de candidatos
- Visão geral de projetos

### 👥 Gestão de Candidatos
- Cadastro de candidatos
- Envio de links de avaliação
- Acompanhamento de status
- Histórico completo

### 📈 Relatórios DISC
- Geração automática de relatórios
- Visualização de resultados
- Padrões comportamentais
- Exportação de dados

### 🏢 Multi-empresa
- Gestão de múltiplas empresas
- Projetos por empresa
- Isolamento de dados
- Branding personalizado

### 🔒 Segurança e LGPD
- Consentimento explícito
- Anonização de dados
- Logs de auditoria
- Exclusão de dados

## 📁 Estrutura do Projeto

\`\`\`
plataforma-disc/
├── app/                          # App Router (Next.js 14)
│   ├── api/                      # API Routes
│   │   ├── auth/                 # NextAuth.js
│   │   └── candidates/           # CRUD Candidatos
│   ├── dashboard/                # Área logada
│   │   ├── candidates/           # Gestão candidatos
│   │   └── layout.tsx            # Layout dashboard
│   ├── login/                    # Página de login
│   └── page.tsx                  # Landing page
├── components/                   # Componentes React
│   ├── dashboard/                # Componentes do dashboard
│   ├── ui/                       # Componentes base (shadcn)
│   └── ...
├── lib/                          # Utilitários
│   ├── auth.ts                   # Configuração NextAuth
│   ├── prisma.ts                 # Cliente Prisma
│   └── utils.ts                  # Funções auxiliares
├── prisma/                       # Schema e migrations
│   ├── schema.prisma             # Modelo do banco
│   └── seed.ts                   # Dados iniciais
├── scripts/                      # Scripts SQL
│   ├── create-database.sql       # Criação do banco
│   └── seed-data.sql             # Dados iniciais
└── types/                        # Tipos TypeScript
\`\`\`

## 🔌 API

### Endpoints Principais

#### Autenticação
\`\`\`
POST /api/auth/signin              # Login
POST /api/auth/signout             # Logout
GET  /api/auth/session             # Sessão atual
\`\`\`

#### Candidatos
\`\`\`
GET    /api/candidates             # Listar candidatos
POST   /api/candidates             # Criar candidato
PUT    /api/candidates/[id]        # Atualizar candidato
DELETE /api/candidates/[id]        # Excluir candidato
\`\`\`

#### Avaliações
\`\`\`
GET  /api/assessments/[id]         # Buscar avaliação
POST /api/assessments              # Criar avaliação
PUT  /api/assessments/[id]         # Atualizar resultado
\`\`\`

### Exemplo de Uso

\`\`\`typescript
// Criar candidato
const response = await fetch('/api/candidates', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'João Silva',
    email: 'joao@exemplo.com',
    projectId: 'project-1'
  })
});

const candidate = await response.json();
\`\`\`

## 🔒 Segurança e LGPD

### Medidas de Segurança
- ✅ Hash de senhas com bcrypt
- ✅ Sessões JWT seguras
- ✅ Validação de entrada
- ✅ Sanitização de dados
- ✅ HTTPS obrigatório
- ✅ Rate limiting

### Conformidade LGPD
- ✅ Consentimento explícito
- ✅ Finalidade específica
- ✅ Minimização de dados
- ✅ Direito ao esquecimento
- ✅ Portabilidade de dados
- ✅ Logs de auditoria

### Boas Práticas
\`\`\`typescript
// Exemplo de validação
const candidateSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  consent: z.boolean().refine(val => val === true)
});
\`\`\`

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o projeto
2. **Crie** uma branch para sua feature
   \`\`\`bash
   git checkout -b feature/nova-funcionalidade
   \`\`\`
3. **Commit** suas mudanças
   \`\`\`bash
   git commit -m 'feat: adiciona nova funcionalidade'
   \`\`\`
4. **Push** para a branch
   \`\`\`bash
   git push origin feature/nova-funcionalidade
   \`\`\`
5. **Abra** um Pull Request

### Padrões de Código

- **ESLint** + **Prettier** para formatação
- **Conventional Commits** para mensagens
- **TypeScript** obrigatório
- **Testes** para novas funcionalidades

### Roadmap

- [ ] Sistema de notificações
- [ ] Relatórios avançados
- [ ] Integração com IA
- [ ] App mobile
- [ ] API pública
- [ ] Webhooks

## 📞 Suporte

### Documentação
- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [NextAuth.js](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Contato
- **Email:** suporte@dezorzi.com
- **GitHub:** [Issues](https://github.com/seu-usuario/plataforma-disc/issues)
- **Discord:** [Comunidade](https://discord.gg/plataforma-disc)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ pela equipe Dezorzi Consultoria**

*Transformando dados comportamentais em insights estratégicos*
