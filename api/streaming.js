// Vercel API route for streaming configuration
import { supabase } from '../../supabase.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('streaming_config')
        .select('*');
      
      if (error) throw error;
      
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      // Check if config already exists
      const { data: existingData, error: fetchError } = await supabase
        .from('streaming_config')
        .select('id');
      
      if (fetchError) throw fetchError;
      
      let result;
      if (existingData && existingData.length > 0) {
        // Update existing record
        const { data, error } = await supabase
          .from('streaming_config')
          .update(req.body)
          .eq('id', existingData[0].id);
        
        if (error) throw error;
        result = data;
      } else {
        // Create new record
        const { data, error } = await supabase
          .from('streaming_config')
          .insert(req.body);
        
        if (error) throw error;
        result = data;
      }
      
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}