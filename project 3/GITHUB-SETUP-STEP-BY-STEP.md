# 🚀 Пошаговая настройка GitHub

## Шаг 1: Создание аккаунта GitHub (если нет)

1. **Перейдите на [github.com](https://github.com)**
2. **Нажмите "Sign up"** в правом верхнем углу
3. **Заполните форму регистрации:**
   - Username (имя пользователя)
   - Email address
   - Password
4. **Подтвердите email** (проверьте почту)

## Шаг 2: Создание нового репозитория

1. **После входа в GitHub нажмите зеленую кнопку "New"** или "+" → "New repository"
2. **Заполните данные репозитория:**
   ```
   Repository name: tennis-league-website
   Description: Social Elite Tennis - Любительская теннисная лига
   Visibility: ✅ Public (или Private, если хотите приватный)
   
   НЕ СТАВЬТЕ галочки на:
   ❌ Add a README file
   ❌ Add .gitignore
   ❌ Choose a license
   ```
3. **Нажмите "Create repository"**

## Шаг 3: Подключение локального проекта к GitHub

После создания репозитория GitHub покажет инструкции. Выполните их:

### Вариант A: Через командную строку (если есть Git)

```bash
# В папке с проектом выполните:
git init
git add .
git commit -m "Initial commit: Tennis League website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tennis-league-website.git
git push -u origin main
```

**Замените `YOUR_USERNAME` на ваше имя пользователя GitHub!**

### Вариант B: Через веб-интерфейс GitHub (проще)

1. **В созданном репозитории нажмите "uploading an existing file"**
2. **Перетащите ВСЕ файлы проекта** в окно браузера
   - Включите все папки: `src/`, `public/`, `supabase/`, `.github/`
   - Включите файлы: `package.json`, `vite.config.ts`, `tailwind.config.js`, и т.д.
   - **НЕ загружайте:** `node_modules/`, `.env`, `dist/`
3. **В поле "Commit changes" напишите:** `Initial commit: Tennis League website`
4. **Нажмите "Commit changes"**

## Шаг 4: Проверка загрузки

После загрузки в репозитории должны быть:
- ✅ Папка `src/` с исходным кодом
- ✅ Папка `public/` со статическими файлами
- ✅ Папка `supabase/` с миграциями базы данных
- ✅ Папка `.github/` с GitHub Actions
- ✅ Файлы `package.json`, `vite.config.ts`, `netlify.toml`
- ✅ Файлы документации (README.md, DEPLOYMENT-GUIDE.md)

## Шаг 5: Настройка GitHub Actions (автоматически)

GitHub Actions уже настроены в папке `.github/workflows/`. Они будут:
- ✅ Автоматически тестировать код при каждом push
- ✅ Проверять код на ошибки (ESLint)
- ✅ Собирать проект для продакшена
- ✅ Интегрироваться с Netlify

## Шаг 6: Получение ссылки на репозиторий

Ваш репозиторий будет доступен по адресу:
```
https://github.com/YOUR_USERNAME/tennis-league-website
```

**Сохраните эту ссылку** - она понадобится для подключения к Netlify!

## 🔄 Следующий шаг: Подключение к Netlify

Теперь, когда GitHub настроен, можно подключить к Netlify:

1. **Зайдите на [netlify.com](https://netlify.com)**
2. **Войдите через GitHub аккаунт** (рекомендуется)
3. **Нажмите "Add new site" → "Import an existing project"**
4. **Выберите "GitHub"**
5. **Найдите репозиторий `tennis-league-website`**
6. **Настройки сборки заполнятся автоматически:**
   ```
   Build command: npm ci && npm run build
   Publish directory: dist
   ```
7. **Нажмите "Deploy site"**

## 📋 Что дальше?

После подключения к Netlify:

### 1. Настройте переменные окружения в Netlify
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

### 2. Добавьте домен s-e-t-club.ru
- Site settings → Domain management → Add custom domain

### 3. Настройте DNS у регистратора домена
- Netlify покажет нужные DNS записи

## 🎯 Результат

После настройки:
- ✅ Код хранится в GitHub
- ✅ Автоматическая сборка при изменениях
- ✅ Сайт доступен по адресу s-e-t-club.ru
- ✅ Обновления происходят автоматически за 2-5 минут

## ❓ Нужна помощь?

Если что-то не получается:
1. **Проверьте**, что все файлы загружены в GitHub
2. **Убедитесь**, что репозиторий публичный (или дайте доступ Netlify)
3. **Следуйте инструкциям** в файле `DEPLOYMENT-GUIDE.md`

---

**🚀 Готово! Теперь у вас есть профессиональная система развертывания!**