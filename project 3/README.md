# Social Elite Tennis - Теннисная лига

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)

Современная веб-платформа для любительской теннисной лиги с системой турниров, рейтингов и сообщества игроков.

🌐 **Сайт:** [https://s-e-t-club.ru](https://s-e-t-club.ru)

## 🚀 Быстрое исправление Netlify

### Проблема: Page not found
Если вы видите "Page not found" на Netlify, выполните следующие шаги:

#### 1. Проверьте подключение к GitHub
1. Зайдите в [Netlify Dashboard](https://app.netlify.com)
2. Найдите ваш сайт
3. **Site settings → Build & deploy**
4. Убедитесь, что в разделе "Continuous deployment" указан ваш GitHub репозиторий

#### 2. Если репозиторий не подключен:
1. **Site settings → Build & deploy → Link repository**
2. Выберите **GitHub**
3. Найдите репозиторий `tennis-league-website`
4. **Настройки сборки:**
   ```
   Build command: npm ci && npm run build
   Publish directory: dist
   ```

#### 3. Добавьте переменные окружения:
**Site settings → Environment variables:**
```
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

#### 4. Принудительно пересоберите:
**Deploys → Trigger deploy → Deploy site**

## 🔧 Альтернативное решение

Если подключение к GitHub не работает:

### Вариант 1: Создать новый сайт
1. **Add new site → Import an existing project**
2. **GitHub → выберите tennis-league-website**
3. **Deploy site**

### Вариант 2: Ручная загрузка
1. Скачайте этот репозиторий как ZIP
2. Соберите проект локально: `npm run build`
3. Перетащите папку `dist/` в Netlify

## 🎯 Технологии

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Hosting**: Netlify
- **Domain**: s-e-t-club.ru

## 🛠 Установка и запуск

### Предварительные требования

- Node.js 18+
- npm или yarn
- Git

### Локальная разработка

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/YOUR_USERNAME/tennis-league-website.git
cd tennis-league-website
```

2. **Установите зависимости:**
```bash
npm install
```

3. **Создайте файл `.env`:**
```bash
cp .env.example .env
```

4. **Настройте переменные окружения в `.env`:**
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_DOMAIN=http://localhost:5173
NODE_ENV=development
```

5. **Запустите сервер разработки:**
```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

### Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

## 🌐 Развертывание

### Автоматическое развертывание на Netlify

1. **Форкните репозиторий** на GitHub
2. **Подключите к Netlify:**
   - Зайдите на [netlify.com](https://netlify.com)
   - "New site from Git" → выберите ваш форк
   - Настройки сборки заполнятся автоматически из `netlify.toml`

3. **Настройте переменные окружения** в Netlify:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_DOMAIN=https://s-e-t-club.ru
   NODE_ENV=production
   ```

4. **Настройте домен:**
   - Site settings → Domain management → Add custom domain
   - Введите: `s-e-t-club.ru`
   - Настройте DNS у регистратора

### Ручное развертывание

```bash
# Создайте сборку
npm run build

# Перетащите папку dist/ в Netlify Deploy
```

## 🗄 База данных

Проект использует Supabase PostgreSQL. Схема базы данных находится в `supabase/migrations/`.

### Основные таблицы:
- `profiles` - Профили пользователей
- `player_stats` - Статистика игроков
- `tournaments` - Турниры
- `tournament_registrations` - Регистрации на турниры
- `matches` - Матчи

### Настройка Supabase:

1. **Создайте проект** на [supabase.com](https://supabase.com)
2. **Выполните миграции** из папки `supabase/migrations/`
3. **Настройте RLS политики** (включены в миграциях)
4. **Добавьте домены** в разрешенные:
   - `http://localhost:5173` (для разработки)
   - `https://s-e-t-club.ru` (для продакшена)

## 📁 Структура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── auth/           # Компоненты аутентификации
│   ├── layout/         # Компоненты макета
│   └── ui/             # UI компоненты
├── contexts/           # React контексты
├── lib/               # Утилиты и конфигурация
├── pages/             # Страницы приложения
└── main.tsx           # Точка входа

public/                # Статические файлы
supabase/             # Конфигурация базы данных
├── migrations/       # SQL миграции
```

## 🔧 Конфигурация

### Переменные окружения

- `VITE_SUPABASE_URL` - URL проекта Supabase
- `VITE_SUPABASE_ANON_KEY` - Публичный ключ Supabase
- `VITE_DOMAIN` - Домен приложения
- `NODE_ENV` - Окружение (development/production)

### Netlify конфигурация

- `netlify.toml` - основная конфигурация
- Автоматические переадресации для React Router
- Кэширование статических файлов
- Безопасные заголовки
- Переадресация www → non-www

## 🎨 Дизайн

- **Темная тема** с неоновыми акцентами
- **Адаптивный дизайн** для всех устройств
- **Современные анимации** и микровзаимодействия
- **Градиенты** фиолетовый → розовый → оранжевый

## 📱 Поддерживаемые устройства

- **Десктоп:** 1200px+
- **Планшет:** 768px - 1199px
- **Мобильный:** 320px - 767px

## 🔐 Безопасность

- Аутентификация через Supabase Auth
- Row Level Security (RLS) в базе данных
- HTTPS обязательно для продакшена
- Безопасные заголовки через netlify.toml
- Валидация данных на клиенте и сервере

## 🚀 CI/CD

### Автоматическое развертывание:
- **Триггер:** Push в ветку `main`
- **Сборка:** `npm ci && npm run build`
- **Публикация:** папка `dist/`
- **Проверки:** ESLint, TypeScript

### Команды для разработки:
```bash
npm run dev          # Запуск dev сервера
npm run build        # Сборка для продакшена
npm run preview      # Предварительный просмотр сборки
npm run lint         # Проверка кода
npm run deploy:check # Проверка готовности к развертыванию
```

## 📊 Мониторинг

- **Netlify Analytics** - статистика посещений
- **Supabase Dashboard** - мониторинг базы данных
- **Deploy logs** - логи сборки и развертывания

## 🤝 Участие в разработке

1. **Форкните репозиторий**
2. **Создайте ветку для фичи:** `git checkout -b feature/amazing-feature`
3. **Сделайте коммит:** `git commit -m 'Add amazing feature'`
4. **Запушьте ветку:** `git push origin feature/amazing-feature`
5. **Создайте Pull Request**

### Правила разработки:
- Используйте TypeScript
- Следуйте ESLint правилам
- Пишите описательные коммиты
- Тестируйте на разных устройствах

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 📞 Поддержка

**Техническая поддержка:**
- GitHub Issues для багов и предложений
- Email: support@s-e-t-club.ru

**Полезные ссылки:**
- [Netlify Documentation](https://docs.netlify.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Social Elite Tennis** - Где спорт встречается со стилем! 🎾

**Сайт:** [https://s-e-t-club.ru](https://s-e-t-club.ru) | **Хостинг:** Netlify