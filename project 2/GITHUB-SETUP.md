# 📚 Настройка GitHub репозитория

## 🚀 Быстрый старт

### 1. Создание репозитория на GitHub

1. **Зайдите на [github.com](https://github.com)**
2. **Нажмите "New repository"**
3. **Заполните данные:**
   ```
   Repository name: tennis-league-website
   Description: Social Elite Tennis - Любительская теннисная лига
   Visibility: Public (или Private)
   ✅ Add a README file
   ✅ Add .gitignore (Node)
   ✅ Choose a license (MIT)
   ```
4. **Нажмите "Create repository"**

### 2. Клонирование и настройка локально

```bash
# Клонируйте созданный репозиторий
git clone https://github.com/YOUR_USERNAME/tennis-league-website.git
cd tennis-league-website

# Скопируйте файлы проекта в папку репозитория
# (все файлы из текущего проекта)

# Добавьте файлы в Git
git add .
git commit -m "Initial commit: Tennis League website"
git push origin main
```

### 3. Альтернативный способ (если проект уже существует)

```bash
# В папке с проектом инициализируйте Git
git init

# Добавьте remote origin
git remote add origin https://github.com/YOUR_USERNAME/tennis-league-website.git

# Добавьте файлы
git add .
git commit -m "Initial commit: Tennis League website"

# Создайте ветку main и запушьте
git branch -M main
git push -u origin main
```

## 🔧 Настройка GitHub для Netlify

### 1. Подключение к Netlify

1. **Зайдите на [netlify.com](https://netlify.com)**
2. **Войдите через GitHub аккаунт**
3. **"Add new site" → "Import an existing project"**
4. **Выберите "GitHub"**
5. **Найдите репозиторий `tennis-league-website`**
6. **Настройки сборки заполнятся автоматически:**
   ```
   Build command: npm ci && npm run build
   Publish directory: dist
   ```

### 2. Настройка автоматических развертываний

**В Netlify Dashboard:**
- **Site settings → Build & deploy → Continuous deployment**
- **Production branch:** `main`
- **Deploy contexts:** Production и Branch deploys

**Триггеры развертывания:**
- ✅ Автоматически при push в `main`
- ✅ Автоматически при Pull Request
- ✅ Ручное развертывание через Dashboard

## 📋 Структура репозитория

```
tennis-league-website/
├── .github/                 # GitHub конфигурация
│   └── workflows/          # GitHub Actions (опционально)
├── public/                 # Статические файлы
├── src/                    # Исходный код
├── supabase/              # База данных
├── .env.example           # Пример переменных окружения
├── .gitignore             # Игнорируемые файлы
├── netlify.toml           # Конфигурация Netlify
├── package.json           # Зависимости и скрипты
├── README.md              # Документация
└── vite.config.ts         # Конфигурация Vite
```

## 🔐 Настройка переменных окружения

### В GitHub (для разработки):
1. **Settings → Secrets and variables → Actions**
2. **New repository secret:**
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### В Netlify (для продакшена):
1. **Site settings → Environment variables**
2. **Add variable:**
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_DOMAIN=https://s-e-t-club.ru
   NODE_ENV=production
   ```

## 🏷️ Управление версиями

### Семантическое версионирование:
```
1.0.8 → 1.0.9 (patch - исправления)
1.0.9 → 1.1.0 (minor - новые функции)
1.1.0 → 2.0.0 (major - breaking changes)
```

### Создание релизов:
```bash
# Обновите версию в package.json
npm version patch  # или minor, major

# Создайте тег
git tag v1.0.9
git push origin v1.0.9

# Создайте релиз на GitHub
# Releases → Create a new release → выберите тег
```

## 🔄 Workflow разработки

### Ветки:
- `main` - продакшен (автоматически деплоится)
- `develop` - разработка
- `feature/feature-name` - новые функции
- `hotfix/fix-name` - срочные исправления

### Процесс:
1. **Создайте ветку:** `git checkout -b feature/new-feature`
2. **Разработайте функцию**
3. **Сделайте коммит:** `git commit -m "feat: add new feature"`
4. **Запушьте:** `git push origin feature/new-feature`
5. **Создайте Pull Request**
6. **После ревью → merge в main**

## 📊 GitHub Actions (опционально)

### Создайте `.github/workflows/ci.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Build project
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

## 🛡️ Безопасность репозитория

### Настройки безопасности:
1. **Settings → Security**
2. **Включите:**
   - ✅ Dependency graph
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates

### Защита веток:
1. **Settings → Branches**
2. **Add rule для `main`:**
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

## 📈 Мониторинг и аналитика

### GitHub Insights:
- **Pulse** - активность репозитория
- **Contributors** - участники
- **Traffic** - клоны и просмотры
- **Dependency graph** - зависимости

### Интеграция с Netlify:
- **Deploy status badge** в README
- **Автоматические комментарии** в PR с preview ссылками
- **Уведомления** о статусе сборки

## 🤝 Совместная работа

### Настройка команды:
1. **Settings → Manage access**
2. **Invite collaborators**
3. **Настройте роли:**
   - Admin - полный доступ
   - Write - push и merge
   - Read - только чтение

### Code review процесс:
1. **Создание PR** с описанием изменений
2. **Автоматические проверки** (CI/CD)
3. **Ревью кода** от коллег
4. **Merge** после одобрения

## 📞 Поддержка

### Полезные ссылки:
- [GitHub Docs](https://docs.github.com/)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Netlify + GitHub](https://docs.netlify.com/configure-builds/repo-permissions-linking/)

### Команды Git:
```bash
# Статус репозитория
git status

# История коммитов
git log --oneline

# Создание ветки
git checkout -b feature-name

# Слияние веток
git merge feature-name

# Отмена изменений
git reset --hard HEAD~1
```

---

**Результат:** Полностью настроенный GitHub репозиторий с автоматическим развертыванием на Netlify! 🚀