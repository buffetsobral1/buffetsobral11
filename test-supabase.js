const { createClient } = require('@supabase/supabase-js');

// Substitua pelos seus valores reais
const supabaseUrl = 'https://pfvasawvvbbsolhqcfgz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdmFzYXd2dmJic29saHFjZmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI3NjgsImV4cCI6MjA3MzQ1ODc2OH0.JpRYFsQl4v8VOwVrhxQSitnyvrs984cH4nR2J1YdFoA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Testar conexão básica
    const { data, error } = await supabase.from('services_data').select('*');
    
    if (error) {
      console.error('Erro ao conectar ao Supabase:', error);
    } else {
      console.log('Conexão bem-sucedida! Dados:', data);
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

testConnection();