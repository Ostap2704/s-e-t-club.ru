import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, UserPlus, Users, MapPin, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, type Profile, type PlayerStats } from '../lib/supabase';

interface PlayerWithStats extends Profile {
  player_stats?: PlayerStats;
}

const PlayersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [players, setPlayers] = useState<PlayerWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      // Fetch real players from Supabase
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        setPlayers([]);
        return;
      }

      // Fetch player stats
      const { data: statsData, error: statsError } = await supabase
        .from('player_stats')
        .select('*');

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

      setPlayers(playersWithStats);
    } catch (error) {
      console.error('Error fetching players:', error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter players based on search term and level filter
  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (player.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !filterLevel || player.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  // Sort players
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'level') {
      const levelOrder = ['Начинающий', 'Средний', 'Продвинутый', 'Профессионал'];
      const aIndex = levelOrder.indexOf(a.level || 'Начинающий');
      const bIndex = levelOrder.indexOf(b.level || 'Начинающий');
      return sortOrder === 'asc' ? aIndex - bIndex : bIndex - aIndex;
    } else if (sortBy === 'joinDate') {
      return sortOrder === 'asc' 
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return 0;
  });

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

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
            Игроки
          </h1>
          <p className="text-gray-400">
            Найдите и познакомьтесь с теннисистами в вашем сообществе
          </p>
        </div>

        {/* Search and filters */}
        <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Поиск игроков по имени или городу..."
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
            <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="level-filter" className="label text-gray-300">Уровень игры</label>
                <select
                  id="level-filter"
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="input bg-gray-900/50 border-gray-700 text-gray-100"
                >
                  <option value="">Все уровни</option>
                  <option value="Начинающий">Начинающий</option>
                  <option value="Средний">Средний</option>
                  <option value="Продвинутый">Продвинутый</option>
                  <option value="Профессионал">Профессионал</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sort-by" className="label text-gray-300">Сортировать по</label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="input bg-gray-900/50 border-gray-700 text-gray-100"
                >
                  <option value="name">Имени</option>
                  <option value="level">Уровню</option>
                  <option value="joinDate">Дате регистрации</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sort-order" className="label text-gray-300">Порядок сортировки</label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="input bg-gray-900/50 border-gray-700 text-gray-100"
                >
                  <option value="asc">По возрастанию</option>
                  <option value="desc">По убыванию</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Players grid */}
        {sortedPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPlayers.map((player) => (
              <div key={player.id} className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white text-center">
                  <span className="text-sm font-medium">
                    {player.player_stats?.ranking ? `Ранг #${player.player_stats.ranking}` : 'Новый игрок'}
                  </span>
                </div>
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
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-gray-900/50 rounded border border-purple-500/20">
                      <p className="text-xs text-gray-400">Уровень</p>
                      <p className="font-medium text-purple-400">{player.level || 'Начинающий'}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded border border-pink-500/20">
                      <p className="text-xs text-gray-400">Матчи</p>
                      <p className="font-medium text-pink-400">{player.player_stats?.matches_played || 0}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded border border-blue-500/20">
                      <p className="text-xs text-gray-400">Очки</p>
                      <p className="font-medium text-blue-400">{player.player_stats?.points || 1000}</p>
                    </div>
                  </div>

                  {player.level && (
                    <div className="mb-4">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded border ${getLevelColor(player.level)}`}>
                        {player.level}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <button className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 flex-1">
                      Профиль
                    </button>
                    <button className="btn border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300 flex-1">
                      Вызвать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-purple-500/10 rounded-full">
                <Users className="h-16 w-16 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              {players.length === 0 ? 'Пока нет зарегистрированных игроков' : 'Игроки не найдены'}
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              {players.length === 0 
                ? 'Станьте одним из первых участников нашего теннисного сообщества! Зарегистрируйтесь и начните играть с другими теннисистами.'
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
                    Зарегистрироваться
                  </a>
                  <a 
                    href="/login" 
                    className="btn border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300"
                  >
                    Войти в аккаунт
                  </a>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-green-400 mb-4">Вы уже зарегистрированы в лиге!</p>
                  <a 
                    href="/profile" 
                    className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300"
                  >
                    Перейти в профиль
                  </a>
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

        {/* Information about joining */}
        {players.length === 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-500/10 rounded-full">
                  <UserPlus className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Быстрая регистрация</h3>
              <p className="text-gray-400">
                Создайте профиль за несколько минут и начните играть с другими участниками лиги
              </p>
            </div>

            <div className="card bg-gray-800/30 backdrop-blur-sm border border-pink-500/20 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-pink-500/10 rounded-full">
                  <Users className="h-8 w-8 text-pink-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Найдите партнеров</h3>
              <p className="text-gray-400">
                Ищите игроков своего уровня для тренировок и дружеских матчей
              </p>
            </div>

            <div className="card bg-gray-800/30 backdrop-blur-sm border border-blue-500/20 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-500/10 rounded-full">
                  <Trophy className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Участвуйте в турнирах</h3>
              <p className="text-gray-400">
                Соревнуйтесь с другими игроками и поднимайтесь в рейтинге лиги
              </p>
            </div>
          </div>
        )}

        {/* Call to action */}
        {players.length === 0 && (
          <div className="mt-12 card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-white">Присоединяйтесь к нашему сообществу</h2>
                  <p className="text-gray-400 mb-6">
                    Станьте частью активного теннисного сообщества. Участвуйте в турнирах, 
                    находите партнеров для игры и совершенствуйте свои навыки вместе с нами.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-gray-300">Участие в турнирах и мероприятиях</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-gray-300">Поиск партнеров для игры</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-gray-300">Отслеживание прогресса и статистики</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-gray-300">Доступ к эксклюзивным мероприятиям</span>
                    </div>
                  </div>
                  {!isAuthenticated && (
                    <a 
                      href="/register" 
                      className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 inline-flex items-center"
                    >
                      <UserPlus className="h-5 w-5 mr-2" />
                      Зарегистрироваться сейчас
                    </a>
                  )}
                </div>
                <div className="flex justify-center">
                  <img 
                    src="https://images.pexels.com/photos/3856026/pexels-photo-3856026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Теннисист" 
                    className="h-64 w-64 object-cover rounded-lg border-2 border-purple-500/20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;