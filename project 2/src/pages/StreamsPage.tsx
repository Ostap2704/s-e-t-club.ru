import React, { useState } from 'react';
import { Play, Users, Eye, Calendar, ExternalLink, Plus, Settings, Tv, Radio } from 'lucide-react';

// Mock data for live streams
const liveStreams = [
  {
    id: 1,
    title: 'Финал турнира "Летний кубок"',
    streamer: 'Tennis League Official',
    platform: 'twitch',
    embedUrl: 'https://player.twitch.tv/?channel=tennisleague&parent=localhost',
    viewers: 1247,
    isLive: true,
    thumbnail: 'https://images.pexels.com/photos/8224057/pexels-photo-8224057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Турнир',
    startTime: '14:00',
    description: 'Прямая трансляция финального матча летнего турнира между лучшими игроками лиги.',
  },
  {
    id: 2,
    title: 'Мастер-класс: Техника подачи',
    streamer: 'Тренер Михаил',
    platform: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    viewers: 523,
    isLive: true,
    thumbnail: 'https://images.pexels.com/photos/8224077/pexels-photo-8224077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Обучение',
    startTime: '16:30',
    description: 'Профессиональный тренер покажет правильную технику подачи и ответит на вопросы.',
  },
  {
    id: 3,
    title: 'Разбор матча: Анализ игры',
    streamer: 'Аналитик Анна',
    platform: 'twitch',
    embedUrl: 'https://player.twitch.tv/?channel=tennisanalysis&parent=localhost',
    viewers: 342,
    isLive: false,
    thumbnail: 'https://images.pexels.com/photos/6956426/pexels-photo-6956426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Анализ',
    startTime: '19:00',
    description: 'Детальный разбор вчерашнего матча с анализом тактики и техники игроков.',
  },
];

// Mock data for upcoming streams
const upcomingStreams = [
  {
    id: 4,
    title: 'Парный турнир - Полуфинал',
    streamer: 'Tennis League Official',
    platform: 'twitch',
    scheduledTime: '15 июня 2025, 15:00',
    thumbnail: 'https://images.pexels.com/photos/8224035/pexels-photo-8224035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Турнир',
    description: 'Полуфинальные матчи парного турнира с участием топ-команд.',
  },
  {
    id: 5,
    title: 'Q&A с чемпионом лиги',
    streamer: 'Михаил Родригес',
    platform: 'youtube',
    scheduledTime: '18 июня 2025, 18:00',
    thumbnail: 'https://images.pexels.com/photos/8224033/pexels-photo-8224033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Интервью',
    description: 'Чемпион лиги ответит на вопросы зрителей и поделится секретами успеха.',
  },
];

const StreamsPage: React.FC = () => {
  const [selectedStream, setSelectedStream] = useState<typeof liveStreams[0] | null>(liveStreams[0]);
  const [filterCategory, setFilterCategory] = useState('');
  const [showAddStreamModal, setShowAddStreamModal] = useState(false);

  // Filter streams based on category
  const filteredStreams = liveStreams.filter(stream => 
    !filterCategory || stream.category === filterCategory
  );

  const categories = Array.from(new Set(liveStreams.map(stream => stream.category)));

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitch':
        return <Tv className="h-4 w-4" />;
      case 'youtube':
        return <Play className="h-4 w-4" />;
      default:
        return <Radio className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitch':
        return 'text-purple-400 bg-purple-900/50 border-purple-500/20';
      case 'youtube':
        return 'text-red-400 bg-red-900/50 border-red-500/20';
      default:
        return 'text-blue-400 bg-blue-900/50 border-blue-500/20';
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Трансляции
          </h1>
          <p className="text-gray-400">
            Смотрите прямые эфиры турниров, мастер-классы и аналитические разборы
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stream Player */}
          <div className="lg:col-span-2">
            {selectedStream ? (
              <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
                <div className="relative">
                  {selectedStream.isLive ? (
                    <div className="aspect-video">
                      <iframe
                        src={selectedStream.embedUrl}
                        className="w-full h-full"
                        allowFullScreen
                        title={selectedStream.title}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                      <img 
                        src={selectedStream.thumbnail} 
                        alt={selectedStream.title}
                        className="w-full h-full object-cover opacity-50"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Play className="h-16 w-16 text-white mx-auto mb-4" />
                          <p className="text-white text-lg">Трансляция начнется в {selectedStream.startTime}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedStream.isLive && (
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium animate-pulse">
                        🔴 В ЭФИРЕ
                      </span>
                      <span className="bg-gray-900/80 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {selectedStream.viewers.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedStream.title}</h2>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-400">Стример: {selectedStream.streamer}</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getPlatformColor(selectedStream.platform)}`}>
                          {getPlatformIcon(selectedStream.platform)}
                          <span className="ml-1 capitalize">{selectedStream.platform}</span>
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-900/50 text-gray-300 border border-gray-700">
                          {selectedStream.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{selectedStream.description}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Открыть в {selectedStream.platform}
                    </button>
                    <button className="btn border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300">
                      Поделиться
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-12 text-center">
                <Tv className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Выберите трансляцию</h3>
                <p className="text-gray-400">Выберите трансляцию из списка справа для просмотра</p>
              </div>
            )}

            {/* Chat Integration Placeholder */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Чат трансляции</h3>
                <button className="btn border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 text-sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Настройки
                </button>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 h-64 overflow-y-auto border border-gray-700">
                <p className="text-gray-400 text-center">Чат будет доступен во время прямой трансляции</p>
              </div>
            </div>
          </div>

          {/* Stream List Sidebar */}
          <div className="lg:col-span-1">
            {/* Filters */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Фильтры</h3>
                <button 
                  onClick={() => setShowAddStreamModal(true)}
                  className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 text-sm flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Добавить
                </button>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="input bg-gray-900/50 border-gray-700 text-gray-100 w-full"
              >
                <option value="">Все категории</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Live Streams */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-4 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Radio className="h-5 w-5 mr-2 text-red-500" />
                Прямые эфиры
              </h3>
              <div className="space-y-3">
                {filteredStreams.filter(stream => stream.isLive).map((stream) => (
                  <div
                    key={stream.id}
                    onClick={() => setSelectedStream(stream)}
                    className={`cursor-pointer p-3 rounded-lg border transition-all duration-300 ${
                      selectedStream?.id === stream.id
                        ? 'bg-purple-900/50 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                        : 'bg-gray-900/50 border-gray-700 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={stream.thumbnail}
                          alt={stream.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">{stream.title}</h4>
                        <p className="text-xs text-gray-400 truncate">{stream.streamer}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center px-1 py-0.5 rounded text-xs ${getPlatformColor(stream.platform)}`}>
                            {getPlatformIcon(stream.platform)}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {stream.viewers}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Streams */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Предстоящие трансляции
              </h3>
              <div className="space-y-3">
                {upcomingStreams.map((stream) => (
                  <div
                    key={stream.id}
                    className="p-3 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={stream.thumbnail}
                        alt={stream.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">{stream.title}</h4>
                        <p className="text-xs text-gray-400 truncate">{stream.streamer}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center px-1 py-0.5 rounded text-xs ${getPlatformColor(stream.platform)}`}>
                            {getPlatformIcon(stream.platform)}
                          </span>
                          <span className="text-xs text-blue-400">{stream.scheduledTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stream Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Radio className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">
              {liveStreams.filter(s => s.isLive).length}
            </h3>
            <p className="text-gray-400">Активных трансляций</p>
          </div>

          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Eye className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-purple-400 mb-2">
              {liveStreams.reduce((total, stream) => total + (stream.isLive ? stream.viewers : 0), 0).toLocaleString()}
            </h3>
            <p className="text-gray-400">Общее количество зрителей</p>
          </div>

          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Calendar className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-blue-400 mb-2">{upcomingStreams.length}</h3>
            <p className="text-gray-400">Запланированных трансляций</p>
          </div>

          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">12</h3>
            <p className="text-gray-400">Активных стримеров</p>
          </div>
        </div>

        {/* How to Stream Section */}
        <div className="mt-12 card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Хотите вести свои трансляции?</h2>
                <p className="text-gray-400 mb-6">
                  Присоединяйтесь к нашему сообществу стримеров! Транслируйте свои матчи, проводите мастер-классы 
                  или делитесь анализом игр с другими участниками лиги.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">Поддержка Twitch, YouTube и других платформ</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">Интеграция с профилем игрока</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">Продвижение в сообществе лиги</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddStreamModal(true)}
                  className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300"
                >
                  Начать стримить
                </button>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Стример" 
                  className="h-64 w-64 object-cover rounded-lg border-2 border-purple-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add Stream Modal */}
        {showAddStreamModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="card bg-gray-800 border border-purple-500/20 p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-white mb-4">Добавить трансляцию</h3>
              <div className="space-y-4">
                <div>
                  <label className="label text-gray-300">Название трансляции</label>
                  <input
                    type="text"
                    className="input bg-gray-900/50 border-gray-700 text-gray-100"
                    placeholder="Введите название..."
                  />
                </div>
                <div>
                  <label className="label text-gray-300">Платформа</label>
                  <select className="input bg-gray-900/50 border-gray-700 text-gray-100">
                    <option value="twitch">Twitch</option>
                    <option value="youtube">YouTube</option>
                    <option value="other">Другая</option>
                  </select>
                </div>
                <div>
                  <label className="label text-gray-300">URL трансляции</label>
                  <input
                    type="url"
                    className="input bg-gray-900/50 border-gray-700 text-gray-100"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="label text-gray-300">Категория</label>
                  <select className="input bg-gray-900/50 border-gray-700 text-gray-100">
                    <option value="Турнир">Турнир</option>
                    <option value="Обучение">Обучение</option>
                    <option value="Анализ">Анализ</option>
                    <option value="Интервью">Интервью</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <button className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 flex-1">
                  Добавить
                </button>
                <button 
                  onClick={() => setShowAddStreamModal(false)}
                  className="btn border border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white transition-all duration-300 flex-1"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamsPage;