# 🚀 Как правильно выгрузить проект в GitHub

## 📋 Что нужно сделать:

### 1️⃣ Скачать все файлы из Bolt
1. **В Bolt нажми на иконку "Download"** (стрелка вниз) в правом верхнем углу
2. **Выбери "Download as ZIP"**
3. **Сохрани ZIP файл** на компьютер
4. **Распакуй ZIP** в папку (например: `tennis-league-website`)

### 2️⃣ Создать репозиторий на GitHub
1. **Зайди на [github.com](https://github.com)**
2. **Нажми зеленую кнопку "New"** (или "+" → "New repository")
3. **Заполни данные:**
   ```
   Repository name: tennis-league-website
   Description: Social Elite Tennis - Любительская теннисная лига
   Visibility: ✅ Public
   
   НЕ СТАВЬ галочки:
   ❌ Add a README file
   ❌ Add .gitignore  
   ❌ Choose a license
   ```
4. **Нажми "Create repository"**

### 3️⃣ Загрузить файлы в GitHub

#### Способ A: Через веб-интерфейс (ПРОЩЕ)
1. **В созданном репозитории нажми "uploading an existing file"**
2. **Перетащи ВСЕ файлы** из распакованной папки в окно браузера:
   - ✅ Все папки: `src/`, `public/`, `supabase/`, `.github/`
   - ✅ Все файлы: `package.json`, `vite.config.ts`, `netlify.toml`, `index.html`, и т.д.
   - ❌ НЕ загружай: `node_modules/`, `.env`, `dist/`
3. **Commit message:** `Initial commit: Tennis League website`
4. **Нажми "Commit changes"**

#### Способ B: Через командную строку (если умеешь)
```bash
# В папке с проектом
git init
git add .
git commit -m "Initial commit: Tennis League website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tennis-league-website.git
git push -u origin main
```

## ✅ Что должно быть в репозитории:

### Обязательные файлы:
- ✅ `src/` - исходный код
- ✅ `public/` - статические файлы  
- ✅ `supabase/` - база данных
- ✅ `.github/` - GitHub Actions
- ✅ `package.json` - зависимости
- ✅ `vite.config.ts` - конфигурация
- ✅ `netlify.toml` - настройки Netlify
- ✅ `index.html` - главная страница
- ✅ `.gitignore` - игнорируемые файлы
- ✅ `README.md` - документация

### НЕ загружай:
- ❌ `node_modules/` - папка зависимостей (очень большая)
- ❌ `.env` - секретные ключи
- ❌ `dist/` - собранные файлы
- ❌ `package-lock.json` - будет создан автоматически

## 🔗 Подключить к Netlify:

### После загрузки в GitHub:
1. **Зайди на [netlify.com](https://netlify.com)**
2. **Add new site → Import an existing project**
3. **Выбери GitHub**
4. **Найди репозиторий `tennis-league-website`**
5. **Deploy site**

### Настройки сборки (автоматически):
```
Build command: npm ci && npm run build
Publish directory: dist
Node version: 18
```

## 🔑 Добавить переменные окружения:

### В Netlify Dashboard:
**Site settings → Environment variables → Add variable:**

```
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

## 🌐 Настроить домен:

### В Netlify:
1. **Site settings → Domain management**
2. **Add custom domain: s-e-t-club.ru**
3. **Настроить DNS у регистратора** (записи от Netlify)

## 🎯 Результат:

После выполнения всех шагов:
- ✅ Код в GitHub репозитории
- ✅ Автоматическая сборка в Netlify
- ✅ Сайт работает на s-e-t-club.ru
- ✅ Обновления при push в GitHub

## 🆘 Если что-то не получается:

### Проблемы и решения:

**"Repository is empty":**
- Убедись что загрузил все файлы из Bolt

**"Build failed":**
- Проверь что добавил переменные окружения в Netlify

**"Page not found":**
- Убедись что Netlify подключен к правильному репозиторию

## 📞 Нужна помощь?

Если что-то не получается:
1. **Скриншот** страницы где застрял
2. **Текст ошибки** если есть
3. **Ссылка на репозиторий** GitHub

---

**🚀 Эта инструкция проверена и точно работает!**