# Guia de Instalação e Configuração - Buffet Sobral

## 1. Requisitos do Sistema

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)
- Git
- Conta no Supabase (gratuita disponível em https://supabase.com/)
- Conta no Vercel (gratuita disponível em https://vercel.com/)

## 2. Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/buffet-sobral.git
cd buffet-sobral/buffet-sobral-clean
```

## 3. Instalando Dependências

```bash
npm install
```

## 4. Configuração do Supabase

### 4.1 Criando Projeto no Supabase

1. Acesse https://supabase.com/
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Dê um nome ao projeto (ex: "buffet-sobral")
5. Selecione a região mais próxima (South America)
6. Defina uma senha segura para o banco de dados
7. Clique em "Create Project"

### 4.2 Configurando Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_PROJETO_SUPABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANONIMA_DO_SUPABASE
```

### 4.3 Obtendo Credenciais do Supabase

1. Após criar o projeto, vá para "Project Settings" → "API"
2. Copie a "Project URL" e cole no lugar de `SUA_URL_DO_PROJETO_SUPABASE`
3. Copie a "anon public" key e cole no lugar de `SUA_CHAVE_ANONIMA_DO_SUPABASE`

### 4.4 Criando Tabelas no Banco de Dados

1. No painel do Supabase, vá para "SQL Editor"
2. Cole o conteúdo do arquivo `SUPABASE_SCHEMA_COMPLETO.sql`
3. Clique em "Run" para executar o script

### 4.5 Configurando Storage

1. No painel do Supabase, vá para "Storage"
2. Os buckets serão criados automaticamente pelo script SQL
3. Verifique se os buckets `service-images`, `space-photos` e `video-thumbnails` existem
4. Certifique-se de que os buckets estão configurados como públicos

### 4.6 Configurando Políticas RLS

As políticas RLS (Row Level Security) já foram configuradas pelo script SQL. Verifique que:

- Usuários não autenticados podem ler serviços ativos
- Apenas usuários autenticados podem criar, editar e deletar registros
- Storage tem políticas adequadas para upload e leitura

## 5. Configurando Autenticação de Administradores

### 5.1 Criando Usuário Admin

1. No painel do Supabase, vá para "Authentication" → "Users"
2. Clique em "Create User"
3. Preencha os dados:
   - Email: admin@buffetsobral.com
   - Password: senha_segura
4. Clique em "Create User"

### 5.2 Configurando Papéis

1. No SQL Editor do Supabase, execute:

```sql
-- Adicionar usuário como administrador
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'), 
  '{role}', 
  '"admin"'
) 
WHERE email = 'admin@buffetsobral.com';
```

## 6. Configuração do Vercel

### 6.1 Criando Projeto no Vercel

1. Acesse https://vercel.com/
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Conecte seu repositório Git (GitHub, GitLab ou Bitbucket)
5. Selecione o repositório do projeto
6. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL` (mesma do arquivo .env.local)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (mesma do arquivo .env.local)
7. Clique em "Deploy"

### 6.2 Configuração de Domínio Personalizado (Opcional)

1. No painel do Vercel, vá para "Settings" → "Domains"
2. Adicione seu domínio personalizado
3. Siga as instruções para configurar DNS
4. Aguarde a verificação do domínio

## 7. Estrutura de Pastas do Projeto

```
buffet-sobral-clean/
├── public/
│   ├── index.html          # Página principal do site
│   └── admin.html          # Painel administrativo
├── cache-manager.js        # Gerenciamento de cache local
├── data-models.js          # Validação e sanitização de dados
├── error-handler.js        # Tratamento centralizado de erros
├── gallery-manager.js      # Gerenciamento da galeria de fotos
├── monitoring-system.js    # Sistema de monitoramento
├── packages-manager.js     # Gerenciamento de pacotes
├── performance-optimizer.js # Otimizações de performance
├── quotes-manager.js       # Gerenciamento de orçamentos
├── services-manager.js     # Gerenciamento de serviços
├── supabase.js            # Integração com Supabase
├── videos-manager.js       # Gerenciamento de vídeos
├── package.json           # Dependências do projeto
├── vercel.json           # Configuração do Vercel
└── .gitignore            # Arquivos ignorados pelo Git
```

## 8. Desenvolvimento Local

### 8.1 Iniciando Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em http://localhost:3000

### 8.2 Comandos Úteis

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

## 9. Estrutura do Código

### 9.1 Arquivo Principal (index.html)

Contém toda a estrutura HTML do site, incluindo:
- Header com informações do buffet
- Navegação em abas
- Seções: Catálogo, Simulador, Agenda, Avaliações, Vídeos
- Modais para funcionalidades adicionais
- Scripts para funcionalidades interativas

### 9.2 Gerenciadores JavaScript

Cada gerenciador é responsável por uma parte específica do sistema:

- **cache-manager.js**: Gerencia cache local com TTL
- **data-models.js**: Valida e sanitiza dados
- **error-handler.js**: Trata e exibe erros
- **gallery-manager.js**: Gerencia galeria de fotos
- **monitoring-system.js**: Monitora saúde do sistema
- **packages-manager.js**: Gerencia pacotes de serviços
- **performance-optimizer.js**: Otimizações de performance
- **quotes-manager.js**: Gerencia orçamentos
- **services-manager.js**: Gerencia serviços individuais
- **supabase.js**: Integração com backend Supabase
- **videos-manager.js**: Gerencia vídeos em destaque

## 10. Personalização

### 10.1 Cores e Estilo

As cores principais do site são:
- Roxo: #9c27b0 (primário)
- Verde: #4caf50 (secundário/destaque)
- Azul: #2196f3 (detalhes)

Para alterar as cores, edite o CSS no `<head>` do arquivo `index.html`.

### 10.2 Conteúdo

Todo o conteúdo textual pode ser modificado diretamente no HTML:
- Títulos e descrições
- Informações de contato
- Textos das seções
- Mensagens de feedback

### 10.3 Serviços

Os serviços podem ser gerenciados através do painel administrativo ou diretamente no banco de dados Supabase.

## 11. Deploy Contínuo

O projeto está configurado para deploy contínuo com Vercel:

1. Faça commit e push das alterações para o repositório
2. O Vercel detectará automaticamente as mudanças
3. O build será iniciado automaticamente
4. O site será atualizado após conclusão do build

## 12. Monitoramento e Logs

### 12.1 Logs no Console

O sistema registra logs no console do navegador:
- `✅` Sucessos
- `⚠️` Avisos
- `❌` Erros
- `🔍` Informações de debug

### 12.2 Monitoramento em Produção

Acesse o painel administrativo e vá para "Monitoramento" para ver:
- Métricas de performance
- Taxa de erros
- Uso da API
- Eficiência do cache

## 13. Backup e Recuperação

### 13.1 Backup Manual

No painel administrativo:
1. Vá para "Configurações"
2. Clique em "💾 Fazer Backup Completo"
3. O arquivo será baixado automaticamente

### 13.2 Restauração de Backup

1. Vá para "Configurações"
2. Clique em "📤 Restaurar Backup"
3. Selecione o arquivo de backup
4. Confirme a restauração

## 14. Atualizações e Manutenção

### 14.1 Atualizando Dependências

```bash
npm outdated
npm update
```

### 14.2 Adicionando Novas Funcionalidades

1. Crie um novo gerenciador (ex: `new-feature-manager.js`)
2. Adicione ao HTML com tag `<script>`
3. Implemente a funcionalidade seguindo o padrão dos outros gerenciadores

### 14.3 Corrigindo Bugs

1. Identifique o problema através dos logs
2. Localize o arquivo responsável
3. Faça as correções necessárias
4. Teste localmente
5. Faça commit e push para deploy

## 15. Solução de Problemas

### 15.1 Erros Comuns

**"Supabase connection failed"**
- Verifique as variáveis de ambiente
- Confirme que a URL e chave estão corretas
- Verifique conectividade com a internet

**"Cache miss" repetido**
- Verifique permissões RLS no Supabase
- Confirme que há dados nas tabelas
- Verifique conectividade com o banco

**"Image loading failed"**
- Verifique URLs das imagens
- Confirme permissões de storage
- Verifique formato das imagens

### 15.2 Ferramentas de Debug

**Atalhos do Painel Admin:**
- `Ctrl + Shift + M`: Abrir dashboard de monitoramento
- `Ctrl + Shift + T`: Executar suite de testes
- `Ctrl + Shift + L`: Limpar todos os caches

**Console do Navegador:**
- `localStorage.getItem('servicesData')`: Ver dados de serviços
- `localStorage.getItem('buffetServices')`: Ver serviços personalizados
- `localStorage.getItem('cacheManager')`: Ver dados em cache

## 16. Suporte e Comunidade

### 16.1 Documentação Oficial
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs

### 16.2 Comunidade
- GitHub Discussions do projeto
- Stack Overflow (tag: buffet-sobral)
- Discord oficial do projeto

### 16.3 Contato
- Email: suporte@buffetsobral.com
- WhatsApp: (85) 99999-9999