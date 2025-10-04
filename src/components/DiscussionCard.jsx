import React from 'react';
import { MessageSquare, Trash2, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDiscussion } from '../redux/slices/discussionsSlice';

const DiscussionCard = ({ discussion }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const canDelete = user?.role === 'admin' || discussion.authorEmail === user?.email;

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette discussion ?')) {
      dispatch(deleteDiscussion(discussion.id));
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-600';
      case 'startup':
        return 'bg-purple-100 text-purple-600';
      case 'investisseur':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
          {discussion.author.charAt(0).toUpperCase()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <h3 className="font-bold text-lg text-gray-800">
              {discussion.author}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(discussion.role)}`}>
              {discussion.role}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(discussion.date)}
            </span>
          </div>

          {/* Discussion Content */}
          <p className="text-gray-700 mb-4 leading-relaxed">
            {discussion.content}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold transition hover:bg-purple-50 px-3 py-2 rounded-lg">
              <MessageSquare className="w-5 h-5" />
              <span>{discussion.replies || 0} réponses</span>
            </button>

            {canDelete && (
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 transition hover:bg-red-50 p-2 rounded-lg"
                title="Supprimer la discussion"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;