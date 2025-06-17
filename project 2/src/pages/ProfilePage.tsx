import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, MapPin, Calendar, Award, Edit2, Save, ChevronDown, ChevronUp, Trophy, Target, TrendingUp, Phone } from 'lucide-react';
import { type PlayerStats, type Match } from '../lib/supabase';

interface MatchWithPlayers extends Match {
  player1: { name: string };
  player2: { name: string };
  winner?: { name: string };
}

const ProfilePage: React.FC = () => {
  const { user, profile, isLoading, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [showMatches, setShowMatches] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [recentMatches, setRecentMatches] = useState<MatchWithPlayers[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<MatchWithPlayers[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    location: profile?.location || '',
    bio: profile?.bio || '',
    phone: profile?.phone || '',
    level: profile?.level || 'Начинающий',
    favorite_shot: profile?.favorite_shot || '',
    play_style: profile?.play_style || '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        location: profile.location || '',
        bio: profile.bio || '',
        phone: profile.phone || '',
        level: profile.level || 'Начинающий',
        favorite_shot: profile.favorite_shot || '',
        play_style: profile.play_style || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchPlayerStats();
      fetchMatches();
    }
  }, [user]);

  const fetchPlayerStats = async () => {
    // Mock player stats - in a real app this would come from the API
    const mockStats: PlayerStats = {
      id: '1',
      user_id: user?.id || '',
      matches_played: 15,
      wins: 10,
      losses: 5,
      ranking: 1,
      points: 1250,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setPlayerStats(mockStats);
  };

  const fetchMatches = async () => {
    // Mock matches data - in a real app this would come from the API
    const mockRecentMatches: MatchWithPlayers[] = [
      {
        id: '1',
        tournament_id: '1',
        player1_id: user?.id || '',
        player2_id: '2',
        winner_id: user?.id,
        score: '6-4, 6-2',
        match_date: '2025-06-10T14:00:00Z',
        status: 'completed',
        created_at: '2025-06-01T00:00:00Z',
        player1: { name: profile?.name || 'Вы' },
        player2: { name: 'Мария Иванова' },
        winner: { name: profile?.name || 'Вы' }
      }
    ];

    const mockUpcomingMatches: MatchWithPlayers[] = [
      {
        id: '2',
        tournament_id: '1',
        player1_id: user?.id || '',
        player2_id: '3',
        match_date: '2025-06-20T16:00:00Z',
        status: 'scheduled',
        created_at: '2025-06-01T00:00:00Z',
        player1: { name: profile?.name || 'Вы' },
        player2: { name: 'Дмитрий Козлов' },
        score: ''
      }
    ];

    setRecentMatches(mockRecentMatches);
    setUpcomingMatches(mockUpcomingMatches);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Ошибка при обновлении профиля');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getMatchResult = (match: MatchWithPlayers) => {
    if (!match.winner_id) return 'Не завершен';
    return match.winner_id === user?.id ? 'Победа' : 'Поражение';
  };

  const getOpponentName = (match: MatchWithPlayers) => {
    if (!user) return '';
    return match.player1_id === user.id ? match.player2.name : match.player1.name;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen py-8">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Ошибка загрузки</h1>
            <p className="text-gray-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show no profile state
  if (!profile) {
    return (
      <div className="bg-gray-900 min-h-screen py-8">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Профиль не найден</h1>
            <p className="text-gray-400 mb-4">
              Ваш профиль не был найден. Попробуйте войти снова.
            </p>
            <button 
              onClick={() => window.location.href = '/login'} 
              className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300"
            >
              Войти снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="relative mb-12 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-[url('/photo_2025-06-03%2018.48.01.jpeg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent"></div>
          
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                {profile.profile_image ? (
                  <img 
                    src={profile.profile_image} 
                    alt={profile.name} 
                    className="h-32 w-32 rounded-full object-cover border-4 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-gray-800/50 backdrop-blur-sm border-4 border-purple-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                    <User className="h-16 w-16 text-purple-400" />
                  </div>
                )}
                {playerStats && playerStats.ranking > 0 && (
                  <div className="absolute -bottom-2 -right-2 bg-purple-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-sm font-bold border-2 border-gray-900">
                    #{playerStats.ranking}
                  </div>
                )}
              </div>
              
              <div className="text-center md:text-left flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{profile.name}</h1>
                <p className="text-xl text-purple-200 mb-4">{profile.level} • {profile.location}</p>
                <p className="text-gray-300 max-w-2xl">{profile.bio}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400">{playerStats?.wins || 0}</div>
                    <div className="text-sm text-gray-300">Побед</div>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-pink-500/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-pink-400">{playerStats?.losses || 0}</div>
                    <div className="text-sm text-gray-300">Поражений</div>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-cyan-400">
                      {playerStats?.matches_played ? Math.round((playerStats.wins / playerStats.matches_played) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-300">Процент побед</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => setIsEditing(!isEditing)} 
                  className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 flex items-center"
                >
                  {isEditing ? <Save className="h-5 w-5 mr-2" /> : <Edit2 className="h-5 w-5 mr-2" />}
                  {isEditing ? 'Сохранить' : 'Редактировать'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Profile info */}
          <div className="lg:col-span-1">
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 mb-6">
              <div className="flex items-center mb-4">
                <User className="h-6 w-6 text-purple-400 mr-2" />
                <h2 className="text-xl font-semibold text-white">Информация о профиле</h2>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="label text-gray-300">Полное имя</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input bg-gray-900/50 border-gray-700 text-gray-100"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="label text-gray-300">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input bg-gray-900/50 border-gray-700 text-gray-100"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Email нельзя изменить</p>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="label text-gray-300">Телефон</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input bg-gray-900/50 border-gray-700 text-gray-100"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="label text-gray-300">Местоположение</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="input bg-gray-900/50 border-gray-700 text-gray-100"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="label text-gray-300">О себе</label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="input bg-gray-900/50 border-gray-700 text-gray-100"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="level" className="label text-gray-300">Уровень игры</label>
                      <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="input bg-gray-900/50 border-gray-700 text-gray-100"
                      >
                        <option value="Начинающий">Начинающий</option>
                        <option value="Средний">Средний</option>
                        <option value="Продвинутый">Продвинутый</option>
                        <option value="Профессионал">Профессионал</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="favorite_shot" className="label text-gray-300">Любимый удар</label>
                      <input
                        type="text"
                        id="favorite_shot"
                        name="favorite_shot"
                        value={formData.favorite_shot}
                        onChange={handleInputChange}
                        className="input bg-gray-900/50 border-gray-700 text-gray-100"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="play_style" className="label text-gray-300">Стиль игры</label>
                      <input
                        type="text"
                        id="play_style"
                        name="play_style"
                        value={formData.play_style}
                        onChange={handleInputChange}
                        className="input bg-gray-900/50 border-gray-700 text-gray-100"
                      />
                    </div>
                    
                    <div className="flex space-x-4 pt-2">
                      <button type="submit" className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
                        Сохранить изменения
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsEditing(false)} 
                        className="btn border border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white transition-all duration-300"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-purple-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Имя</p>
                      <p className="font-medium text-white">{profile.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-purple-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-medium text-white">{profile.email}</p>
                    </div>
                  </div>

                  {profile.phone && (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-purple-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Телефон</p>
                        <p className="font-medium text-white">{profile.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {profile.location && (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-purple-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Местоположение</p>
                        <p className="font-medium text-white">{profile.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {profile.bio && (
                    <div>
                      <p className="text-sm text-gray-400 mb-1">О себе</p>
                      <p className="text-gray-300">{profile.bio}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-purple-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Уровень игры</p>
                      <p className="font-medium text-white">{profile.level}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats Card */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6">
              <div className="flex items-center mb-4">
                <Trophy className="h-6 w-6 text-yellow-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Достижения</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Рейтинг в лиге</span>
                  <span className="font-medium text-yellow-400">
                    {playerStats?.ranking ? `#${playerStats.ranking}` : 'Не в рейтинге'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Участник с</span>
                  <span className="font-medium text-white">{formatDate(profile.created_at)}</span>
                </div>
                {profile.favorite_shot && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Любимый удар</span>
                    <span className="font-medium text-white">{profile.favorite_shot}</span>
                  </div>
                )}
                {profile.play_style && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Стиль игры</span>
                    <span className="font-medium text-white">{profile.play_style}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column: Stats and matches */}
          <div className="lg:col-span-2 space-y-6">
            {/* Player Stats */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex justify-between items-center cursor-pointer"
                onClick={() => setShowStats(!showStats)}
              >
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  <h2 className="text-xl font-semibold">Статистика игрока</h2>
                </div>
                {showStats ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
              
              {showStats && (
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-purple-500/20">
                      <p className="text-gray-400 text-sm">Матчей сыграно</p>
                      <p className="text-3xl font-bold text-purple-400">{playerStats?.matches_played || 0}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-green-500/20">
                      <p className="text-gray-400 text-sm">Побед</p>
                      <p className="text-3xl font-bold text-green-400">{playerStats?.wins || 0}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-red-500/20">
                      <p className="text-gray-400 text-sm">Поражений</p>
                      <p className="text-3xl font-bold text-red-400">{playerStats?.losses || 0}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-yellow-500/20">
                      <p className="text-gray-400 text-sm">Очки рейтинга</p>
                      <p className="text-3xl font-bold text-yellow-400">{playerStats?.points || 1000}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/20">
                      <h3 className="font-semibold mb-3 text-purple-400">Информация о лиге</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Текущий рейтинг</span>
                          <span className="font-medium text-white">
                            {playerStats?.ranking ? `#${playerStats.ranking}` : 'Не в рейтинге'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Участник с</span>
                          <span className="font-medium text-white">{formatDate(profile.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-pink-500/20">
                      <h3 className="font-semibold mb-3 text-pink-400">Стиль игры</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Любимый удар</span>
                          <span className="font-medium text-white">{profile.favorite_shot || 'Не указан'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Стиль игры</span>
                          <span className="font-medium text-white">{profile.play_style || 'Не указан'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Recent Matches */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 flex justify-between items-center cursor-pointer"
                onClick={() => setShowMatches(!showMatches)}
              >
                <div className="flex items-center">
                  <Target className="h-6 w-6 mr-2" />
                  <h2 className="text-xl font-semibold">Последние матчи</h2>
                </div>
                {showMatches ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
              
              {showMatches && (
                <div className="p-6">
                  {recentMatches.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left pb-3 font-semibold text-gray-300">Соперник</th>
                            <th className="text-left pb-3 font-semibold text-gray-300">Результат</th>
                            <th className="text-left pb-3 font-semibold text-gray-300">Счет</th>
                            <th className="text-left pb-3 font-semibold text-gray-300">Дата</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentMatches.map((match) => (
                            <tr key={match.id} className="border-b border-gray-800 last:border-0">
                              <td className="py-3 text-white">{getOpponentName(match)}</td>
                              <td className="py-3">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                  getMatchResult(match) === 'Победа' 
                                    ? 'bg-green-900/50 text-green-400 border border-green-500/20' 
                                    : getMatchResult(match) === 'Поражение'
                                    ? 'bg-red-900/50 text-red-400 border border-red-500/20'
                                    : 'bg-gray-900/50 text-gray-400 border border-gray-500/20'
                                }`}>
                                  {getMatchResult(match)}
                                </span>
                              </td>
                              <td className="py-3 text-gray-300">{match.score || 'Не указан'}</td>
                              <td className="py-3 text-gray-300">{formatDate(match.match_date)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-400">Нет последних матчей для отображения.</p>
                  )}
                </div>
              )}
            </div>
            
            {/* Upcoming Matches */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 flex justify-between items-center cursor-pointer"
                onClick={() => setShowUpcoming(!showUpcoming)}
              >
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-2" />
                  <h2 className="text-xl font-semibold">Предстоящие матчи</h2>
                </div>
                {showUpcoming ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
              
              {showUpcoming && (
                <div className="p-6">
                  {upcomingMatches.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingMatches.map((match) => (
                        <div key={match.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-orange-500/20">
                          <div>
                            <h3 className="font-medium text-white">против {getOpponentName(match)}</h3>
                            <div className="flex items-center text-gray-400 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span className="text-sm">{formatDate(match.match_date)}</span>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <button className="btn border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all duration-300 text-sm">
                              Подробности
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 mb-4">Нет запланированных матчей.</p>
                      <button className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
                        Запланировать матч
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;