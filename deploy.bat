@echo off
:: Script de deploy automatizado para Vercel - Versão Windows
:: Este script ajuda a fazer o deploy do projeto Buffet Sobral

echo 🚀 Iniciando processo de deploy do Buffet Sobral...

:: Verificar se estamos no diretório correto
if not exist "package.json" (
  echo ❌ Erro: package.json não encontrado. Execute este script na raiz do projeto.
  pause
  exit /b 1
)

echo ✅ package.json encontrado

:: Verificar se o Git está configurado
git --version >nul 2>&1
if %errorlevel% neq 0 (
  echo ❌ Erro: Git não encontrado. Por favor, instale o Git.
  pause
  exit /b 1
)

echo ✅ Git encontrado

:: Verificar se há alterações não commitadas
git status --porcelain | findstr /r /c:"^.." >nul
if %errorlevel% equ 0 (
  echo 📁 Encontradas alterações não commitadas. Commitando...
  git add .
  git commit -m "Atualização automática do deploy"
) else (
  echo ✅ Nenhuma alteração pendente
)

:: Verificar repositório remoto
for /f %%i in ('git remote get-url origin') do set REMOTE_URL=%%i
echo 🔗 Repositório remoto atual: %REMOTE_URL%

:: Perguntar usuário e repositório do GitHub
set /p GITHUB_USER="📝 Informe o nome de usuário do GitHub: "
set /p REPO_NAME="📝 Informe o nome do repositório: "

:: Configurar URL do repositório
echo 🔧 Configurando URL do repositório...
git remote set-url origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git

:: Fazer push para o repositório
echo 📤 Fazendo push para o repositório...
git push -u origin master

if %errorlevel% equ 0 (
  echo ✅ Código enviado com sucesso para o GitHub!
) else (
  echo ❌ Falha ao enviar código para o GitHub
  echo 💡 Dica: Verifique se você tem permissões para o repositório ou se precisa usar um token de acesso pessoal
  pause
  exit /b 1
)

:: Instruções para deploy no Vercel
echo.
echo 🌐 Para fazer deploy no Vercel:
echo 1. Acesse https://vercel.com
echo 2. Conecte sua conta do GitHub
echo 3. Importe o repositório %GITHUB_USER%/%REPO_NAME%
echo 4. Configure as variáveis de ambiente:
echo    - NEXT_PUBLIC_SUPABASE_URL=^<sua-url-do-supabase^>
echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY=^<sua-chave-anonima^>
echo 5. Faça o deploy!

echo.
echo 🎉 Processo de deploy concluído com sucesso!

pause