import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trophy, Users, Zap, Check, Award, Target, Heart, UserPlus } from 'lucide-react';
import { config } from '../lib/config';

// Only show debug component in development
const SupabaseDebug = config.isDevelopment 
  ? React.lazy(() => import('../components/debug/SupabaseDebug'))
  : null;

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/photo_2025-06-03%2018.48.01.jpeg')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent"></div>
        
        <div className="container-custom relative h-full flex items-center">
          <div className="max-w-2xl">
            <img src="/Text logo (1).png" alt={config.app.name} className="h-24 mb-6" />
            <p className="text-xl text-gray-300 mt-4">
              Присоединяйтесь к теннисному сообществу, где спорт встречается со стилем!
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link to="/register" className="btn bg-purple-600 text-white hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300">
                Присоединиться
              </Link>
              <Link to="/tournaments" className="btn border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300">
                Турниры
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Debug Section - Only in development */}
      {config.isDevelopment && SupabaseDebug && (
        <section className="py-8 bg-gray-800">
          <div className="container-custom">
            <React.Suspense fallback={<div>Loading debug info...</div>}>
              <SupabaseDebug />
            </React.Suspense>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Всё необходимое в одном месте
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Наша платформа упрощает управление вашим теннисным опытом: от поиска матчей до отслеживания прогресса.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-500/10 rounded-full">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-400">Профили игроков</h3>
              <p className="text-gray-300">
                Создайте свой профиль, покажите свои навыки и общайтесь с другими игроками в вашем районе.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-pink-500/20 p-6 text-center hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-pink-500/10 rounded-full">
                  <Trophy className="h-8 w-8 text-pink-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-pink-400">Турниры</h3>
              <p className="text-gray-300">
                Участвуйте в местных турнирах, соревнуйтесь с игроками вашего уровня и выигрывайте призы.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-blue-500/20 p-6 text-center hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-500/10 rounded-full">
                  <Calendar className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Планирование матчей</h3>
              <p className="text-gray-300">
                Легко планируйте матчи, отправляйте приглашения и управляйте своим теннисным календарем.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 p-6 text-center hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-cyan-500/10 rounded-full">
                  <Zap className="h-8 w-8 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-400">Статистика и рейтинги</h3>
              <p className="text-gray-300">
                Отслеживайте свои результаты, просматривайте историю матчей и следите за своим рейтингом в лиге.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
              Предстоящие турниры
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tournament 1 */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
              <img 
                src="https://images.pexels.com/photos/6956427/pexels-photo-6956427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Летний теннисный турнир" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-purple-400 font-medium mb-2">
                  15-17 июля 2025
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Летний теннисный турнир</h3>
                <p className="text-gray-300 mb-4">
                  Турнир выходного дня для всех уровней с призами для победителей.
                </p>
                <Link to="/tournaments" className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 w-full text-center">
                  Регистрация
                </Link>
              </div>
            </div>

            {/* Tournament 2 */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-pink-500/20 overflow-hidden hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300">
              <img 
                src="https://images.pexels.com/photos/8224057/pexels-photo-8224057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Парный чемпионат" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-pink-400 font-medium mb-2">
                  5-7 августа 2025
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Парный чемпионат</h3>
                <p className="text-gray-300 mb-4">
                  Найдите партнера и участвуйте в нашем ежегодном парном турнире.
                </p>
                <Link to="/tournaments" className="btn bg-pink-500 text-white hover:bg-pink-600 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300 w-full text-center">
                  Регистрация
                </Link>
              </div>
            </div>

            {/* Tournament 3 */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-blue-500/20 overflow-hidden hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <img 
                src="https://images.pexels.com/photos/8224035/pexels-photo-8224035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Кубок ветеранов" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-blue-400 font-medium mb-2">
                  10-12 сентября 2025
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Кубок ветеранов</h3>
                <p className="text-gray-300 mb-4">
                  Специальный турнир для игроков старше 50 лет с несколькими дивизионами.
                </p>
                <Link to="/tournaments" className="btn bg-blue-500 text-white hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 w-full text-center">
                  Регистрация
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats - Updated for fresh start */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
              Начните свой путь в теннисе
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Станьте частью нового теннисного сообщества
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-500/10 rounded-full">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-purple-400 mb-2">Новое</h3>
              <p className="text-gray-400">Сообщество</p>
              <p className="text-sm text-gray-500 mt-2">Станьте первым участником!</p>
            </div>

            <div className="card bg-gray-800/30 backdrop-blur-sm border border-orange-500/20 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-orange-500/10 rounded-full">
                  <Trophy className="h-8 w-8 text-orange-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-orange-400 mb-2">6+</h3>
              <p className="text-gray-400">Запланированных турниров</p>
            </div>

            <div className="card bg-gray-800/30 backdrop-blur-sm border border-pink-500/20 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-pink-500/10 rounded-full">
                  <Calendar className="h-8 w-8 text-pink-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-pink-400 mb-2">2025</h3>
              <p className="text-gray-400">Год основания</p>
            </div>

            <div className="card bg-gray-800/30 backdrop-blur-sm border border-blue-500/20 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-500/10 rounded-full">
                  <Heart className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-2">100%</h3>
              <p className="text-gray-400">Любовь к теннису</p>
            </div>
          </div>
        </div>
      </section>

      {/* Organizers Section */}
      <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
              Наша команда
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Познакомьтесь с людьми, которые делают наше теннисное сообщество особенным
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Organizer 1 */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-orange-500/20 overflow-hidden hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-300 group">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Александр Петров" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-orange-500 text-white p-2 rounded-full">
                    <Award className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Александр Петров</h3>
                <p className="text-orange-400 font-medium mb-3">Основатель и главный организатор</p>
                <p className="text-gray-300 mb-4">
                  Профессиональный теннисист с 15-летним опытом. Создал лигу в 2025 году с целью объединить 
                  любителей тенниса и создать дружественное соревновательное сообщество.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-orange-400" />
                    Мастер спорта
                  </span>
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1 text-orange-400" />
                    15+ лет опыта
                  </span>
                </div>
              </div>
            </div>

            {/* Organizer 2 */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-pink-500/20 overflow-hidden hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 group">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Мария Иванова" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-pink-500 text-white p-2 rounded-full">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Мария Иванова</h3>
                <p className="text-pink-400 font-medium mb-3">Координатор мероприятий</p>
                <p className="text-gray-300 mb-4">
                  Отвечает за организацию турниров и фестивалей. Имеет опыт в event-менеджменте и страсть к теннису. 
                  Благодаря ей наши мероприятия проходят на высшем уровне.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-pink-400" />
                    Event-менеджер
                  </span>
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1 text-pink-400" />
                    Теннис-энтузиаст
                  </span>
                </div>
              </div>
            </div>

            {/* Organizer 3 */}
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-blue-500/20 overflow-hidden hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 group">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Дмитрий Козлов" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-blue-500 text-white p-2 rounded-full">
                    <Zap className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Дмитрий Козлов</h3>
                <p className="text-blue-400 font-medium mb-3">Технический директор</p>
                <p className="text-gray-300 mb-4">
                  Разработчик и администратор нашей платформы. Следит за техническими аспектами лиги, 
                  рейтинговой системой и цифровыми инновациями в теннисном сообществе.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Zap className="h-4 w-4 mr-1 text-blue-400" />
                    IT-эксперт
                  </span>
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1 text-blue-400" />
                    Теннисист-любитель
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Join Team CTA */}
          <div className="mt-12 card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">Хотите присоединиться к нашей команде?</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Мы всегда ищем энтузиастов тенниса, которые хотят помочь развивать наше сообщество. 
                Если у вас есть идеи или желание внести свой вклад, мы будем рады вас видеть!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
                  Связаться с нами
                </button>
                <button className="btn border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300">
                  Стать волонтером
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/photo_2025-06-03%2018.48.01.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="container-custom relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Готовы присоединиться к нашему теннисному сообществу?
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Зарегистрируйтесь сегодня и получите доступ ко всем функциям. Это займет всего минуту!
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-pink-400 mr-2" />
                  <span className="text-gray-300">Создайте свой профиль игрока</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-pink-400 mr-2" />
                  <span className="text-gray-300">Участвуйте в предстоящих турнирах</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-pink-400 mr-2" />
                  <span className="text-gray-300">Общайтесь с другими игроками</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-6 w-6 text-pink-400 mr-2" />
                  <span className="text-gray-300">Отслеживайте свою статистику и прогресс</span>
                </li>
              </ul>
              <Link 
                to="/register" 
                className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 text-lg px-8 py-3 inline-flex items-center"
              >
                <UserPlus className="h-6 w-6 mr-2" />
                Присоединиться
              </Link>
            </div>
            <div className="hidden md:flex justify-center">
              <img 
                src="https://images.pexels.com/photos/3856026/pexels-photo-3856026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Теннисист в действии" 
                className="rounded-lg shadow-lg max-h-96 object-cover border border-purple-500/20"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;