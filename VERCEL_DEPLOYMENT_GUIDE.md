# 🚀 Guia Completo de Deploy no Vercel

## 📋 Pré-requisitos

Antes de começar, você precisará de:

1. Uma conta no GitHub (gratuita): https://github.com/signup
2. Uma conta no Vercel (gratuita): https://vercel.com/signup
3. Um projeto no Supabase (gratuito): https://supabase.com/

## 🔧 Passo a Passo Completo

### Passo 1: Preparar o Repositório no GitHub

1. Acesse o GitHub e faça login
2. Clique em "New repository" (ou "+ New" no canto superior direito)
3. Dê um nome ao repositório (ex: "buffet-sobral")
4. Escolha como público ou privado
5. Não inicialize com README, .gitignore ou licença
6. Clique em "Create repository"

### Passo 2: Configurar o Código Localmente

1. Abra o terminal (Git Bash no Windows, Terminal no Mac/Linux)
2. Navegue até o diretório do projeto:
   ```bash
   cd caminho/para/o/projeto/buffet-sobral-novo3
   ```

3. Inicialize o Git (se ainda não estiver):
   ```bash
   git init
   ```

4. Adicione todos os arquivos:
   ```bash
   git add .
   ```

5. Faça o primeiro commit:
   ```bash
   git commit -m "Initial commit - Site do Buffet Sobral"
   ```

6. Conecte ao repositório do GitHub (substitua "SEU_USUARIO" pelo seu nome de usuário):
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/buffet-sobral.git
   ```

7. Faça o push para o GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Passo 3: Configurar o Supabase

1. Acesse https://supabase.com/ e faça login
2. Crie um novo projeto chamado "buffet-sobral"
3. Anote as credenciais do projeto:
   - Project URL
   - Project API Key (chave anônima)

4. No painel do Supabase, vá para "SQL Editor"
5. Cole e execute o conteúdo do arquivo `SUPABASE_SCHEMA.sql` para criar as tabelas

### Passo 4: Deploy no Vercel

1. Acesse https://vercel.com/ e faça login
2. Clique em "New Project"
3. Conecte sua conta do GitHub
4. Procure e selecione o repositório "buffet-sobral"
5. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL` = sua Project URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua Project API Key do Supabase

6. Clique em "Deploy"

### Passo 5: Configurar Domínio (Opcional)

1. No painel do Vercel, vá para "Settings" > "Domains"
2. Adicione um domínio personalizado (se desejar)
3. Siga as instruções para configurar os registros DNS

## 🛠️ Scripts de Deploy

Este projeto inclui scripts para facilitar o deploy:

- `npm run deploy` - Faz deploy em produção
- `npm run deploy-dev` - Faz deploy em ambiente de desenvolvimento

Para usar esses scripts, você precisa ter o Vercel CLI instalado:
```bash
npm install -g vercel
```

E então fazer login:
```bash
vercel login
```

## 🔐 Token do GitHub

Para fazer push sem problemas, você pode usar um token de acesso pessoal:

1. No GitHub, vá em Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Clique em "Generate new token (classic)"
3. Dê um nome como "Vercel Deployment"
4. Selecione o escopo "repo"
5. Clique em "Generate token"
6. Copie o token gerado

Para usar o token:
```bash
git remote set-url origin https://<SEU_TOKEN>@github.com/<SEU_USUARIO>/buffet-sobral.git
```

## 📁 Estrutura do Projeto

```
buffet-sobral/
├── api/                 # Rotas da API para integração com Supabase
│   ├── photos.js       # Gerenciamento de fotos do espaço
│   ├── services.js     # Gerenciamento de serviços
│   ├── streaming.js    # Configuração de streaming ao vivo
│   └── videos.js       # Gerenciamento de vídeos em destaque
├── public/             # Arquivos estáticos
│   ├── index.html      # Página principal do site
│   ├── admin.html      # Painel administrativo
│   ├── api-utils.js    # Funções utilitárias para chamadas da API
│   └── ...             # Outros arquivos estáticos
├── .env.local          # Variáveis de ambiente (não commitado)
├── package.json        # Dependências e scripts do projeto
├── vercel.json         # Configuração de rotas do Vercel
└── SUPABASE_SCHEMA.sql # Script para criar tabelas no Supabase
```

## 🆘 Problemas Comuns e Soluções

### Erro: Permission denied (403)
**Solução**: Use um token de acesso pessoal do GitHub como mostrado acima.

### Erro: Environment variables não configuradas
**Solução**: Verifique se as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão configuradas no painel do Vercel.

### Erro: Tabelas do Supabase não criadas
**Solução**: Execute o script SUPABASE_SCHEMA.sql no editor de SQL do Supabase.

### Erro: Build failed
**Solução**: Verifique o log de build no painel do Vercel para identificar o problema específico.

## 📞 Suporte

Se precisar de ajuda com o deploy:
1. Verifique este guia novamente
2. Consulte a documentação oficial:
   - [Documentação do Vercel](https://vercel.com/docs)
   - [Documentação do Supabase](https://supabase.com/docs)
   - [Documentação do GitHub](https://docs.github.com)
3. Entre em contato com a equipe técnica