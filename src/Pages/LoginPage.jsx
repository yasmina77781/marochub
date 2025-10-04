import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader } from 'lucide-react';
import { loginUser, registerUser, clearError } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'visiteur'
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      dispatch(loginUser({ 
        email: formData.email, 
        password: formData.password 
      }));
    } else {
      if (formData.password.length < 6) {
        toast.error('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
      dispatch(registerUser(formData));
    }
  };

  const testAccounts = [
    { email: 'admin@marocdigitalhub.ma', password: 'admin123', role: 'Admin' },
    { email: 'startup@example.com', password: 'startup123', role: 'Startup' },
    { email: 'investor@example.com', password: 'investor123', role: 'Investisseur' },
    { email: 'visitor@example.com', password: 'visitor123', role: 'Visiteur' }
  ];

  const quickLogin = (email, password) => {
    setFormData({ ...formData, email, password });
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden md:flex">
          {/* Left Side - Form */}
          <div className="md:w-1/2 p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Maroc Digital Hub
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rôle
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  >
                    <option value="visiteur">Visiteur</option>
                    <option value="startup">Startup</option>
                    <option value="investisseur">Investisseur</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Chargement...</span>
                  </>
                ) : (
                  <span>{isLogin ? 'Se connecter' : 'S\'inscrire'}</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                {isLogin ? 'Créer un compte' : 'Déjà inscrit ? Se connecter'}
              </button>
            </div>
          </div>

          {/* Right Side - Info & Quick Login */}
          <div className="md:w-1/2 bg-gradient-to-br from-purple-600 to-pink-600 p-8 sm:p-12 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Rejoignez l'écosystème
            </h3>
            <p className="mb-8 text-purple-100 leading-relaxed">
              Connectez-vous avec des startups innovantes, des investisseurs et des entrepreneurs au Maroc. 
              Participez aux événements, échangez des idées et développez votre réseau.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span>✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Découvrez des startups</h4>
                  <p className="text-sm text-purple-100">
                    Explorez les meilleures startups marocaines
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span>✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Participez aux événements</h4>
                  <p className="text-sm text-purple-100">
                    Networking et opportunités de collaboration
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span>✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Échangez avec la communauté</h4>
                  <p className="text-sm text-purple-100">
                    Forum de discussion actif
                  </p>
                </div>
              </div>
            </div>

            {isLogin && (
              <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                <h4 className="font-bold mb-4 text-center">Connexion Rapide (Test)</h4>
                <div className="space-y-2">
                  {testAccounts.map((account, index) => (
                    <button
                      key={index}
                      onClick={() => quickLogin(account.email, account.password)}
                      className="w-full text-left px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition flex items-center justify-between"
                    >
                      <span className="font-semibold text-amber-300">{account.role}</span>
                      <span className="text-xs opacity-75">Cliquez pour tester</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-center text-purple-200 mt-4">
                  Utilisez ces comptes pour tester la plateforme
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;