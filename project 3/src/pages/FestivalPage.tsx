import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Wine, Music, Users, Trophy, Volume2, VolumeX } from 'lucide-react';

const FestivalPage: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.loop = true;
      audioRef.current.play().catch(error => {
        console.log("Audio autoplay failed:", error);
        setIsMuted(true);
      });
    }
    
    // Ensure video autoplay works
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <audio ref={audioRef} src="/DJ Snake- J Balvin- Tyga-Loco Contigo-kissvk.com.mp3" />
      
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-50 bg-purple-500 p-3 rounded-full text-white hover:bg-purple-600 transition-colors"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      >
        {isMuted ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
      </button>

      {/* Hero Video */}
      <div className="relative w-full">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-[90vh] object-cover"
          poster="/photo_2025-06-03 18.48.01.jpeg"
        >
          <source src="/tennis-festival.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900"></div>
      </div>

      {/* Event Details */}
      <div className="py-16 bg-gradient-to-b from-gray-900/95 to-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 p-6 text-center hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow duration-300">
              <Calendar className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Дата</h3>
              <p className="text-purple-200">05 июля 2025</p>
            </div>
            
            <div className="card bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 p-6 text-center hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-shadow duration-300">
              <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Место</h3>
              <p className="text-blue-200"> д. Подушкино, Теннисный клуб "Держава"</p>
            </div>
            
            <div className="card bg-gray-800/50 backdrop-blur-sm border border-pink-500/20 p-6 text-center hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-shadow duration-300">
              <Users className="h-12 w-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Участники</h3>
              <p className="text-pink-200">30+ гостей</p>
            </div>
            
            <div className="card bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 p-6 text-center hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-shadow duration-300">
              <Trophy className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Призовой фонд</h3>
              <p className="text-cyan-200">Призы и подарки от спонсоров</p>
            </div>
          </div>
        </div>
      </div>

      {/* Festival Features */}
      <div className="py-16 bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Что вас ждёт на фестивале
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-8 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Теннисный турнир</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Trophy className="h-6 w-6 text-purple-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Турнир в формате парный микст</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-6 w-6 text-purple-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">12 пар в основной сетке</span>
                </li>
                <li className="flex items-start">
                  <Trophy className="h-6 w-6 text-purple-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Призовой фонд Призы и подарки от спонсоров</span>
                </li>
              </ul>
            </div>
            
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-pink-500/20 p-8 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Развлекательная программа</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Wine className="h-6 w-6 text-pink-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Алкогольный Бар с пивом, виски и шампанским</span>
                </li>
                <li className="flex items-start">
                  <Music className="h-6 w-6 text-pink-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Музыка и димкотека</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-6 w-6 text-pink-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Networking с сообществом</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Программа фестиваля
            </span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-blue-500/20 p-6 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-blue-400">День 1 - 15 августа</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="text-cyan-400 font-semibold w-24">10:00</span>
                  <span className="text-gray-300">Открытие фестиваля, регистрация участников</span>
                </li>
                <li className="flex">
                  <span className="text-cyan-400 font-semibold w-24">11:00</span>
                  <span className="text-gray-300">Начало турнира, групповой этап</span>
                </li>
                <li className="flex">
                  <span className="text-cyan-400 font-semibold w-24">19:00</span>
                  <span className="text-gray-300">Welcome-ужин, дегустация вин</span>
                </li>
              </ul>
            </div>
            
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-blue-500/20 p-6 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-blue-400">День 2 - 16 августа</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="text-cyan-400 font-semibold w-24">11:00</span>
                  <span className="text-gray-300">Продолжение турнира, плей-офф</span>
                </li>
                <li className="flex">
                  <span className="text-cyan-400 font-semibold w-24">16:00</span>
                  <span className="text-gray-300">Мастер-класс от профессионалов</span>
                </li>
                <li className="flex">
                  <span className="text-cyan-400 font-semibold w-24">20:00</span>
                  <span className="text-gray-300">Гала-ужин с живой музыкой</span>
                </li>
              </ul>
            </div>
            
            <div className="card bg-gray-800/30 backdrop-blur-sm border border-blue-500/20 p-6 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-blue-400">День 3 - 17 августа</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="text-cyan-400 font-semibold w-24">12:00</span>
                  <span className="text-gray-300">Финальные матчи турнира</span>
                </li>
                <li className="flex">
                  <span className="text-cyan-400 font-semibold w-24">16:00</span>
                  <span className="text-gray-300">Церемония награждения</span>
                </li>
                <li className="flex">
                  <span className="text-cyan-400 font-semibold w-24">18:00</span>
                  <span className="text-gray-300">Закрытие фестиваля, коктейльная вечеринка</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Готовы присоединиться к празднику тенниса?</h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Забронируйте свое место на главном теннисном событии года. Количество билетов ограничено!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
              Купить билет
            </button>
            <button className="btn border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300">
              Подробнее о турнире
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalPage;