import React from 'react';
import { MapPin, Users, Trash2, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStartup } from '../redux/slices/startupsSlice';

const StartupCard = ({ startup }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette startup ?')) {
      dispatch(deleteStartup(startup.id));
    }
  };

  const canDelete = user?.role === 'admin' || 
    (user?.role === 'startup' && startup.createdBy === user.email);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={startup.image} 
          alt={startup.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80';
          }}
        />
        {startup.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold flex items-center space-x-1">
            <span>⭐</span>
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{startup.logo}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition">
                {startup.name}
              </h3>
              <p className="text-sm text-gray-500">{startup.sector}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
          {startup.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {startup.tags?.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold hover:bg-purple-200 transition"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 hover:text-purple-600 transition">
              <MapPin className="w-4 h-4" />
              <span>{startup.location}</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-purple-600 transition">
              <Users className="w-4 h-4" />
              <span>{startup.employees}</span>
            </span>
          </div>
          
          {canDelete && (
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition p-2 hover:bg-red-50 rounded-lg"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartupCard;