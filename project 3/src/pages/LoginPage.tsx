import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/profile');
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle specific Supabase error codes
      if (err?.message?.includes('email_not_confirmed') || err?.message?.includes('Email not confirmed')) {
        setError('Пожалуйста, подтвердите свой email адрес. Проверьте почту (включая папку "Спам") и перейдите по ссылке подтверждения.');
      } else if (err?.message?.includes('invalid_credentials') || err?.message?.includes('Invalid login credentials')) {
        setError('Неверный email или пароль. Пожалуйста, проверьте введенные данные и попробуйте снова.');
      } else if (err?.message?.includes('Email not confirmed')) {
        setError('Пожалуйста, подтвердите свой email адрес. Проверьте почту и перейдите по ссылке подтверждения.');
      } else {
        // Generic error message for other cases
        setError(err?.message || 'Произошла ошибка при входе. Пожалуйста, попробуйте снова.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorIcon = () => {
    if (error.includes('подтвердите свой email')) {
      return <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-blue-400" />;
    }
    return <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-red-400" />;
  };

  const getErrorStyles = () => {
    if (error.includes('подтвердите свой email')) {
      return 'bg-blue-900/50 text-blue-200 border border-blue-500/20';
    }
    return 'bg-red-900/50 text-red-200 border border-red-500/20';
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Войти в аккаунт
          </h1>
          <p className="mt-2 text-gray-400">
            Введите свои данные для входа
          </p>
        </div>

        {error && (
          <div className={`p-3 rounded-md flex items-start ${getErrorStyles()}`}>
            {getErrorIcon()}
            <span>{error}</span>
          </div>
        )}

        <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="label text-gray-300">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input bg-gray-900/50 border-gray-700 text-gray-100 pl-10"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label text-gray-300">
                Пароль
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input bg-gray-900/50 border-gray-700 text-gray-100 pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-900 border-gray-700 rounded text-purple-500 focus:ring-purple-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Запомнить меня
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                  Забыли пароль?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 w-full py-3 flex items-center justify-center"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Загрузка...
                </span>
              ) : (
                'Войти'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Нет аккаунта?{' '}
              <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;