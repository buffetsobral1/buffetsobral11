const { createClient } = require('@supabase/supabase-js');

// Usar as variáveis de ambiente do projeto
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pfvasawvvbbsolhqcfgz.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdmFzYXd2dmJic29saHFjZmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI3NjgsImV4cCI6MjA3MzQ1ODc2OH0.JpRYFsQl4v8VOwVrhxQSitnyvrs984cH4nR2J1YdFoA';

console.log('Testando conexão com Supabase...');
console.log('URL:', supabaseUrl);
console.log('Key definida:', !!supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Tentando conectar ao Supabase...');
    
    // Testar conexão básica
    const { data, error } = await supabase.from('services_data').select('*').limit(1);
    
    if (error) {
      console.error('Erro ao conectar ao Supabase:', error);
      return;
    }
    
    console.log('Conexão bem-sucedida!');
    console.log('Dados retornados:', data ? data.length : 0, 'registros');
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

testConnection();