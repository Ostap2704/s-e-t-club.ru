import React, { useState, useEffect } from 'react';
import { Search, Medal, Trophy, Users, Filter, ChevronDown, ChevronUp, UserPlus, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, type Profile, type PlayerStats } from '../lib/supabase';

interface PlayerWithStats extends Profile {
  player_stats?: PlayerStats;
}

const LeaderboardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [players, setPlayers] = useState<PlayerWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      // Fetch real players from Supabase
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        setPlayers([]);
        return;
      }

      // Fetch player stats
      const { data: statsData, error: statsError } = await supabase
        .from('player_stats')
        .select('*')
        .order('points', { ascending: false });

      if (statsError) {
        console.error('Error fetching stats:', statsError);
      }

      // Combine profiles with stats
      const playersWithStats = (profilesData || []).map(profile => {
        const stats = (statsData || []).find(s => s.user_id === profile.id);
        return {
          ...profile,
          player_stats: stats
        };
      });

      // Filter out players with no matches played and sort by points
      const playersWithMatches = playersWithStats
        .filter(player => player.player_stats && player.player_stats.matches_played > 0)
        .sort((a, b) => {
          const aPoints = a.player_stats?.points || 0;
          const bPoints = b.player_stats?.points || 0;
          if (aPoints !== bPoints) return bPoints - aPoints;
          
          const aWins = a.player_stats?.wins || 0;
          const bWins = b.player_stats?.wins || 0;
          if (aWins !== bWins) return bWins - aWins;
          
          const aWinRate = a.player_stats?.matches_played ? (a.player_stats.wins / a.player_stats.matches_played) : 0;
          const bWinRate = b.player_stats?.matches_played ? (b.player_stats.wins / b.player_stats.matches_played) : 0;
          return bWinRate - aWinRate;
        });

      setPlayers(playersWithMatches);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter players based on search term and level filter
  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !filterLevel || player.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

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

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-400 text-gray-900';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-yellow-600 text-white';
    return 'bg-gray-800 text-gray-400 border border-gray-700';
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen py-8">
        <div className="container-custom">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Рейтинг игроков
          </h1>
          <p className="text-gray-400">
            Рейтинг лучших игроков нашей теннисной лиги
          </p>
        </div>

        {/* Top 3 players */}
        {filteredPlayers.length >= 3 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Second place */}
              <div className="md:order-1 mt-8 md:mt-12">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <Medal className="h-12 w-12 text-gray-400" />
                    </div>
                    {filteredPlayers[1].profile_image ? (
                      <img
                        src={filteredPlayers[1].profile_image}
                        alt={filteredPlayers[1].name}
                        className="h-28 w-28 rounded-full object-cover mx-auto border-4 border-gray-400"
                      />
                    ) : (
                      <div className="h-28 w-28 rounded-full bg-gray-700 flex items-center justify-center mx-auto border-4 border-gray-400">
                        <Users className="h-14 w-14 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold">
                      2
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-white">{filteredPlayers[1].name}</h3>
                    <p className="text-gray-400">{filteredPlayers[1].player_stats?.points} очков</p>
                  </div>
                </div>
              </div>

              {/* First place */}
              <div className="md:order-2">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <Trophy className="h-16 w-16 text-yellow-400" />
                    </div>
                    {filteredPlayers[0].profile_image ? (
                      <img
                        src={filteredPlayers[0].profile_image}
                        alt={filteredPlayers[0].name}
                        className="h-32 w-32 rounded-full object-cover mx-auto border-4 border-yellow-400"
                      />
                    ) : (
                      <div className="h-32 w-32 rounded-full bg-gray-700 flex items-center justify-center mx-auto border-4 border-yellow-400">
                        <Users className="h-16 w-16 text-yellow-400" />
                      </div>
                    )}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold">
                      1
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-white">{filteredPlayers[0].name}</h3>
                    <p className="text-gray-400">{filteredPlayers[0].player_stats?.points} очков</p>
                  </div>
                </div>
              </div>

              {/* Third place */}
              <div className="md:order-3 mt-8 md:mt-16">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <Medal className="h-12 w-12 text-yellow-600" />
                    </div>
                    {filteredPlayers[2].profile_image ? (
                      <img
                        src={filteredPlayers[2].profile_image}
                        alt={filteredPlayers[2].name}
                        className="h-24 w-24 rounded-full object-cover mx-auto border-4 border-yellow-600"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center mx-auto border-4 border-yellow-600">
                        <Users className="h-12 w-12 text-yellow-600" />
                      </div>
                    )}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold">
                      3
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white">{filteredPlayers[2].name}</h3>
                    <p className="text-gray-400">{filteredPlayers[2].player_stats?.points} очков</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and filters */}
        <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Поиск игрока по имени..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input bg-gray-900/50 border-gray-700 text-gray-100 pl-10"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              Фильтры
              {showFilters ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div>
                <label htmlFor="level-filter" className="label text-gray-300">Уровень игры</label>
                <select
                  id="level-filter"
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="input bg-gray-900/50 border-gray-700 text-gray-100 max-w-xs"
                >
                  <option value="">Все уровни</option>
                  <option value="Начинающий">Начинающий</option>
                  <option value="Средний">Средний</option>
                  <option value="Продвинутый">Продвинутый</option>
                  <option value="Профессионал">Профессионал</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Leaderboard table */}
        {filteredPlayers.length > 0 ? (
          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center">
              <Users className="h-6 w-6 mr-2 text-white" />
              <h2 className="text-xl font-semibold text-white">Полный рейтинг</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-900/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ранг</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Игрок</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Уровень</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">В/П</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">% побед</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Очки</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredPlayers.map((player, index) => {
                    const rank = index + 1;
                    const winRate = player.player_stats?.matches_played 
                      ? Math.round((player.player_stats.wins / player.player_stats.matches_played) * 100)
                      : 0;
                    
                    return (
                      <tr key={player.id} className="hover:bg-gray-800/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`flex items-center justify-center h-8 w-8 rounded-full font-bold ${getRankColor(rank)}`}>
                              {rank}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {player.profile_image ? (
                                <img
                                  className="h-10 w-10 rounded-full object-cover border border-gray-700"
                                  src={player.profile_image}
                                  alt={player.name}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center border border-gray-700">
                                  <Users className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{player.name}</div>
                              {player.location && (
                                <div className="text-xs text-gray-400 flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {player.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getLevelColor(player.level || 'Начинающий')}`}>
                            {player.level || 'Начинающий'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {player.player_stats?.wins || 0}-{player.player_stats?.losses || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {winRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-400">
                          {player.player_stats?.points || 1000}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-yellow-500/10 rounded-full">
                <Trophy className="h-16 w-16 text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              {players.length === 0 ? 'Рейтинг пока пуст' : 'Игроки не найдены'}
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              {players.length === 0 
                ? 'Станьте первым в рейтинге нашей лиги! Зарегистрируйтесь, участвуйте в турнирах и матчах, чтобы заработать очки и подняться в рейтинге.'
                : 'Попробуйте изменить критерии поиска или сбросить фильтры.'
              }
            </p>
            
            {players.length === 0 ? (
              !isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/register" 
                    className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 flex items-center justify-center"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Присоединиться к лиге
                  </a>
                  <a 
                    href="/tournaments" 
                    className="btn border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all duration-300"
                  >
                    <Trophy className="h-5 w-5 mr-2" />
                    Посмотреть турниры
                  </a>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-green-400 mb-4">Участвуйте в турнирах, чтобы попасть в рейтинг!</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/tournaments" 
                      className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300"
                    >
                      Найти турниры
                    </a>
                    <a 
                      href="/profile" 
                      className="btn border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300"
                    >
                      Мой профиль
                    </a>
                  </div>
                </div>
              )
            ) : (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterLevel('');
                }}
                className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        )}

        {/* How ranking works */}
        {players.length === 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-yellow-500/20 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-yellow-500/10 rounded-full">
                  <Trophy className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Участвуйте в турнирах</h3>
              <p className="text-gray-400">
                Зарабатывайте очки, участвуя в официальных турнирах лиги
              </p>
            </div>

            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-500/10 rounded-full">
                  <Medal className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Играйте матчи</h3>
              <p className="text-gray-400">
                Каждая победа в официальном матче приносит очки рейтинга
              </p>
            </div>

            <div className="card bg-gray-800/30 backdrop-blur-sm border border-blue-500/20 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-500/10 rounded-full">
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Поднимайтесь в рейтинге</h3>
              <p className="text-gray-400">
                Соревнуйтесь с игроками своего уровня и выше для роста рейтинга
              </p>
            </div>
          </div>
        )}

        {/* League info */}
        <div className="mt-8 card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Как работает рейтинговая система</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-purple-400">Как рассчитываются очки</h4>
              <p className="text-gray-400">
                Очки лиги рассчитываются на основе побед в матчах, результатов турниров и уровня соперников. 
                Каждая победа в матче приносит 10 базовых очков, с дополнительными очками за победу над более высокорейтинговыми соперниками.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-purple-400">Обновление рейтинга</h4>
              <p className="text-gray-400">
                Рейтинг обновляется еженедельно каждое воскресенье в полночь. Все матчи, представленные и проверенные до этого времени, будут включены в расчет рейтинга.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-purple-400">Награды сезона</h4>
              <p className="text-gray-400">
                В конце каждого сезона (3 месяца) топ-3 игрока получают награды и призы. Кроме того, будет отмечен самый прогрессирующий игрок (наибольший рост в рейтинге).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;