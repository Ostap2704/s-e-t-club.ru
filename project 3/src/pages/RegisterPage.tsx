import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!name.trim()) {
      setError('Пожалуйста, введите ваше имя');
      return;
    }

    if (!email.trim()) {
      setError('Пожалуйста, введите email');
      return;
    }

    if (!password) {
      setError('Пожалуйста, введите пароль');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Пожалуйста, введите корректный email адрес');
      return;
    }

    setIsLoading(true);

    try {
      await register(name.trim(), email.trim(), password);
      
      setSuccess('Регистрация прошла успешно! Добро пожаловать в теннисную лигу!');
      
      // Wait a bit to show success message, then redirect
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
      
    } catch (err: any) {
      console.error('Registration error:', err);
      
      // Handle specific Supabase errors
      if (err.message?.includes('already registered') || err.message?.includes('User already registered')) {
        setError('Пользователь с таким email уже зарегистрирован. Попробуйте войти в систему.');
      } else if (err.message?.includes('invalid email')) {
        setError('Некорректный email адрес. Пожалуйста, проверьте правильность ввода.');
      } else if (err.message?.includes('weak password')) {
        setError('Слишком простой пароль. Используйте более сложный пароль.');
      } else {
        setError(err.message || 'Ошибка регистрации. Пожалуйста, попробуйте снова.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Создать аккаунт
          </h1>
          <p className="mt-2 text-gray-400">
            Присоединяйтесь к нашему теннисному сообществу
          </p>
        </div>

        {error && (
          <div className="bg-red-900/50 text-red-200 p-3 rounded-md flex items-start border border-red-500/20">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 text-green-200 p-3 rounded-md flex items-start border border-green-500/20">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-green-400" />
            <span>{success}</span>
          </div>
        )}

        <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="label text-gray-300">
                Полное имя *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input bg-gray-900/50 border-gray-700 text-gray-100 pl-10"
                  placeholder="Иван Иванов"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="label text-gray-300">
                Email *
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
                Пароль *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input bg-gray-900/50 border-gray-700 text-gray-100 pl-10"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Минимум 6 символов
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="label text-gray-300">
                Подтвердите пароль *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input bg-gray-900/50 border-gray-700 text-gray-100 pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 bg-gray-900 border-gray-700 rounded text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                Я согласен с{' '}
                <Link to="/rules" className="font-medium text-purple-400 hover:text-purple-300">
                  Правилами лиги
                </Link>{' '}
                и{' '}
                <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                  Политикой конфиденциальности
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 w-full py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Регистрация...
                </span>
              ) : (
                'Создать аккаунт'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
                Войти
              </Link>
            </p>
          </div>
        </div>

        {/* Registration Benefits */}
        <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Что вы получите:</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span>Участие в турнирах и мероприятиях</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span>Поиск партнеров для игры</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span>Отслеживание статистики и рейтинга</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span>Доступ к эксклюзивным мероприятиям</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;