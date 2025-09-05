import { apiService } from '../services/api';

export const uploadImage = async (imageUri, onProgress = null) => {
  try {
    console.log('Uploading image to production server...');
    
    const response = await apiService.uploadImage(imageUri, onProgress);
    
    if (response.imageUrl) {
      // Ensure the URL is absolute
      const fullImageUrl = response.imageUrl.startsWith('http') 
        ? response.imageUrl 
        : `https://derensra.com${response.imageUrl}`;
      
      return fullImageUrl;
    }
    
    throw new Error('Invalid response from server');
    
  } catch (error) {
    console.error('Production image upload error:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};