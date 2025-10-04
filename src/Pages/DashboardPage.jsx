import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BarChart3, TrendingUp, Calendar, Users, MessageSquare } from 'lucide-react';
import { fetchStartups } from '../redux/slices/startupsSlice';
import { fetchEvents } from '../redux/slices/eventsSlice';
import { fetchDiscussions } from '../redux/slices/discussionsSlice';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);
  const { items: startups } = useSelector((state) => state.startups);
  const { items: events } = useSelector((state) => state.events);
  const { items: discussions } = useSelector((state) => state.discussions);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    dispatch(fetchStartups());
    dispatch(fetchEvents());
    dispatch(fetchDiscussions());
  }, [dispatch, user, navigate]);

  const sectors = [
    'Intelligence Artificielle',
    'Fintech',
    'E-commerce',
    'Tourisme',
    'Santé',
    'Education',
  ];

  const totalParticipants = events.reduce((sum, event) => sum + (event.participants?.length || 0), 0);

  const sectorStats = sectors.map(sector => ({
    sector,
    count: startups.filter(s => s.sector === sector).length,
    percentage: startups.length > 0 ? ((startups.filter(s => s.sector === sector).length / startups.length) * 100).toFixed(1) : 0
  })).sort((a, b) => b.count - a.count);

  const recentStartups = [...startups]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const upcomingEvents = [...events]
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <BarChart3 className="w-10 h-10 text-indigo-600" />
            <span>Tableau de Bord Administrateur</span>
          </h1>
          <p className="text-gray-600">
            Vue d'ensemble de la plateforme Maroc Digital Hub
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-blue-200" />
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            <p className="text-blue-100 text-sm mb-1">Total Startups</p>
            <p className="text-4xl font-bold">{startups.length}</p>
            <p className="text-blue-100 text-xs mt-2">
              +{recentStartups.length} ce mois
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-purple-200" />
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
            </div>
            <p className="text-purple-100 text-sm mb-1">Événements</p>
            <p className="text-4xl font-bold">{events.length}</p>
            <p className="text-purple-100 text-xs mt-2">
              {upcomingEvents.length} à venir
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-pink-200" />
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <p className="text-pink-100 text-sm mb-1">Participants</p>
            <p className="text-4xl font-bold">{totalParticipants}</p>
            <p className="text-pink-100 text-xs mt-2">
              Aux événements
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-8 h-8 text-green-200" />
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
            </div>
            <p className="text-green-100 text-sm mb-1">Discussions</p>
            <p className="text-4xl font-bold">{discussions.length}</p>
            <p className="text-green-100 text-xs mt-2">
              Dans le forum
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sector Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              <span>Répartition par Secteur</span>
            </h2>
            <div className="space-y-4">
              {sectorStats.map((stat, index) => (
                <div key={stat.sector}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {stat.sector}
                    </span>
                    <span className="text-sm font-bold text-purple-600">
                      {stat.count} ({stat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${stat.percentage}%`,
                        background: `linear-gradient(to right, ${
                          index === 0 ? '#8b5cf6, #ec4899' :
                          index === 1 ? '#06b6d4, #3b82f6' :
                          index === 2 ? '#10b981, #059669' :
                          index === 3 ? '#f59e0b, #f97316' :
                          index === 4 ? '#ef4444, #dc2626' :
                          '#6366f1, #8b5cf6'
                        })`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Startups */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <span>Startups Récentes</span>
            </h2>
            <div className="space-y-4">
              {recentStartups.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucune startup récente</p>
              ) : (
                recentStartups.map((startup) => (
                  <div
                    key={startup.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="text-3xl">{startup.logo}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 truncate">
                        {startup.name}
                      </h3>
                      <p className="text-sm text-gray-500">{startup.sector}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{startup.location}</p>
                      <p className="text-xs font-semibold text-purple-600">
                        {startup.employees} employés
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Events with Participants */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-purple-600" />
              <span>Événements à Venir</span>
            </h2>
            <div className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucun événement à venir</p>
              ) : (
                upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 truncate mb-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full font-bold ml-4">
                      <Users className="w-5 h-5" />
                      <span>{event.participants?.length || 0}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Discussion Activity */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-pink-600" />
              <span>Activité des Discussions</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Par Startups</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {discussions.filter(d => d.role === 'startup').length}
                  </p>
                </div>
                <div className="text-4xl">🚀</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Par Investisseurs</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {discussions.filter(d => d.role === 'investisseur').length}
                  </p>
                </div>
                <div className="text-4xl">💼</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Par Visiteurs</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {discussions.filter(d => d.role === 'visiteur').length}
                  </p>
                </div>
                <div className="text-4xl">👤</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition"
            >
              <p className="font-semibold mb-1">Gérer les Startups</p>
              <p className="text-sm text-purple-100">Voir et modérer les startups</p>
            </button>
            <button
              onClick={() => navigate('/events')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition"
            >
              <p className="font-semibold mb-1">Gérer les Événements</p>
              <p className="text-sm text-purple-100">Créer et modérer les événements</p>
            </button>
            <button
              onClick={() => navigate('/discussions')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition"
            >
              <p className="font-semibold mb-1">Modérer le Forum</p>
              <p className="text-sm text-purple-100">Gérer les discussions</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;