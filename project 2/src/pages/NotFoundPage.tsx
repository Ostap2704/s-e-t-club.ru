import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text animate-glow">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-white">Страница не найдена</h2>
        <p className="mt-2 text-xl text-gray-400">
          Страница, которую вы ищете, не существует или была перемещена.
        </p>
        <div className="mt-8">
          <Link 
            to="/" 
            className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 inline-flex items-center"
          >
            <Home className="mr-2 h-5 w-5" />
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;