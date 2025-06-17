import React from 'react';
import { Calendar, MapPin, Users, Clock, Trophy } from 'lucide-react';
import { type Tournament } from '../../lib/supabase';

interface TournamentCardProps {
  tournament: Tournament;
  registrationsCount?: number;
  isRegistered?: boolean;
  onRegister?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ 
  tournament, 
  registrationsCount = 0,
  isRegistered = false,
  onRegister, 
  onViewDetails,
  className = '' 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Открыт':
        return 'bg-green-900/50 text-green-400 border-green-500/20';
      case 'Скоро':
        return 'bg-yellow-900/50 text-yellow-400 border-yellow-500/20';
      case 'Закрыт':
        return 'bg-red-900/50 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-900/50 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className={`card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 ${className}`}>
      <img 
        src={tournament.image_url || 'https://images.pexels.com/photos/6956427/pexels-photo-6956427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
        alt={tournament.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded border ${getStatusColor(tournament.status)}`}>
            {tournament.status}
          </span>
          <span className="text-sm text-gray-400">
            {tournament.format}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-white">{tournament.name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{tournament.location}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">Регистрация до {formatDate(tournament.registration_deadline)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-400">
              {registrationsCount}/{tournament.max_participants} участников
            </span>
          </div>
          <div className="flex items-center">
            <Trophy className="h-4 w-4 mr-1 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">{tournament.prize_pool}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tournament.skill_levels.map((level, index) => (
            <span 
              key={index} 
              className="inline-block px-2 py-1 bg-gray-900/50 text-gray-300 text-xs rounded border border-gray-700"
            >
              {level}
            </span>
          ))}
        </div>

        {tournament.description && (
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{tournament.description}</p>
        )}
        
        <div className="flex space-x-2">
          <button 
            onClick={onRegister}
            disabled={isRegistered || tournament.status !== 'Открыт'}
            className={`flex-1 py-2 rounded-md font-medium transition-all duration-300 ${
              isRegistered 
                ? 'bg-green-600 text-white cursor-not-allowed' 
                : tournament.status === 'Открыт'
                ? 'btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                : 'bg-gray-900/50 text-gray-500 border border-gray-700 cursor-not-allowed'
            }`}
          >
            {isRegistered ? 'Зарегистрирован' : 
             tournament.status === 'Открыт' ? 'Регистрация' : 'Скоро'}
          </button>
          {onViewDetails && (
            <button 
              onClick={onViewDetails}
              className="btn border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300 px-4"
            >
              Подробнее
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;