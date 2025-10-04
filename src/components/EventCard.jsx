import React from 'react';
import { Calendar, MapPin, Users, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { joinEvent, leaveEvent, deleteEvent } from '../redux/slices/eventsSlice';

const EventCard = ({ event, showLeaveButton = false }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const isParticipant = user && event.participants?.includes(user.email);
  const canDelete = user?.role === 'admin';

  const handleJoin = () => {
    if (!user) {
      alert('Veuillez vous connecter pour participer');
      return;
    }
    dispatch(joinEvent(event.id));
  };

  const handleLeave = () => {
    if (window.confirm('Voulez-vous vous désinscrire de cet événement ?')) {
      dispatch(leaveEvent(event.id));
    }
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      dispatch(deleteEvent(event.id));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-2xl font-bold mb-1 line-clamp-2">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Date</p>
              <p className="text-sm font-semibold">{formatDate(event.date)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Lieu</p>
              <p className="text-sm font-semibold">{event.location}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-700">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Participants</p>
              <p className="text-sm font-semibold">{event.participants?.length || 0} inscrits</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {showLeaveButton ? (
            <button
              onClick={handleLeave}
              className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition shadow-md hover:shadow-lg"
            >
              Se désinscrire
            </button>
          ) : (
            <button
              onClick={handleJoin}
              disabled={isParticipant}
              className={`flex-1 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg ${
                isParticipant
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {isParticipant ? '✓ Inscrit' : 'Participer'}
            </button>
          )}

          {canDelete && (
            <button
              onClick={handleDelete}
              className="p-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition"
              title="Supprimer l'événement"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;