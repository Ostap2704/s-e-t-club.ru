import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Trophy, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase, type Tournament, type TournamentRegistration } from '../lib/supabase';
import { mockApi } from '../lib/mockData';
import { useAuth } from '../contexts/AuthContext';

interface TournamentWithRegistrations extends Tournament {
  registrations_count: number;
  user_registered: boolean;
}

const TournamentsPage: React.FC = () => {
  const [filterFormat, setFilterFormat] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [tournaments, setTournaments] = useState<TournamentWithRegistrations[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchTournaments();
  }, [user]);

  const fetchTournaments = async () => {
    try {
      // Get tournaments from mock data (they are predefined)
      const tournamentsData = await mockApi.getTournaments();
      
      // Get real registrations from Supabase
      const { data: registrationsData, error: registrationsError } = await supabase
        .from('tournament_registrations')
        .select('*');

      if (registrationsError) {
        console.error('Error fetching registrations:', registrationsError);
      }

      const tournamentsWithData = tournamentsData.map(tournament => {
        const registrationsCount = (registrationsData || []).filter(r => r.tournament_id === tournament.id).length;
        const userRegistered = user ? (registrationsData || []).some(r => r.tournament_id === tournament.id && r.user_id === user.id) : false;
        
        return {
          ...tournament,
          registrations_count: registrationsCount,
          user_registered: userRegistered,
        };
      });

      setTournaments(tournamentsWithData);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (tournamentId: string) => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    try {
      // Register in Supabase
      const { error } = await supabase
        .from('tournament_registrations')
        .insert({
          tournament_id: tournamentId,
          user_id: user.id,
          status: 'registered'
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          alert('Вы уже зарегистрированы на этот турнир');
        } else {
          throw error;
        }
        return;
      }

      alert('Вы успешно зарегистрированы на турнир!');
      fetchTournaments(); // Refresh data
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error.message || 'Ошибка при регистрации на турнир');
    }
  };

  // Filter tournaments based on selected filters
  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesFormat = !filterFormat || tournament.format.includes(filterFormat);
    const matchesLevel = !filterLevel || tournament.skill_levels.includes(filterLevel);
    const matchesStatus = !filterStatus || tournament.status === filterStatus;
    return matchesFormat && matchesLevel && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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
            Турниры
          </h1>
          <p className="text-gray-400">
            Найдите и зарегистрируйтесь на предстоящие теннисные турниры
          </p>
        </div>

        {/* Featured tournament */}
        {filteredTournaments.length > 0 && (
          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden mb-8 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
            <div className="relative">
              <img 
                src={filteredTournaments[0].image_url || 'https://images.pexels.com/photos/6956427/pexels-photo-6956427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                alt={filteredTournaments[0].name} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent flex items-end">
                <div className="p-6">
                  <span className="inline-block px-2 py-1 bg-purple-500 text-white text-xs font-semibold rounded mb-2">
                    Рекомендуемый
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">{filteredTournaments[0].name}</h2>
                  <div className="flex items-center text-gray-300 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{formatDate(filteredTournaments[0].start_date)} - {formatDate(filteredTournaments[0].end_date)}</span>
                  </div>
                  <p className="mb-4 max-w-2xl text-gray-300">{filteredTournaments[0].description}</p>
                  <button 
                    onClick={() => handleRegister(filteredTournaments[0].id)}
                    disabled={filteredTournaments[0].user_registered || filteredTournaments[0].status !== 'Открыт'}
                    className={`btn transition-all duration-300 ${
                      filteredTournaments[0].user_registered 
                        ? 'bg-green-600 text-white cursor-not-allowed' 
                        : filteredTournaments[0].status === 'Открыт'
                        ? 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {filteredTournaments[0].user_registered ? 'Зарегистрирован' : 
                     filteredTournaments[0].status === 'Открыт' ? 'Регистрация' : 'Скоро'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Все турниры</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              Фильтры
              {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="format-filter" className="label text-gray-300">Формат турнира</label>
                <select
                  id="format-filter"
                  value={filterFormat}
                  onChange={(e) => setFilterFormat(e.target.value)}
                  className="input bg-gray-900/50 border-gray-700 text-gray-100"
                >
                  <option value="">Все форматы</option>
                  <option value="Одиночный">Одиночный</option>
                  <option value="Парный">Парный</option>
                </select>
              </div>
              
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
                  <option value="Все уровни">Смешанные уровни</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="status-filter" className="label text-gray-300">Статус</label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input bg-gray-900/50 border-gray-700 text-gray-100"
                >
                  <option value="">Все статусы</option>
                  <option value="Открыт">Открыта регистрация</option>
                  <option value="Скоро">Скоро</option>
                  <option value="Закрыт">Регистрация закрыта</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Tournament grid */}
        {filteredTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <div key={tournament.id} className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
                <img 
                  src={tournament.image_url || 'https://images.pexels.com/photos/6956427/pexels-photo-6956427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                  alt={tournament.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`
                      inline-block px-2 py-1 text-xs font-semibold rounded
                      ${tournament.status === 'Открыт' ? 'bg-green-900/50 text-green-400 border border-green-500/20' : 
                        tournament.status === 'Скоро' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/20' : 
                        'bg-gray-900/50 text-gray-400 border border-gray-500/20'}
                    `}>
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
                        {tournament.registrations_count}/{tournament.max_participants} участников
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
                  
                  <button 
                    onClick={() => handleRegister(tournament.id)}
                    disabled={tournament.user_registered || tournament.status !== 'Открыт'}
                    className={`w-full py-2 rounded-md font-medium transition-all duration-300 ${
                      tournament.user_registered 
                        ? 'bg-green-600 text-white cursor-not-allowed' 
                        : tournament.status === 'Открыт'
                        ? 'btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                        : 'bg-gray-900/50 text-gray-500 border border-gray-700 cursor-not-allowed'
                    }`}
                  >
                    {tournament.user_registered ? 'Зарегистрирован' : 
                     tournament.status === 'Открыт' ? 'Регистрация' : 'Скоро'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-12 text-center">
            <p className="text-xl text-gray-400 mb-4">Турниры не найдены</p>
            <button 
              onClick={() => {
                setFilterFormat('');
                setFilterLevel('');
                setFilterStatus('');
              }}
              className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Host a tournament */}
        <div className="mt-12 card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
          <div className="p-8 md:p-12 md:flex justify-between items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4 text-white">Хотите организовать свой турнир?</h2>
              <p className="text-gray-400 mb-6">
                Если вы заинтересованы в организации теннисного турнира в вашем клубе или на вашей площадке, мы поможем вам настроить всё от регистрации до турнирной сетки.
              </p>
              <button className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
                Связаться с нами
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/2159077/pexels-photo-2159077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Организатор теннисного турнира" 
                className="h-40 w-40 object-cover rounded-full border-2 border-purple-500/20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentsPage;