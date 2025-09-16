// Vercel API route for services data - Test version
export default async function handler(req, res) {
  res.status(200).json({ 
    message: 'API test successful!',
    data: [
      { id: 1, name: 'Test Service', price: 100 }
    ]
  });
}