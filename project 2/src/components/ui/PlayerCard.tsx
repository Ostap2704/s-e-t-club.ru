import React from 'react';
import { MapPin, Trophy, Users, Target } from 'lucide-react';
import { type Profile, type PlayerStats } from '../../lib/supabase';

interface PlayerCardProps {
  player: Profile;
  stats?: PlayerStats;
  onViewProfile?: () => void;
  onChallenge?: () => void;
  showActions?: boolean;
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  stats, 
  onViewProfile, 
  onChallenge,
  showActions = true,
  className = '' 
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Профессионал':
        return 'bg-purple-900/50 text-purple-400 border-purple-500/20';
      case 'Продвинутый':
        return 'bg-pink-900/50 text-pink-400 border-pink-500/20';
      case 'Средний':
        return 'bg-blue-900/50 text-blue-400 border-blue-500/20';
      default:
        return 'bg-gray-900/50 text-gray-400 border-gray-500/20';
    }
  };

  const winRate = stats?.matches_played 
    ? Math.round((stats.wins / stats.matches_played) * 100)
    : 0;

  return (
    <div className={`card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 ${className}`}>
      {stats?.ranking && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white text-center">
          <span className="text-sm font-medium">
            Ранг #{stats.ranking}
          </span>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          {player.profile_image ? (
            <img
              src={player.profile_image}
              alt={player.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-purple-500/20"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-purple-500/20">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold text-white">{player.name}</h3>
            {player.location && (
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{player.location}</span>
              </div>
            )}
          </div>
        </div>
        
        {stats && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 bg-gray-900/50 rounded border border-purple-500/20">
              <p className="text-xs text-gray-400">Матчи</p>
              <p className="font-medium text-purple-400">{stats.matches_played}</p>
            </div>
            <div className="text-center p-2 bg-gray-900/50 rounded border border-pink-500/20">
              <p className="text-xs text-gray-400">% побед</p>
              <p className="font-medium text-pink-400">{winRate}%</p>
            </div>
            <div className="text-center p-2 bg-gray-900/50 rounded border border-blue-500/20">
              <p className="text-xs text-gray-400">Очки</p>
              <p className="font-medium text-blue-400">{stats.points}</p>
            </div>
          </div>
        )}

        {player.level && (
          <div className="mb-4">
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded border ${getLevelColor(player.level)}`}>
              {player.level}
            </span>
          </div>
        )}

        {player.bio && (
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{player.bio}</p>
        )}
        
        {showActions && (
          <div className="flex space-x-2">
            <button 
              onClick={onViewProfile}
              className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 flex-1"
            >
              Профиль
            </button>
            <button 
              onClick={onChallenge}
              className="btn border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300 flex-1"
            >
              Вызвать
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;