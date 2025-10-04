import React, { useState } from 'react';
import { X, Upload, Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createStartup } from '../redux/slices/startupsSlice';
import { createEvent } from '../redux/slices/eventsSlice';
import { createDiscussion } from '../redux/slices/discussionsSlice';
import { uploadImageToCloudinary, isValidImageFile } from '../utils/cloudinary';

const Modal = ({ isOpen, onClose, type, title }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.startups);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const sectors = [
    'Intelligence Artificielle',
    'Fintech',
    'E-commerce',
    'Tourisme',
    'Santé',
    'Education',
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = isValidImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.image || '';

      // Upload image to Cloudinary if file is selected
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImageToCloudinary(imageFile);
        setUploading(false);
      }

      const dataToSubmit = { ...formData, image: imageUrl };

      if (type === 'startup') {
        // Process tags
        if (dataToSubmit.tags && typeof dataToSubmit.tags === 'string') {
          dataToSubmit.tags = dataToSubmit.tags.split(',').map(t => t.trim());
        }
        dataToSubmit.employees = parseInt(dataToSubmit.employees) || 0;
        dispatch(createStartup(dataToSubmit));
      } else if (type === 'event') {
        dispatch(createEvent(dataToSubmit));
      } else if (type === 'discussion') {
        dispatch(createDiscussion(dataToSubmit));
      }

      setFormData({});
      setImageFile(null);
      setImagePreview('');
      onClose();
    } catch (error) {
      setUploading(false);
      alert('Erreur lors de l\'upload de l\'image: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {type === 'startup' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom de la startup *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Secteur *
                </label>
                <select
                  name="sector"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez un secteur</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Logo (emoji) *
                </label>
                <input
                  type="text"
                  name="logo"
                  placeholder="🚀"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre d'employés *
                  </label>
                  <input
                    type="number"
                    name="employees"
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  name="tags"
                  placeholder="IA, SaaS, Mobile"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image *
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                  <p className="text-xs text-gray-500">
                    Ou entrez une URL d'image (si vous n'uploadez pas de fichier)
                  </p>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    onChange={handleChange}
                  />
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>
            </>
          )}

          {type === 'event' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titre de l'événement *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lieu *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image *
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                  <p className="text-xs text-gray-500">
                    Ou entrez une URL d'image
                  </p>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    onChange={handleChange}
                  />
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>
            </>
          )}

          {type === 'discussion' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Votre message *
              </label>
              <textarea
                name="content"
                required
                rows="6"
                placeholder="Partagez votre question ou votre idée avec la communauté..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                onChange={handleChange}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {(loading || uploading) ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Chargement...</span>
                </>
              ) : (
                <span>Enregistrer</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;