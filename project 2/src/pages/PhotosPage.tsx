import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Users, Download, Heart, Share2, X, ChevronLeft, ChevronRight, Camera, Image as ImageIcon, Eye } from 'lucide-react';

// Mock data for photo galleries
const photoGalleries = [
  {
    id: 1,
    title: 'Летний теннисный турнир 2025',
    date: '15-17 июля 2025',
    location: 'Центральный теннисный клуб, Москва',
    photographer: 'Анна Фотограф',
    category: 'Турнир',
    coverImage: 'https://images.pexels.com/photos/6956427/pexels-photo-6956427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    photoCount: 45,
    likes: 128,
    views: 1250,
    photos: [
      {
        id: 1,
        url: 'https://images.pexels.com/photos/6956427/pexels-photo-6956427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Финальный матч турнира',
        likes: 23,
        downloads: 12,
      },
      {
        id: 2,
        url: 'https://images.pexels.com/photos/8224057/pexels-photo-8224057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Церемония награждения',
        likes: 31,
        downloads: 8,
      },
      {
        id: 3,
        url: 'https://images.pexels.com/photos/8224035/pexels-photo-8224035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Парный матч полуфинала',
        likes: 19,
        downloads: 5,
      },
      {
        id: 4,
        url: 'https://images.pexels.com/photos/8224033/pexels-photo-8224033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Интервью с победителем',
        likes: 27,
        downloads: 15,
      },
      {
        id: 5,
        url: 'https://images.pexels.com/photos/8224077/pexels-photo-8224077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Мастер-класс от профессионала',
        likes: 35,
        downloads: 20,
      },
      {
        id: 6,
        url: 'https://images.pexels.com/photos/6956426/pexels-photo-6956426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Зрители на трибунах',
        likes: 14,
        downloads: 3,
      },
    ],
  },
  {
    id: 2,
    title: 'Теннисный фестиваль 2025',
    date: '5 июля 2025',
    location: 'д. Подушкино, Теннисный клуб "Держава"',
    photographer: 'Михаил Визуал',
    category: 'Фестиваль',
    coverImage: '/photo_2025-06-03 18.48.01.jpeg',
    photoCount: 67,
    likes: 203,
    views: 2100,
    photos: [
      {
        id: 7,
        url: '/photo_2025-06-03 18.48.01.jpeg',
        caption: 'Открытие фестиваля',
        likes: 45,
        downloads: 25,
      },
      {
        id: 8,
        url: 'https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Детская программа',
        likes: 38,
        downloads: 18,
      },
      {
        id: 9,
        url: 'https://images.pexels.com/photos/5739458/pexels-photo-5739458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Юниорские соревнования',
        likes: 29,
        downloads: 12,
      },
      {
        id: 10,
        url: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Музыкальная программа',
        likes: 52,
        downloads: 30,
      },
    ],
  },
  {
    id: 3,
    title: 'Парный чемпионат 2025',
    date: '5-7 августа 2025',
    location: 'Теннисный центр "Запад", Санкт-Петербург',
    photographer: 'Елена Кадр',
    category: 'Турнир',
    coverImage: 'https://images.pexels.com/photos/5739218/pexels-photo-5739218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    photoCount: 38,
    likes: 95,
    views: 890,
    photos: [
      {
        id: 11,
        url: 'https://images.pexels.com/photos/5739218/pexels-photo-5739218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Парная игра в действии',
        likes: 33,
        downloads: 16,
      },
      {
        id: 12,
        url: 'https://images.pexels.com/photos/2078526/pexels-photo-2078526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Командная работа',
        likes: 28,
        downloads: 11,
      },
    ],
  },
  {
    id: 4,
    title: 'Мастер-классы и тренировки',
    date: 'Различные даты',
    location: 'Различные локации',
    photographer: 'Команда фотографов',
    category: 'Обучение',
    coverImage: 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    photoCount: 52,
    likes: 156,
    views: 1450,
    photos: [
      {
        id: 13,
        url: 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Тренировка на корте',
        likes: 41,
        downloads: 22,
      },
      {
        id: 14,
        url: 'https://images.pexels.com/photos/3856026/pexels-photo-3856026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        caption: 'Индивидуальная тренировка',
        likes: 36,
        downloads: 19,
      },
    ],
  },
];

const PhotosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedGallery, setSelectedGallery] = useState<typeof photoGalleries[0] | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  // Filter galleries based on search term and category
  const filteredGalleries = photoGalleries.filter((gallery) => {
    const matchesSearch = gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          gallery.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || gallery.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(photoGalleries.map(gallery => gallery.category)));

  const openLightbox = (photo: any, gallery: any) => {
    setSelectedPhoto(photo);
    setSelectedGallery(gallery);
    const photoIndex = gallery.photos.findIndex((p: any) => p.id === photo.id);
    setCurrentPhotoIndex(photoIndex);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    setSelectedGallery(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedGallery) return;
    
    let newIndex = currentPhotoIndex;
    if (direction === 'prev') {
      newIndex = currentPhotoIndex > 0 ? currentPhotoIndex - 1 : selectedGallery.photos.length - 1;
    } else {
      newIndex = currentPhotoIndex < selectedGallery.photos.length - 1 ? currentPhotoIndex + 1 : 0;
    }
    
    setCurrentPhotoIndex(newIndex);
    setSelectedPhoto(selectedGallery.photos[newIndex]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigatePhoto('prev');
    if (e.key === 'ArrowRight') navigatePhoto('next');
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Фотогалерея
          </h1>
          <p className="text-gray-400">
            Лучшие моменты с наших турниров, фестивалей и мероприятий
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
                placeholder="Поиск по названию или локации..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input bg-gray-900/50 border-gray-700 text-gray-100 pl-10"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'masonry' : 'grid')}
                className="btn border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center"
              >
                <ImageIcon className="h-5 w-5 mr-2" />
                {viewMode === 'grid' ? 'Сетка' : 'Мозаика'}
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center"
              >
                <Filter className="h-5 w-5 mr-2" />
                Фильтры
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category-filter" className="label text-gray-300">Категория</label>
                  <select
                    id="category-filter"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="input bg-gray-900/50 border-gray-700 text-gray-100"
                  >
                    <option value="">Все категории</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Camera className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-purple-400 mb-2">
              {photoGalleries.length}
            </h3>
            <p className="text-gray-400">Галерей</p>
          </div>

          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-pink-500/10 rounded-full">
                <ImageIcon className="h-8 w-8 text-pink-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-pink-400 mb-2">
              {photoGalleries.reduce((total, gallery) => total + gallery.photoCount, 0)}
            </h3>
            <p className="text-gray-400">Фотографий</p>
          </div>

          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Heart className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">
              {photoGalleries.reduce((total, gallery) => total + gallery.likes, 0)}
            </h3>
            <p className="text-gray-400">Лайков</p>
          </div>

          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Eye className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-blue-400 mb-2">
              {photoGalleries.reduce((total, gallery) => total + gallery.views, 0).toLocaleString()}
            </h3>
            <p className="text-gray-400">Просмотров</p>
          </div>
        </div>

        {/* Photo galleries grid */}
        {filteredGalleries.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {filteredGalleries.map((gallery) => (
              <div key={gallery.id} className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={gallery.coverImage} 
                    alt={gallery.title} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      gallery.category === 'Турнир' ? 'bg-purple-500 text-white' :
                      gallery.category === 'Фестиваль' ? 'bg-pink-500 text-white' :
                      gallery.category === 'Обучение' ? 'bg-blue-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {gallery.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span className="flex items-center">
                        <ImageIcon className="h-4 w-4 mr-1" />
                        {gallery.photoCount} фото
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {gallery.likes}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{gallery.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{gallery.date}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{gallery.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Camera className="h-4 w-4 mr-2" />
                      <span className="text-sm">Фотограф: {gallery.photographer}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {gallery.views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {gallery.likes}
                      </span>
                    </div>
                  </div>
                  
                  {/* Photo preview grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {gallery.photos.slice(0, 3).map((photo, index) => (
                      <div 
                        key={photo.id}
                        onClick={() => openLightbox(photo, gallery)}
                        className="relative aspect-square cursor-pointer overflow-hidden rounded group/photo"
                      >
                        <img 
                          src={photo.url} 
                          alt={photo.caption}
                          className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-300"
                        />
                        {index === 2 && gallery.photos.length > 3 && (
                          <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                            <span className="text-white font-semibold">+{gallery.photos.length - 3}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => openLightbox(gallery.photos[0], gallery)}
                    className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 w-full"
                  >
                    Смотреть галерею
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-12 text-center">
            <Camera className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <p className="text-xl text-gray-400 mb-4">Галереи не найдены</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('');
              }}
              className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Upload section */}
        <div className="mt-12 card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Поделитесь своими фотографиями</h2>
                <p className="text-gray-400 mb-6">
                  Были на наших мероприятиях и сделали отличные снимки? Поделитесь ими с сообществом! 
                  Лучшие фотографии будут добавлены в официальные галереи.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">Высокое качество изображений</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">Указание авторства</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">Модерация перед публикацией</span>
                  </div>
                </div>
                <button className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
                  Загрузить фотографии
                </button>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Фотограф" 
                  className="h-64 w-64 object-cover rounded-lg border-2 border-purple-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {selectedPhoto && selectedGallery && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyPress}
            tabIndex={0}
          >
            <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-gray-900/80 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto('prev');
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900/80 text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto('next');
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900/80 text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Main image */}
              <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                
                {/* Photo info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6 rounded-b-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold mb-1">{selectedPhoto.caption}</h3>
                      <p className="text-gray-300 text-sm">
                        {currentPhotoIndex + 1} из {selectedGallery.photos.length} • {selectedGallery.title}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-white hover:text-red-400 transition-colors">
                        <Heart className="h-5 w-5 mr-1" />
                        {selectedPhoto.likes}
                      </button>
                      <button className="flex items-center text-white hover:text-blue-400 transition-colors">
                        <Download className="h-5 w-5 mr-1" />
                        {selectedPhoto.downloads}
                      </button>
                      <button className="flex items-center text-white hover:text-green-400 transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosPage;