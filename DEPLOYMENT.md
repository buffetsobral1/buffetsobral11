# Buffet Sobral - Deployment Guide

## 🚀 Deploy no Vercel

Este projeto está configurado para deployment automático no Vercel. Siga estas etapas:

### 1. Configuração do Projeto no Vercel

1. Acesse [https://vercel.com](https://vercel.com)
2. Conecte seu repositório Git (GitHub, GitLab, ou Bitbucket)
3. Selecione este repositório
4. Configure as variáveis de ambiente:

```
NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_SUPABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANONIMA
```

### 2. Estrutura do Projeto

- `public/` - Arquivos estáticos (HTML, CSS, JS)
- `api/` - Rotas da API para integração com Supabase
- `vercel.json` - Configuração de rotas e builds

### 3. Variáveis de Ambiente

Configure estas variáveis no painel do Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=*** (obrigatório)
NEXT_PUBLIC_SUPABASE_ANON_KEY=*** (obrigatório)
```

### 4. Configuração do Banco de Dados

Execute o script `SUPABASE_SCHEMA.sql` no Supabase para criar as tabelas:

1. `services_data` - Dados dos serviços
2. `space_photos` - Fotos do espaço
3. `streaming_config` - Configuração de streaming
4. `featured_videos` - Vídeos em destaque

### 5. Domínio Personalizado (Opcional)

Você pode configurar um domínio personalizado no painel do Vercel:
1. Vá para "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Configure os registros DNS conforme instruções

### 6. Monitoramento

O Vercel oferece monitoramento automático:
- Logs em tempo real
- Métricas de performance
- Relatórios de erro

## 🛠️ Comandos Úteis

```bash
# Instalar dependências
npm install

# Rodar localmente
npm start

# Testar deployment
vercel dev
```

## 🔧 Solução de Problemas

### Erros Comuns

1. **API calls failing**: Verifique as variáveis de ambiente
2. **Database connection**: Certifique-se que as tabelas foram criadas
3. **CORS errors**: Verifique as configurações de URL no Supabase

### Links Úteis

- [Documentação do Vercel](https://vercel.com/docs)
- [Documentação do Supabase](https://supabase.com/docs)
- [Suporte do Vercel](https://vercel.com/support)