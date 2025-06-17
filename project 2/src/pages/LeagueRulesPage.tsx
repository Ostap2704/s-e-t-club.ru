import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Clock, DollarSign, Trophy, Users, Shield, FileText, CheckCircle, XCircle } from 'lucide-react';

const LeagueRulesPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    general: true,
    registration: false,
    payment: false,
    conduct: false,
    tournaments: false,
    ranking: false,
    disputes: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const rulesSections = [
    {
      id: 'general',
      title: 'Общие положения',
      icon: <FileText className="h-6 w-6" />,
      color: 'purple',
      rules: [
        'Лига открыта для всех игроков независимо от уровня подготовки',
        'Участники должны быть старше 16 лет (для младших участников требуется согласие родителей)',
        'Все участники обязаны соблюдать правила честной игры и спортивного поведения',
        'Лига оставляет за собой право исключить участника за нарушение правил',
        'Правила могут быть изменены администрацией с уведомлением участников за 7 дней',
      ]
    },
    {
      id: 'registration',
      title: 'Регистрация и участие',
      icon: <Users className="h-6 w-6" />,
      color: 'blue',
      rules: [
        'Регистрация на турниры происходит через официальный сайт лиги',
        'Участник может зарегистрироваться только на один турнир в выходные',
        'Для участия в турнире необходимо указать достоверную информацию о себе',
        'Участники должны подтвердить свой уровень игры при первой регистрации',
        'Ложная информация об уровне игры является основанием для дисквалификации',
        'Участники несут ответственность за своевременное прибытие на матчи',
      ]
    },
    {
      id: 'payment',
      title: 'Оплата и возврат средств',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'green',
      highlight: true,
      rules: [
        'Взнос за участие в турнире должен быть оплачен в течение 24 часов после регистрации',
        'Неоплаченная регистрация автоматически аннулируется через 24 часа',
        'Возврат взноса возможен только при отмене турнира организаторами',
        '⚠️ ВАЖНО: При снятии с турнира менее чем за 48 часов до начала взнос НЕ ВОЗВРАЩАЕТСЯ',
        'При снятии за 48+ часов до турнира возвращается 80% взноса (20% - административный сбор)',
        'Возврат средств производится в течение 5-7 рабочих дней на карту плательщика',
        'В случае болезни участника (при предоставлении справки) возвращается 90% взноса',
        'Перенос участия на другой турнир возможен за дополнительную плату 500₽',
      ]
    },
    {
      id: 'conduct',
      title: 'Правила поведения',
      icon: <Shield className="h-6 w-6" />,
      color: 'red',
      rules: [
        'Запрещены любые формы неспортивного поведения и агрессии',
        'Участники должны уважительно относиться к соперникам, судьям и зрителям',
        'Использование ненормативной лексики влечет предупреждение или дисквалификацию',
        'Запрещено употребление алкоголя и наркотических веществ во время мероприятий',
        'Участники должны соблюдать дресс-код: спортивная одежда и обувь',
        'Мобильные телефоны должны быть отключены или в беззвучном режиме во время игры',
        'Тренеры и болельщики не должны вмешиваться в ход матча',
      ]
    },
    {
      id: 'tournaments',
      title: 'Правила турниров',
      icon: <Trophy className="h-6 w-6" />,
      color: 'yellow',
      rules: [
        'Турниры проводятся по системе на выбывание или круговой системе',
        'Матчи играются до 2 выигранных сетов (лучший из 3)',
        'В случае дождя матчи переносятся на резервную дату',
        'Опоздание на матч более чем на 15 минут ведет к техническому поражению',
        'Участник может взять медицинский тайм-аут продолжительностью до 3 минут',
        'Споры по поводу счета решаются переигровкой спорного очка',
        'Финальные матчи могут транслироваться в прямом эфире',
        'Победители получают призы и очки рейтинга согласно турнирной таблице',
      ]
    },
    {
      id: 'ranking',
      title: 'Рейтинговая система',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'indigo',
      rules: [
        'Рейтинг обновляется еженедельно по воскресеньям',
        'Очки начисляются за участие в турнирах и результаты матчей',
        'Победа над игроком выше по рейтингу дает дополнительные очки',
        'Неявка на матч без уважительной причины ведет к снятию очков',
        'Рейтинг учитывает результаты за последние 12 месяцев',
        'Новые участники начинают с базового рейтинга 1000 очков',
        'Максимальное количество очков за один турнир - 100',
      ]
    },
    {
      id: 'disputes',
      title: 'Разрешение споров',
      icon: <XCircle className="h-6 w-6" />,
      color: 'gray',
      rules: [
        'Все споры рассматриваются турнирным комитетом в течение 48 часов',
        'Апелляции подаются в письменном виде через официальный сайт',
        'Решение турнирного комитета является окончательным',
        'При серьезных нарушениях может быть назначено дисциплинарное расследование',
        'Участники имеют право на одну апелляцию по каждому спорному вопросу',
        'Ложные обвинения влекут дисциплинарную ответственность',
      ]
    },
  ];

  const getColorClasses = (color: string, highlight?: boolean) => {
    const baseClasses = {
      purple: highlight ? 'border-purple-500/50 bg-purple-900/20' : 'border-purple-500/20',
      blue: highlight ? 'border-blue-500/50 bg-blue-900/20' : 'border-blue-500/20',
      green: highlight ? 'border-green-500/50 bg-green-900/20' : 'border-green-500/20',
      red: highlight ? 'border-red-500/50 bg-red-900/20' : 'border-red-500/20',
      yellow: highlight ? 'border-yellow-500/50 bg-yellow-900/20' : 'border-yellow-500/20',
      indigo: highlight ? 'border-indigo-500/50 bg-indigo-900/20' : 'border-indigo-500/20',
      gray: highlight ? 'border-gray-500/50 bg-gray-900/20' : 'border-gray-500/20',
    };
    return baseClasses[color as keyof typeof baseClasses] || baseClasses.purple;
  };

  const getIconColor = (color: string) => {
    const colors = {
      purple: 'text-purple-400',
      blue: 'text-blue-400',
      green: 'text-green-400',
      red: 'text-red-400',
      yellow: 'text-yellow-400',
      indigo: 'text-indigo-400',
      gray: 'text-gray-400',
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Правила лиги
          </h1>
          <p className="text-gray-400 mt-2">
            Ознакомьтесь с правилами участия в турнирах и мероприятиях нашей теннисной лиги
          </p>
        </div>

        {/* Important Notice */}
        <div className="card bg-red-900/20 border border-red-500/50 p-6 mb-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-2">Важное уведомление</h3>
              <p className="text-red-200 mb-4">
                Обратите особое внимание на правила отмены участия в турнирах. 
                <strong className="text-red-100"> При снятии с турнира менее чем за 48 часов до начала взнос не возвращается.</strong>
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Отмена за 48+ часов: возврат 80%</span>
                </div>
                <div className="flex items-center text-red-300">
                  <XCircle className="h-4 w-4 mr-2" />
                  <span>Отмена менее 48 часов: возврат 0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Быстрая навигация</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {rulesSections.map((section) => (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                  expandedSections[section.id] 
                    ? `${getColorClasses(section.color, true)} shadow-lg` 
                    : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                }`}
              >
                <div className={`mb-2 ${expandedSections[section.id] ? getIconColor(section.color) : 'text-gray-400'}`}>
                  {section.icon}
                </div>
                <span className={`text-xs text-center ${
                  expandedSections[section.id] ? 'text-white' : 'text-gray-400'
                }`}>
                  {section.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Rules Sections */}
        <div className="space-y-6">
          {rulesSections.map((section) => (
            <div 
              key={section.id} 
              className={`card bg-gray-800/30 backdrop-blur-sm border overflow-hidden transition-all duration-300 ${
                getColorClasses(section.color, section.highlight)
              }`}
            >
              <div 
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  section.highlight ? 'bg-gradient-to-r from-green-900/30 to-transparent' : ''
                }`}
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={getIconColor(section.color)}>
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                      {section.highlight && (
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 text-yellow-400 mr-2" />
                          <span className="text-yellow-400 text-sm font-medium">Особые условия</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {expandedSections[section.id] ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </div>
                </div>
              </div>

              {expandedSections[section.id] && (
                <div className="px-6 pb-6 border-t border-gray-700/50">
                  <div className="pt-6">
                    <ul className="space-y-4">
                      {section.rules.map((rule, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            rule.includes('⚠️') ? 'bg-red-400' : 
                            rule.includes('ВАЖНО') ? 'bg-yellow-400' : 
                            `bg-${section.color}-400`
                          }`}></div>
                          <span className={`text-gray-300 leading-relaxed ${
                            rule.includes('⚠️') || rule.includes('ВАЖНО') ? 'font-medium text-yellow-200' : ''
                          }`}>
                            {rule}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Вопросы по правилам?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Если у вас есть вопросы по правилам лиги или вам нужны разъяснения, 
              обращайтесь к администрации через официальные каналы связи.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
                Связаться с администрацией
              </button>
              <button className="btn border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300">
                FAQ
              </button>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Правила последний раз обновлялись: 1 июня 2025 года
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeagueRulesPage;