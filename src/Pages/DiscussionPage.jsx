import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Plus } from 'lucide-react';
import { fetchDiscussions } from '../redux/slices/discussionsSlice';
import DiscussionCard from '../components/DiscussionCard';
import Modal from '../components/Modal';

const DiscussionsPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { items: discussions, loading } = useSelector((state) => state.discussions);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDiscussions());
  }, [dispatch]);

  if (loading && discussions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Chargement des discussions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
                <MessageSquare className="w-10 h-10 text-pink-600" />
                <span>Forum de Discussion</span>
              </h1>
              <p className="text-gray-600">
                Échangez avec la communauté, posez vos questions et partagez vos idées
              </p>
            </div>

            {user && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                <span>Nouveau sujet</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Total Discussions</p>
                <p className="text-3xl font-bold text-gray-800">{discussions.length}</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Startups Actives</p>
                <p className="text-3xl font-bold text-gray-800">
                  {discussions.filter(d => d.role === 'startup').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Investisseurs</p>
                <p className="text-3xl font-bold text-gray-800">
                  {discussions.filter(d => d.role === 'investisseur').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
            </div>
          </div>
        </div>

        {/* Guidelines Card */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <h3 className="font-bold text-lg mb-2">💡 Conseils pour une bonne discussion</h3>
          <ul className="space-y-1 text-sm text-purple-100">
            <li>• Soyez respectueux et professionnel</li>
            <li>• Posez des questions claires et précises</li>
            <li>• Partagez vos expériences et vos conseils</li>
            <li>• Restez constructif dans vos échanges</li>
          </ul>
        </div>

        {/* Discussions List */}
        {discussions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Aucune discussion pour le moment
            </h3>
            <p className="text-gray-500 mb-6">
              Soyez le premier à démarrer une conversation avec la communauté
            </p>
            {user && (
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition"
              >
                <Plus className="w-5 h-5" />
                <span>Créer une discussion</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {discussions.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
          </div>
        )}

        {!user && discussions.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 mb-4">
              Connectez-vous pour participer aux discussions
            </p>
            <a
              href="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition"
            >
              Se connecter
            </a>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="discussion"
        title="Nouvelle Discussion"
      />
    </div>
  );
};

export default DiscussionsPage;