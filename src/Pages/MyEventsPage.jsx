import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { fetchEvents, selectMyEvents } from '../redux/slices/eventsSlice';
import EventCard from '../components/EventCard';

const MyEventsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const myEvents = useSelector(selectMyEvents);
  const { loading } = useSelector((state) => state.events);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(fetchEvents());
  }, [dispatch, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Chargement de vos événements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <Calendar className="w-10 h-10 text-green-600" />
            <span>Mes Événements</span>
          </h1>
          <p className="text-gray-600">
            Gérez vos inscriptions aux événements de l'écosystème
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-1">
                Événements auxquels vous participez
              </p>
              <p className="text-4xl font-bold text-gray-800">{myEvents.length}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎉</span>
            </div>
          </div>
        </div>

        {/* Events List */}
        {myEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Aucun événement
            </h3>
            <p className="text-gray-500 mb-6">
              Vous n'êtes inscrit à aucun événement pour le moment.
            </p>
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg transition"
            >
              <span>Découvrir les événements</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map((event) => (
                <EventCard key={event.id} event={event} showLeaveButton={true} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/events')}
                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold"
              >
                <span>Découvrir plus d'événements</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyEventsPage;