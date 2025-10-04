import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { LogOut, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setShowMobileMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`${
        isActive(to) ? 'text-purple-600 font-semibold' : 'text-gray-600'
      } hover:text-purple-600 transition relative`}
    >
      {children}
      {isActive(to) && (
        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-purple-600"></span>
      )}
    </Link>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Maroc Digital Hub
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/events">Événements</NavLink>
            <NavLink to="/discussions">Discussions</NavLink>
            {user && <NavLink to="/my-events">Mes Événements</NavLink>}
            {user?.role === 'admin' && <NavLink to="/dashboard">Dashboard</NavLink>}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-600">Bonjour, </span>
                  <span className="font-semibold text-gray-800">{user.name}</span>
                  <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2"
          >
            {showMobileMenu ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              to="/"
              onClick={() => setShowMobileMenu(false)}
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Accueil
            </Link>
            <Link
              to="/events"
              onClick={() => setShowMobileMenu(false)}
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Événements
            </Link>
            <Link
              to="/discussions"
              onClick={() => setShowMobileMenu(false)}
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Discussions
            </Link>
            {user && (
              <>
                <Link
                  to="/my-events"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Mes Événements
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/dashboard"
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Dashboard
                  </Link>
                )}
              </>
            )}
            <div className="px-4 pt-4 border-t">
              {user ? (
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Connecté en tant que <span className="font-semibold">{user.name}</span>
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="block w-full text-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full"
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;