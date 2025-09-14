# 🚀 Guia Completo de Implantação do Site do Buffet Sobral

## 📋 Visão Geral

Este documento fornece instruções passo a passo para implantar o site do Buffet Sobral usando Vercel, integrado com Supabase para armazenamento de dados.

## 🔧 Etapas de Implantação

### 1. Configurar o Repositório no GitHub

1. Acesse [GitHub](https://github.com) e faça login
2. Crie um novo repositório:
   - Nome: `buffet-sobral-site`
   - Visibilidade: Público ou Privado (sua escolha)
   - Não inicialize com README, .gitignore ou licença
3. Anote a URL do repositório (ex: `https://github.com/seu-usuario/buffet-sobral-site.git`)

### 2. Configurar o Código Localmente

1. Abra um terminal na pasta do projeto
2. Inicialize o Git:
   ```bash
   git init
   ```
3. Adicione todos os arquivos:
   ```bash
   git add .
   ```
4. Faça o primeiro commit:
   ```bash
   git commit -m "Site inicial do Buffet Sobral"
   ```
5. Conecte ao repositório remoto:
   ```bash
   git remote add origin https://github.com/seu-usuario/buffet-sobral-site.git
   ```
6. Faça o push para o GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

### 3. Configurar o Supabase

1. Acesse [Supabase](https://supabase.com/) e crie uma conta
2. Crie um novo projeto chamado "buffet-sobral"
3. No painel do projeto, vá para "SQL Editor"
4. Cole e execute o conteúdo do arquivo `SUPABASE_SCHEMA.sql` para criar as tabelas necessárias
5. Anote as seguintes informações:
   - Project URL
   - Project API Key (chave anônima)

### 4. Implantar no Vercel

1. Acesse [Vercel](https://vercel.com/) e faça login
2. Clique em "New Project"
3. Conecte sua conta do GitHub
4. Selecione o repositório `buffet-sobral-site`
5. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL` = sua Project URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua Project API Key do Supabase
6. Clique em "Deploy"

### 5. Configurar o Domínio Personalizado (Opcional)

1. No painel do Vercel, vá para "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Siga as instruções para configurar os registros DNS

## 📁 Estrutura do Projeto

```
buffet-sobral-site/
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

## 🛠️ Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento local
- `npm run deploy` - Faz deploy em produção no Vercel
- `npm run deploy-dev` - Faz deploy em ambiente de desenvolvimento no Vercel

## 🔐 Segurança

- Nunca commite credenciais ou chaves de API
- Use variáveis de ambiente para armazenar informações sensíveis
- Mantenha o arquivo `.env.local` no `.gitignore`

## 🆘 Solução de Problemas

### Problemas Comuns

1. **Erro 403 ao fazer push para o GitHub**:
   - Verifique se você tem permissões para o repositório
   - Use um token de acesso pessoal em vez de senha
   
2. **Erro ao conectar com o Supabase**:
   - Verifique se as variáveis de ambiente estão corretas
   - Certifique-se de que as tabelas foram criadas no Supabase
   
3. **Erros de CORS**:
   - Verifique as configurações de URL no painel do Supabase
   - Adicione seu domínio do Vercel às URLs permitidas

### Links Úteis

- [Documentação do Vercel](https://vercel.com/docs)
- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do GitHub](https://docs.github.com)

## 📞 Suporte

Se precisar de ajuda adicional com a implantação:
1. Verifique este guia novamente
2. Consulte as documentações oficiais
3. Entre em contato com a equipe técnica

---
*Última atualização: 14 de setembro de 2025*