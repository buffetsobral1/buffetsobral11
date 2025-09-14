#!/bin/bash

# Script de deploy automatizado para Vercel
# Este script ajuda a fazer o deploy do projeto Buffet Sobral

echo "🚀 Iniciando processo de deploy do Buffet Sobral..."

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
  echo "❌ Erro: package.json não encontrado. Execute este script na raiz do projeto."
  exit 1
fi

echo "✅ package.json encontrado"

# Verificar se o Git está configurado
if ! command -v git &> /dev/null; then
  echo "❌ Erro: Git não encontrado. Por favor, instale o Git."
  exit 1
fi

echo "✅ Git encontrado"

# Verificar se há alterações não commitadas
if [[ -n $(git status --porcelain) ]]; then
  echo "📁 Encontradas alterações não commitadas. Commitando..."
  git add .
  git commit -m "Atualização automática do deploy"
else
  echo "✅ Nenhuma alteração pendente"
fi

# Verificar repositório remoto
REMOTE_URL=$(git remote get-url origin)
echo "🔗 Repositório remoto atual: $REMOTE_URL"

# Perguntar usuário e repositório do GitHub
echo "📝 Informe o nome de usuário do GitHub:"
read GITHUB_USER

echo "📝 Informe o nome do repositório:"
read REPO_NAME

# Configurar URL do repositório
echo "🔧 Configurando URL do repositório..."
git remote set-url origin https://github.com/$GITHUB_USER/$REPO_NAME.git

# Fazer push para o repositório
echo "📤 Fazendo push para o repositório..."
git push -u origin master

if [ $? -eq 0 ]; then
  echo "✅ Código enviado com sucesso para o GitHub!"
else
  echo "❌ Falha ao enviar código para o GitHub"
  echo "💡 Dica: Verifique se você tem permissões para o repositório ou se precisa usar um token de acesso pessoal"
  exit 1
fi

# Instruções para deploy no Vercel
echo ""
echo "🌐 Para fazer deploy no Vercel:"
echo "1. Acesse https://vercel.com"
echo "2. Conecte sua conta do GitHub"
echo "3. Importe o repositório $GITHUB_USER/$REPO_NAME"
echo "4. Configure as variáveis de ambiente:"
echo "   - NEXT_PUBLIC_SUPABASE_URL=<sua-url-do-supabase>"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-chave-anonima>"
echo "5. Faça o deploy!"

echo ""
echo "🎉 Processo de deploy concluído com sucesso!"