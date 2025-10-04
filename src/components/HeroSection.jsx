import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
export default function HeroSection({ currentUser, setShowModal, setModalType }) {
    // const [currentUser, setCurrentUser] = useState(() => {
    //     const saved = localStorage.getItem('currentUser');
    //     return saved ? JSON.parse(saved) : null;
    //   });
       const [searchTerm, setSearchTerm] = useState('');
    //    const [showModal, setShowModal] = useState(false);
      return(
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
 <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Bienvenue sur Maroc Digital Hub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              L'écosystème numérique qui connecte startups, investisseurs et innovateurs au Maroc
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une startup, un secteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              {(currentUser?.role === 'startup' || currentUser?.role === 'admin') && (
                <button
                  onClick={() => { setModalType('addStartup'); setShowModal(true); }}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-xl transition"
                >
                  <Plus className="w-5 h-5" />
                  <span>Publier ma startup</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
     ) 
 }