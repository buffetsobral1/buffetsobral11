// Vercel API route for testing
export default async function handler(req, res) {
  res.status(200).json({ 
    message: 'API test successful!',
    timestamp: new Date().toISOString(),
    env: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Defined' : 'Not defined',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Defined' : 'Not defined'
    }
  });
}