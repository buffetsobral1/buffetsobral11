// Test file to verify API routes are working
console.log('Testing API routes...');

// Test services API
fetch('/api/services')
  .then(response => response.json())
  .then(data => console.log('Services API working:', data))
  .catch(error => console.error('Services API error:', error));

// Test photos API
fetch('/api/photos')
  .then(response => response.json())
  .then(data => console.log('Photos API working:', data))
  .catch(error => console.error('Photos API error:', error));

// Test streaming API
fetch('/api/streaming')
  .then(response => response.json())
  .then(data => console.log('Streaming API working:', data))
  .catch(error => console.error('Streaming API error:', error));

// Test videos API
fetch('/api/videos')
  .then(response => response.json())
  .then(data => console.log('Videos API working:', data))
  .catch(error => console.error('Videos API error:', error));