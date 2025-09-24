# Buffet Sobral - Website

Site oficial do Buffet Sobral para agendamento de eventos e orçamentos.

## 🎉 Visão Geral

O Buffet Sobral é um site moderno e responsivo desenvolvido para um buffet localizado em Sobral-CE. O projeto oferece uma experiência rica tanto para os clientes quanto para os administradores, com funcionalidades como:

- Catálogo de serviços com simulação de orçamentos
- Agenda interativa para agendamento de eventos
- Galeria de fotos do espaço
- Vídeos em destaque
- Sistema de orçamentos via WhatsApp
- Painel administrativo completo

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Hospedagem**: Vercel
- **Arquitetura**: SPA modular com componentes reutilizáveis

## 📁 Estrutura do Projeto

```
buffet-sobral-clean/
├── public/
│   ├── index.html          # Página principal do site
│   └── admin.html          # Painel administrativo
├── cache-manager.js        # Gerenciamento de cache local
├── data-models.js         # Validação e sanitização de dados
├── error-handler.js       # Tratamento centralizado de erros
├── gallery-manager.js     # Gerenciamento da galeria de fotos
├── monitoring-system.js   # Sistema de monitoramento
├── packages-manager.js    # Gerenciamento de pacotes
├── performance-optimizer.js # Otimizações de performance
├── quotes-manager.js      # Gerenciamento de orçamentos
├── services-manager.js    # Gerenciamento de serviços
├── supabase.js           # Integração com backend Supabase
├── videos-manager.js      # Gerenciamento de vídeos
├── package.json          # Dependências do projeto
├── vercel.json          # Configuração do Vercel
└── .gitignore           # Arquivos ignorados pelo Git
```

## ⚙️ Configuração do Ambiente

### 1. Criar projeto no Supabase

1. Acesse [https://supabase.com/](https://supabase.com/)
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Dê um nome ao projeto (ex: "buffet-sobral")
5. Selecione a região mais próxima
6. Defina uma senha segura para o banco de dados
7. Clique em "Create Project"

### 2. Obter credenciais do projeto

Após criar o projeto, vá para "Project Settings" → "API":
- Copie a "Project URL"
- Copie a "anon public" key

### 3. Criar arquivo `.env.local`

Na raiz do projeto, crie um arquivo `.env.local` com as seguintes variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_SUPABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANONIMA_DO_SUPABASE
```

### 4. Criar tabelas no banco de dados

1. No painel do Supabase, vá para "SQL Editor"
2. Cole o conteúdo do arquivo `SUPABASE_SCHEMA_COMPLETO.sql`
3. Clique em "Run" para executar o script

## 🛠️ Desenvolvimento Local

### Instalar dependências

```bash
npm install
```

### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em http://localhost:3000

### Outros comandos úteis

```bash
# Construir para produção
npm run build

# Iniciar servidor de produção local
npm start

# Executar testes
npm test

# Limpar cache
npm run clean
```

## ☁️ Deployment no Vercel

### 1. Conectar repositório

1. Acesse [https://vercel.com/](https://vercel.com/)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Conecte seu repositório Git (GitHub, GitLab ou Bitbucket)
5. Selecione o repositório do projeto

### 2. Configurar variáveis de ambiente

Durante o processo de deploy, adicione as mesmas variáveis do arquivo `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Fazer deploy

Clique em "Deploy" e aguarde a conclusão.

## 📖 Documentação

- [Documentação Completa](./DOCUMENTACAO_COMPLETA.md) - Visão geral do projeto
- [Guia Administrativo](./GUIA_ADMINISTRATIVO.md) - Manual de uso do painel admin
- [Guia de Instalação](./GUIA_INSTALACAO.md) - Instruções detalhadas de setup
- [Schema do Supabase](./SUPABASE_SCHEMA_COMPLETO.sql) - Script SQL completo

## 🎨 Paleta de Cores

- **Primária**: Roxo (#9c27b0)
- **Secundária**: Verde (#4caf50)
- **Detalhes**: Azul (#2196f3)

## 📱 Responsividade

O site é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Mobile (até 767px)
- Tablet (768px a 1023px)
- Desktop (1024px ou mais)

## 🔒 Segurança

- Validação de dados no frontend e backend
- Sanitização de entradas
- Proteção contra XSS
- Autenticação segura para administradores
- Row Level Security (RLS) no Supabase

## 🚀 Performance

- Lazy loading de imagens
- Cache local com TTL
- Throttling e debouncing de eventos
- Otimização de assets
- Monitoramento de performance

## 🧪 Testes

O projeto inclui uma suite completa de testes:
- Testes unitários de componentes
- Testes de integração com Supabase
- Testes de fallback para modo offline
- Testes de performance

Para executar os testes:

```bash
npm test
```

## 📈 Monitoramento

O sistema inclui monitoramento integrado:
- Logging de erros e eventos
- Métricas de performance
- Monitoramento de cache hits/misses
- Tracking de uso da API

## 👥 Suporte

Para suporte técnico ou dúvidas:
- Email: suporte@buffetsobral.com
- Telefone: (85) 99999-9999
- WhatsApp: (85) 99999-9999

## 📄 Licença

MIT License - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ para o Buffet Sobral 🎂