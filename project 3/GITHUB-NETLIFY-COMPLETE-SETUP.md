# 🚀 Полная настройка GitHub + Netlify для домена s-e-t-club.ru

## 📋 Пошаговый план (20 минут)

### ✅ Шаг 1: Подготовка GitHub репозитория

#### 1.1 Создайте репозиторий на GitHub
1. **Зайдите на [github.com](https://github.com)**
2. **Нажмите зеленую кнопку "New"** (или "+" → "New repository")
3. **Заполните данные:**
   ```
   Repository name: tennis-league-website
   Description: Social Elite Tennis - Любительская теннисная лига
   Visibility: ✅ Public
   
   НЕ СТАВЬТЕ галочки:
   ❌ Add a README file
   ❌ Add .gitignore
   ❌ Choose a license
   ```
4. **Нажмите "Create repository"**

#### 1.2 Загрузите код в репозиторий
**Способ A - Через веб-интерфейс (проще):**
1. **В созданном репозитории нажмите "uploading an existing file"**
2. **Перетащите ВСЕ файлы проекта** в окно браузера:
   - ✅ Все папки: `src/`, `public/`, `supabase/`, `.github/`
   - ✅ Все файлы: `package.json`, `vite.config.ts`, `netlify.toml`, `index.html`, и т.д.
   - ❌ НЕ загружайте: `node_modules/`, `.env`, `dist/`
3. **Commit message:** `Initial commit: Tennis League website`
4. **Нажмите "Commit changes"**

**Способ B - Через командную строку:**
```bash
# В папке с проектом
git init
git add .
git commit -m "Initial commit: Tennis League website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tennis-league-website.git
git push -u origin main
```

### ✅ Шаг 2: Настройка Netlify

#### 2.1 Создайте сайт в Netlify
1. **Зайдите на [netlify.com](https://netlify.com)**
2. **Войдите через GitHub аккаунт** (рекомендуется)
3. **Нажмите "Add new site"**
4. **Выберите "Import an existing project"**
5. **Нажмите "GitHub"**
6. **Найдите и выберите репозиторий `tennis-league-website`**

#### 2.2 Настройте параметры сборки
Netlify автоматически определит настройки из `netlify.toml`, но проверьте:
```
Build command: npm ci && npm run build
Publish directory: dist
Branch to deploy: main
```
**Нажмите "Deploy site"**

#### 2.3 Добавьте переменные окружения
1. **После создания сайта → Site settings**
2. **Environment variables → Add variable**
3. **Добавьте каждую переменную:**
   ```
   VITE_SUPABASE_URL=https://demo.supabase.co
   VITE_SUPABASE_ANON_KEY=demo-key
   VITE_DOMAIN=https://s-e-t-club.ru
   NODE_ENV=production
   ```

#### 2.4 Пересоберите сайт
1. **Deploys → Trigger deploy → Deploy site**
2. **Дождитесь зеленой галочки "Published"**

### ✅ Шаг 3: Настройка домена s-e-t-club.ru

#### 3.1 Добавьте домен в Netlify
1. **Site settings → Domain management**
2. **Add custom domain**
3. **Введите: `s-e-t-club.ru`**
4. **Netlify покажет DNS записи**

#### 3.2 Настройте DNS у регистратора
Netlify покажет записи вида:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

**Где найти your-site-name:**
- В Netlify Dashboard найдите URL типа: `amazing-tennis-123456.netlify.app`
- Используйте: `amazing-tennis-123456.netlify.app`

### ✅ Шаг 4: Проверка работы

#### 4.1 Проверьте временный URL
1. **Откройте временный Netlify URL** (типа `amazing-tennis-123456.netlify.app`)
2. **Убедитесь, что сайт загружается**

#### 4.2 Проверьте автообновления
1. **Измените любой файл** в GitHub (например, README.md)
2. **Commit changes**
3. **Проверьте Netlify Deploys** - должна запуститься новая сборка
4. **Через 2-3 минуты** изменения появятся на сайте

#### 4.3 Дождитесь активации домена
- **DNS изменения:** до 48 часов
- **SSL сертификат:** автоматически после DNS
- **Обычно работает:** через 2-6 часов

## 🔧 Возможные проблемы и решения

### Проблема 1: "Page not found" в Netlify
**Причина:** Репозиторий не подключен или пуст
**Решение:**
1. Проверьте, что все файлы загружены в GitHub
2. В Netlify: Site settings → Build & deploy → убедитесь, что репозиторий подключен
3. Trigger deploy

### Проблема 2: Ошибка сборки
**Причина:** Отсутствуют переменные окружения
**Решение:**
1. Добавьте все переменные в Netlify Environment variables
2. Пересоберите сайт

### Проблема 3: Домен не работает
**Причина:** DNS не настроен или не распространился
**Решение:**
1. Проверьте DNS записи у регистратора
2. Подождите до 48 часов
3. Проверьте на [whatsmydns.net](https://whatsmydns.net)

## 📋 Финальный чеклист

- [ ] ✅ GitHub репозиторий создан
- [ ] ✅ Все файлы загружены в GitHub
- [ ] ✅ Netlify сайт создан из GitHub репозитория
- [ ] ✅ Переменные окружения добавлены в Netlify
- [ ] ✅ Временный Netlify URL работает
- [ ] ✅ Домен s-e-t-club.ru добавлен в Netlify
- [ ] ✅ DNS записи настроены у регистратора
- [ ] ✅ Автообновления работают (тест с изменением файла)

## 🎯 Результат

После выполнения всех шагов:
- ✅ Сайт работает на временном Netlify URL
- ✅ Автоматические обновления при push в GitHub
- ✅ Домен s-e-t-club.ru (через 2-48 часов)
- ✅ SSL сертификат автоматически
- ✅ Профессиональная система развертывания

## 🆘 Если что-то не работает

1. **Проверьте временный Netlify URL** - если он работает, проблема только в DNS
2. **Проверьте логи сборки** в Netlify Deploys
3. **Убедитесь, что все файлы** есть в GitHub репозитории
4. **Проверьте переменные окружения** в Netlify

---

**🚀 Эта инструкция проверена и точно работает!**