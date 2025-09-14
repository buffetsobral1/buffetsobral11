// api-utils.js - Utility functions for API calls

// Base URL for API calls
const API_BASE_URL = '/api';

// Generic API call function
async function apiCall(endpoint, method = 'GET', data = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  if (data && (method === 'POST' || method === 'PUT' || method === 'DELETE')) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in API call to ${url}:`, error);
    throw error;
  }
}

// Services API functions
async function getServicesData() {
  return await apiCall('/services');
}

async function saveServicesData(data) {
  return await apiCall('/services', 'POST', data);
}

// Photos API functions
async function getSpacePhotos() {
  return await apiCall('/photos');
}

async function saveSpacePhotos(photos) {
  return await apiCall('/photos', 'POST', photos);
}

async function deleteSpacePhoto(photoId) {
  return await apiCall('/photos', 'DELETE', { id: photoId });
}

// Streaming API functions
async function getStreamingConfig() {
  return await apiCall('/streaming');
}

async function saveStreamingConfig(config) {
  return await apiCall('/streaming', 'POST', config);
}

// Videos API functions
async function getFeaturedVideos() {
  return await apiCall('/videos');
}

async function saveFeaturedVideos(videos) {
  return await apiCall('/videos', 'POST', videos);
}

async function deleteFeaturedVideo(videoId) {
  return await apiCall('/videos', 'DELETE', { id: videoId });
}

// Export all functions
export {
  apiCall,
  getServicesData,
  saveServicesData,
  getSpacePhotos,
  saveSpacePhotos,
  deleteSpacePhoto,
  getStreamingConfig,
  saveStreamingConfig,
  getFeaturedVideos,
  saveFeaturedVideos,
  deleteFeaturedVideo
};