# Buffet Sobral - Website

Site oficial do Buffet Sobral para agendamento de eventos e orçamentos.

## Estrutura do Projeto

- `public/` - Arquivos estáticos (HTML, CSS, JS, imagens)
- `api/` - Rotas da API para integração com Supabase
- `supabase.js` - Configuração do cliente Supabase

## Configuração do Ambiente

1. Crie um projeto no Supabase (https://supabase.com/)
2. Obtenha as credenciais do projeto:
   - Project URL
   - Project API Key (anon key)
3. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_SUPABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANONIMA_DO_SUPABASE
```

## Configuração do Banco de Dados

Execute o script `SUPABASE_SCHEMA.sql` no editor de tabelas do Supabase para criar as tabelas necessárias.

## Desenvolvimento Local

```bash
npm install
npm start
```

## Deployment no Vercel

1. Conecte o repositório ao Vercel
2. Adicione as variáveis de ambiente no painel do Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Faça o deploy!

## Estrutura da API

- `/api/services` - Gerencia dados dos serviços
- `/api/photos` - Gerencia fotos do espaço
- `/api/streaming` - Gerencia configuração de streaming
- `/api/videos` - Gerencia vídeos em destaque