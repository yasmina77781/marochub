import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Award, MapPin, Users, TrendingUp } from 'lucide-react';
import { fetchStartups, setSearchTerm, setSelectedSector, selectFilteredStartups, selectFeaturedStartup } from '../redux/slices/startupsSlice';
import { fetchEvents, selectUpcomingEvents } from '../redux/slices/eventsSlice';
import StartupCard from '../components/StartupCard';
import EventCard from '../components/EventCard';
import Modal from '../components/Modal';

const HomePage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  
  const { items: startups, loading, searchTerm, selectedSector } = useSelector((state) => state.startups);
  const filteredStartups = useSelector(selectFilteredStartups);
  const featuredStartup = useSelector(selectFeaturedStartup);
  const upcomingEvents = useSelector(selectUpcomingEvents);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchStartups());
    dispatch(fetchEvents());
  }, [dispatch]);

  const sectors = [
    'Tous',
    'Intelligence Artificielle',
    'Fintech',
    'E-commerce',
    'Tourisme',
    'Santé',
    'Education',
  ];

  const getSectorIcon = (sector) => {
    const icons = {
      'Intelligence Artificielle': '🤖',
      'Fintech': '💰',
      'E-commerce': '🛍️',
      'Tourisme': '✈️',
      'Santé': '🏥',
      'Education': '📚',
    };
    return icons[sector] || '🚀';
  };

  const getSectorCount = (sector) => {
    return startups.filter(s => s.sector === sector).length;
  };

  const canCreateStartup = user?.role === 'startup' || user?.role === 'admin';

  if (loading && startups.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Bienvenue sur Maroc Digital Hub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              L'écosystème numérique qui connecte startups, investisseurs et innovateurs au Maroc
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une startup, un secteur..."
                  value={searchTerm}
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                  className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg"
                />
              </div>
              
              {canCreateStartup && (
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-xl transition whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  <span>Publier ma startup</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trending Sectors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <TrendingUp className="w-7 h-7 text-purple-600" />
              <span>Secteurs en Tendance</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectors.filter(s => s !== 'Tous').map((sector) => (
              <button
                key={sector}
                onClick={() => dispatch(setSelectedSector(sector))}
                className={`p-4 rounded-xl text-center transition transform hover:scale-105 ${
                  selectedSector === sector
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-3xl mb-2">{getSectorIcon(sector)}</div>
                <div className="text-xs font-semibold line-clamp-2">{sector}</div>
                <div className="text-xs mt-1 opacity-75">
                  {getSectorCount(sector)} startups
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Startup */}
      {featuredStartup && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:flex items-center">
              <div className="flex-1 text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="w-6 h-6" />
                  <span className="font-bold text-lg">Startup du Mois</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{featuredStartup.name}</h3>
                <p className="text-lg mb-4 leading-relaxed">{featuredStartup.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{featuredStartup.location}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>{featuredStartup.employees} employés</span>
                  </span>
                  <span className="text-4xl">{featuredStartup.logo}</span>
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:ml-8">
                <img
                  src={featuredStartup.image}
                  alt={featuredStartup.name}
                  className="w-full md:w-80 h-64 object-cover rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Startups Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedSector === 'Tous' ? 'Toutes les Startups' : `Startups - ${selectedSector}`}
          </h2>
          {selectedSector !== 'Tous' && (
            <button
              onClick={() => dispatch(setSelectedSector('Tous'))}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Voir tout
            </button>
          )}
        </div>

        {filteredStartups.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Aucune startup trouvée
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos filtres ou votre recherche
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Événements à Venir</h2>
            <a
              href="/events"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Voir tous les événements →
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="startup"
        title="Ajouter une Startup"
      />
    </div>
  );
};

export default HomePage;