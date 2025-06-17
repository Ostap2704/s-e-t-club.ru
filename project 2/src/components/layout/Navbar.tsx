import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { config } from '../../lib/config';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, profile, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // Close the profile menu immediately
      setIsProfileMenuOpen(false);
      setIsMenuOpen(false);
      
      // Perform logout
      await logout();
      
      // Navigate to home page
      navigate('/', { replace: true });
      
      console.log('Logout successful, redirected to home');
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, still redirect to home
      navigate('/', { replace: true });
    }
  };

  const activeClass = "text-tennis-green-500 font-medium";
  const inactiveClass = "text-gray-300 hover:text-tennis-green-500 transition-colors";

  return (
    <header className="bg-black shadow-sm sticky top-0 z-50">
      <div className="container-custom py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/Text logo copy.png" alt={config.app.name} className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" 
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
              end
            >
              Главная
            </NavLink>
            <NavLink to="/players" 
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              Игроки
            </NavLink>
            <NavLink to="/tournaments" 
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              Турниры
            </NavLink>
            <NavLink to="/streams" 
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              Трансляции
            </NavLink>
            <NavLink to="/photos" 
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              Фото
            </NavLink>
            <NavLink to="/leaderboard" 
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              Рейтинг
            </NavLink>
          </nav>

          {/* Auth Buttons or Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/festival" className="btn-neon-purple">
              <span>ТЕННИСНЫЙ ФЕСТИВАЛЬ</span>
            </Link>
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 text-gray-300 hover:text-tennis-green-500 transition-colors"
                >
                  <span>{profile?.name || user?.email}</span>
                  {profile?.profile_image ? (
                    <img 
                      src={profile.profile_image} 
                      alt={profile.name} 
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 p-1 rounded-full border border-gray-600" />
                  )}
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 scale-in z-50">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 inline mr-2" />
                      Профиль
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="btn-outline text-gray-300 border-gray-300 hover:bg-gray-800">
                  Войти
                </Link>
                <Link to="/register" className="btn-primary">
                  Регистрация
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 fadeIn">
            <nav className="flex flex-col space-y-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
                onClick={toggleMenu}
                end
              >
                Главная
              </NavLink>
              <NavLink 
                to="/players" 
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
                onClick={toggleMenu}
              >
                Игроки
              </NavLink>
              <NavLink 
                to="/tournaments" 
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
                onClick={toggleMenu}
              >
                Турниры
              </NavLink>
              <NavLink 
                to="/streams" 
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
                onClick={toggleMenu}
              >
                Трансляции
              </NavLink>
              <NavLink 
                to="/photos" 
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
                onClick={toggleMenu}
              >
                Фото
              </NavLink>
              <NavLink 
                to="/leaderboard" 
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
                onClick={toggleMenu}
              >
                Рейтинг
              </NavLink>
              <Link 
                to="/festival" 
                className="btn-neon-purple"
                onClick={toggleMenu}
              >
                <span>ТЕННИСНЫЙ ФЕСТИВАЛЬ</span>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <NavLink 
                    to="/profile" 
                    className={({ isActive }) => isActive ? activeClass : inactiveClass}
                    onClick={toggleMenu}
                  >
                    <User className="h-5 w-5 inline mr-2" />
                    Профиль
                  </NavLink>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-gray-300 hover:text-red-400 transition-colors text-left"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Выйти
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link 
                    to="/login" 
                    className="btn-outline text-gray-300 border-gray-300 hover:bg-gray-800 text-center"
                    onClick={toggleMenu}
                  >
                    Войти
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn-primary text-center"
                    onClick={toggleMenu}
                  >
                    Регистрация
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;