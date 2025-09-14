// check.js - Script para verificar se o projeto está pronto para deployment
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando se o projeto está pronto para deployment no Vercel...\n');

// Verificar estrutura de diretórios
const requiredDirs = ['api', 'public'];
const missingDirs = [];

requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    missingDirs.push(dir);
  }
});

if (missingDirs.length > 0) {
  console.log(`❌ Diretórios faltando: ${missingDirs.join(', ')}`);
  process.exit(1);
} else {
  console.log('✅ Diretórios necessários presentes');
}

// Verificar arquivos principais
const requiredFiles = [
  'package.json',
  'vercel.json',
  'public/index.html',
  'public/admin.html',
  'api/services.js',
  'api/photos.js',
  'api/streaming.js',
  'api/videos.js'
];

const missingFiles = [];

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log(`❌ Arquivos faltando: ${missingFiles.join(', ')}`);
  process.exit(1);
} else {
  console.log('✅ Arquivos necessários presentes');
}

// Verificar conteúdo do package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = ['start'];
const missingScripts = [];

requiredScripts.forEach(script => {
  if (!packageJson.scripts || !packageJson.scripts[script]) {
    missingScripts.push(script);
  }
});

if (missingScripts.length > 0) {
  console.log(`❌ Scripts faltando no package.json: ${missingScripts.join(', ')}`);
  process.exit(1);
} else {
  console.log('✅ Scripts necessários configurados no package.json');
}

// Verificar conteúdo do vercel.json
const vercelJson = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
if (!vercelJson.builds || !vercelJson.routes) {
  console.log('❌ Configuração incompleta no vercel.json');
  process.exit(1);
} else {
  console.log('✅ Configuração do vercel.json está presente');
}

// Verificar arquivos HTML
const indexHtml = fs.readFileSync('public/index.html', 'utf8');
const adminHtml = fs.readFileSync('public/admin.html', 'utf8');

if (!indexHtml.includes('api-utils.js')) {
  console.log('⚠️  Arquivo index.html pode não estar usando API utilities');
} else {
  console.log('✅ index.html configurado para usar API utilities');
}

if (!adminHtml.includes('api-utils.js')) {
  console.log('⚠️  Arquivo admin.html pode não estar usando API utilities');
} else {
  console.log('✅ admin.html configurado para usar API utilities');
}

console.log('\n🎉 Projeto verificado com sucesso!');
console.log('\n📋 Próximos passos para deployment:');
console.log('1. Configure as variáveis de ambiente no Vercel:');
console.log('   - NEXT_PUBLIC_SUPABASE_URL');
console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY');
console.log('2. Crie as tabelas no Supabase usando SUPABASE_SCHEMA.sql');
console.log('3. Faça o deploy no Vercel conectando o repositório');

process.exit(0);