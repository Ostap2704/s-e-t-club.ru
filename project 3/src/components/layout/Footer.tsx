import React from 'react';
import { Link } from 'react-router-dom';
import { Tent as TennisBall, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <TennisBall className="h-8 w-8 text-tennis-yellow-500" />
              <span className="text-xl font-bold text-white">Social Elite Tennis</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Ведущая любительская теннисная лига, объединяющая игроков всех уровней для соревновательных и дружеских матчей.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/players" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                  Игроки
                </Link>
              </li>
              <li>
                <Link to="/tournaments" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                  Турниры
                </Link>
              </li>
              <li>
                <Link to="/streams" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                  Трансляции
                </Link>
              </li>
              <li>
                <Link to="/photos" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                  Фото
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                  Рейтинг
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Информация</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <Link to="/rules" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                  Правила лиги
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                  Условия использования
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-tennis-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  ул. Теннисная 123, Москва, 123456
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-tennis-yellow-500 mr-2" />
                <a href="tel:+74951234567" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-tennis-yellow-500 mr-2" />
                <a href="mailto:info@tennisleague.ru" className="text-gray-400 hover:text-tennis-yellow-500 transition-colors">
                  info@tennisleague.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Social Elite Tennis. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;