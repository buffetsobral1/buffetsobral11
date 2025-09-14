# Instruções para configurar o Supabase

## Passo 1: Criar conta no Supabase
1. Acesse https://supabase.com/
2. Crie uma conta gratuita

## Passo 2: Criar um novo projeto
1. Clique em "New Project"
2. Escolha uma organização ou crie uma nova
3. Dê um nome ao projeto (ex: buffet-sobral)
4. Defina uma senha para o banco de dados
5. Escolha a região mais próxima (ex: us-east-1)
6. Clique em "Create Project"

## Passo 3: Obter credenciais
1. Após o projeto ser criado, vá para "Project Settings" > "API"
2. Copie a "Project URL" e substitua "YOUR_SUPABASE_PROJECT_URL" no arquivo .env.local
3. Copie a "Project API Key" (anon key) e substitua "YOUR_SUPABASE_ANON_KEY" no arquivo .env.local

## Passo 4: Criar tabelas
1. No painel do Supabase, vá para "Table Editor"
2. Crie as seguintes tabelas usando o arquivo SUPABASE_SCHEMA.sql:
   - services_data
   - space_photos
   - streaming_config
   - featured_videos

## Passo 5: Configurar permissões
1. Vá para "Authentication" > "Policies"
2. Habilite políticas de leitura para tabelas que precisam ser acessadas publicamente
3. Para tabelas que requerem autenticação, configure políticas apropriadas

## Passo 6: Testar a integração
1. Abra o terminal na pasta do projeto
2. Execute:
   ```
   npm install
   ```
3. Inicie o servidor local:
   ```
   npm start
   ```
4. Verifique se os dados estão sendo carregados do Supabase

## Solução de problemas
- Se encontrar erros de CORS, verifique as configurações de URL no painel do Supabase
- Se os dados não forem carregados, verifique as credenciais no arquivo .env.local
- Certifique-se de que as tabelas foram criadas corretamente no Supabase