# 🚀 Настройка GitHub + Netlify для автоматического развертывания

## 📋 Пошаговая инструкция

### Шаг 1: Создание GitHub репозитория

1. **Зайдите на [github.com](https://github.com)**
2. **Нажмите "New repository" (зеленая кнопка)**
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

### Шаг 2: Загрузка кода в GitHub

#### Вариант A: Через GitHub веб-интерфейс (проще)

1. **В созданном репозитории нажмите "uploading an existing file"**
2. **Перетащите все файлы проекта** (кроме node_modules, .env, dist)
3. **Добавьте commit message:** "Initial commit: Tennis League website"
4. **Нажмите "Commit changes"**

#### Вариант B: Через командную строку

```bash
# В папке с проектом
git init
git add .
git commit -m "Initial commit: Tennis League website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tennis-league-website.git
git push -u origin main
```

### Шаг 3: Подключение GitHub к Netlify

1. **Зайдите в [Netlify Dashboard](https://app.netlify.com)**
2. **Нажмите "Add new site"**
3. **Выберите "Import an existing project"**
4. **Выберите "GitHub"**
5. **Авторизуйте Netlify** в GitHub (если еще не сделано)
6. **Выберите репозиторий** `tennis-league-website`
7. **Настройки сборки:**
   ```
   Branch to deploy: main
   Build command: npm ci && npm run build
   Publish directory: dist
   ```
8. **Нажмите "Deploy site"**

### Шаг 4: Настройка переменных окружения в Netlify

1. **В Netlify Dashboard → Site settings → Environment variables**
2. **Добавьте переменные:**
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_DOMAIN=https://s-e-t-club.ru
   NODE_ENV=production
   ```

### Шаг 5: Настройка домена s-e-t-club.ru

1. **В Netlify Dashboard → Site settings → Domain management**
2. **Нажмите "Add custom domain"**
3. **Введите:** `s-e-t-club.ru`
4. **Netlify покажет DNS записи для настройки**

### Шаг 6: Настройка DNS у регистратора

Добавьте DNS записи, которые показал Netlify:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

**Где найти your-site-name:**
- В Netlify Dashboard найдите URL вида: `amazing-tennis-123456.netlify.app`

## 🔄 Как работают автоматические обновления

### После настройки:

1. **Вы изменяете код** локально или через GitHub веб-интерфейс
2. **Делаете commit и push** в ветку `main`
3. **Netlify автоматически:**
   - Получает изменения из GitHub
   - Запускает сборку (`npm ci && npm run build`)
   - Публикует обновленный сайт
   - Уведомляет о статусе

### Время обновления:
- **Обычно:** 2-5 минут
- **Максимум:** до 10 минут

## ✅ Проверка работы автообновлений

### Тест 1: Изменение через GitHub веб-интерфейс
1. **Откройте файл** `src/pages/HomePage.tsx` в GitHub
2. **Нажмите кнопку редактирования** (карандаш)
3. **Измените заголовок** на странице
4. **Commit changes**
5. **Проверьте Netlify Deploys** - должна запуститься новая сборка
6. **Через 3-5 минут** изменения появятся на сайте

### Тест 2: Изменение через Git
```bash
# Клонируйте репозиторий
git clone https://github.com/YOUR_USERNAME/tennis-league-website.git
cd tennis-league-website

# Внесите изменения
echo "# Обновление" >> README.md

# Отправьте изменения
git add .
git commit -m "Test auto-deployment"
git push origin main

# Проверьте Netlify - должна запуститься сборка
```

## 🔧 Настройка уведомлений

### Email уведомления:
1. **Netlify Dashboard → Site settings → Build & deploy**
2. **Deploy notifications → Add notification**
3. **Выберите "Email"**
4. **Настройте события:**
   - ✅ Deploy started
   - ✅ Deploy succeeded
   - ✅ Deploy failed

### Slack уведомления (опционально):
1. **Создайте Slack webhook**
2. **Добавьте в Netlify notifications**
3. **Получайте уведомления в Slack**

## 🌟 Дополнительные возможности

### GitHub Actions (CI/CD)
Файл `.github/workflows/deploy.yml` уже настроен для:
- ✅ Автоматического тестирования
- ✅ Проверки кода (ESLint)
- ✅ Сборки проекта
- ✅ Deploy на Netlify

### Branch deployments
- **main** → Production (s-e-t-club.ru)
- **develop** → Staging (автоматический preview)
- **feature branches** → Preview URLs

### Deploy previews
- Каждый Pull Request получает уникальный URL для тестирования
- Автоматические комментарии в PR с ссылкой на preview

## 🛠️ Troubleshooting

### Проблема: Сборка не запускается
**Решение:**
1. Проверьте подключение репозитория в Netlify
2. Убедитесь, что webhook настроен в GitHub
3. Проверьте права доступа Netlify к репозиторию

### Проблема: Сборка падает с ошибкой
**Решение:**
1. Проверьте логи в Netlify Deploys
2. Убедитесь, что все переменные окружения настроены
3. Проверьте, что `package.json` и `netlify.toml` корректны

### Проблема: Изменения не отображаются
**Решение:**
1. Очистите кэш браузера (Ctrl+F5)
2. Проверьте, что deploy завершился успешно
3. Подождите 5-10 минут для распространения CDN

## 📞 Поддержка

### Полезные ссылки:
- [Netlify + GitHub Integration](https://docs.netlify.com/configure-builds/repo-permissions-linking/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Netlify Build Configuration](https://docs.netlify.com/configure-builds/file-based-configuration/)

### Команды Git для ежедневной работы:
```bash
# Получить последние изменения
git pull origin main

# Создать новую ветку для фичи
git checkout -b feature/new-feature

# Добавить изменения
git add .
git commit -m "Add new feature"

# Отправить изменения
git push origin feature/new-feature

# Создать Pull Request через GitHub веб-интерфейс
```

---

**🎯 Результат:** После выполнения всех шагов ваш сайт будет автоматически обновляться при каждом изменении в GitHub! 🚀

**Время настройки:** 15-20 минут  
**Время первого deploy:** 3-5 минут  
**Время последующих обновлений:** 2-3 минуты