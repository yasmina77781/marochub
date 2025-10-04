import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { fetchEvents } from '../redux/slices/eventsSlice';
import EventCard from '../components/EventCard';
import Modal from '../components/Modal';

const EventsPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { items: events, loading } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const canCreateEvent = user && user.role !== 'visiteur';

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  if (loading && events.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Chargement des événements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
                <CalendarIcon className="w-10 h-10 text-purple-600" />
                <span>Événements</span>
              </h1>
              <p className="text-gray-600">
                Découvrez et participez aux événements de l'écosystème numérique marocain
              </p>
            </div>
            
            {canCreateEvent && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                <span>Créer un événement</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Total Événements</p>
                <p className="text-3xl font-bold text-gray-800">{events.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">À venir</p>
                <p className="text-3xl font-bold text-gray-800">
                  {events.filter(e => new Date(e.date) >= new Date()).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Participants Total</p>
                <p className="text-3xl font-bold text-gray-800">
                  {events.reduce((sum, e) => sum + (e.participants?.length || 0), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {sortedEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Aucun événement disponible
            </h3>
            <p className="text-gray-500 mb-6">
              Soyez le premier à créer un événement pour la communauté
            </p>
            {canCreateEvent && (
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition"
              >
                <Plus className="w-5 h-5" />
                <span>Créer un événement</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="event"
        title="Créer un Événement"
      />
    </div>
  );
};

export default EventsPage;