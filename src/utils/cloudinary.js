// Configuration Cloudinary
const CLOUDINARY_UPLOAD_PRESET = 'ml_default'; // À remplacer
const CLOUDINARY_CLOUD_NAME = 'didhbw8cu'; // À remplacer

/**
 * Upload une image vers Cloudinary
 * @param {File} file - Le fichier image à uploader
 * @returns {Promise<string>} - L'URL de l'image uploadée
 */
export const uploadImageToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

/**
 * Upload multiple images vers Cloudinary
 * @param {FileList} files - Liste de fichiers à uploader
 * @returns {Promise<string[]>} - Tableau d'URLs des images uploadées
 */
export const uploadMultipleImages = async (files) => {
  try {
    const uploadPromises = Array.from(files).map(file => 
      uploadImageToCloudinary(file)
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
};

/**
 * Génère une URL d'image transformée (resize, crop, etc.)
 * @param {string} imageUrl - URL Cloudinary de base
 * @param {Object} transformations - Options de transformation
 * @returns {string} - URL transformée
 */
export const getTransformedImageUrl = (imageUrl, transformations = {}) => {
  const {
    width = 800,
    height = 600,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = transformations;

  if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
    return imageUrl;
  }

  const transformation = `w_${width},h_${height},c_${crop},q_${quality},f_${format}`;
  return imageUrl.replace('/upload/', `/upload/${transformation}/`);
};

/**
 * Valide si un fichier est une image
 * @param {File} file - Fichier à valider
 * @returns {boolean}
 */
export const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Type de fichier non supporté. Utilisez JPG, PNG, GIF ou WebP.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Le fichier est trop volumineux. Maximum 5MB.' };
  }

  return { valid: true };
};

export default {
  uploadImageToCloudinary,
  uploadMultipleImages,
  getTransformedImageUrl,
  isValidImageFile,
};