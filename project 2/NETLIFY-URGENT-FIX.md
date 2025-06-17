# 🚨 СРОЧНОЕ ИСПРАВЛЕНИЕ: Page not found

## 🔍 ПРОБЛЕМА
Сайт показывает "Page not found" потому что он не привязан к вашему коду.

## ✅ РЕШЕНИЕ (5 минут)

### Шаг 1: Зайдите в Netlify Dashboard
1. Откройте [app.netlify.com](https://app.netlify.com)
2. Найдите ваш сайт (может называться случайным именем)

### Шаг 2: Подключите Git репозиторий
1. **Site settings → Build & deploy**
2. **Continuous deployment → Link repository**
3. **Выберите GitHub**
4. **Найдите репозиторий** `tennis-league-website`
5. **Настройки сборки:**
   ```
   Build command: npm ci && npm run build
   Publish directory: dist
   Branch: main
   ```

### Шаг 3: Добавьте переменные окружения
**Site settings → Environment variables:**
```
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

### Шаг 4: Запустите сборку
1. **Deploys → Trigger deploy → Deploy site**
2. **Ждите 3-5 минут**

## 🔄 АЛЬТЕРНАТИВНЫЙ СПОСОБ: Создать новый сайт

Если привязка не работает:

### 1. Удалите старый сайт
1. **Site settings → General → Delete this site**

### 2. Создайте новый сайт
1. **Add new site → Import an existing project**
2. **Выберите GitHub**
3. **Найдите ваш репозиторий `tennis-league-website`**
4. **Deploy site**

### 3. Настройте переменные окружения
```
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

### 4. Настройте домен
1. **Site settings → Domain management**
2. **Add custom domain: s-e-t-club.ru**

## 📋 ЧТО ДОЛЖНО ПОЛУЧИТЬСЯ:

✅ Временный URL работает  
✅ Сайт показывает контент  
✅ Автоматические обновления при push в Git  
✅ Домен s-e-t-club.ru настроен  

## 🆘 ЕСЛИ НИЧЕГО НЕ РАБОТАЕТ:

### Экстренный способ - ручная загрузка:
1. **Скачайте репозиторий** как ZIP
2. **Соберите локально:**
   ```bash
   npm install
   npm run build
   ```
3. **Перетащите папку `dist/`** в Netlify

---

**🎯 ЦЕЛЬ: Получить рабочий сайт на https://s-e-t-club.ru**

## 🔍 Возможные причины ошибки в моей инструкции:

1. **Я не указал четко** - нужно ОБЯЗАТЕЛЬНО подключить GitHub репозиторий
2. **Пропустил шаг** - добавление переменных окружения СРАЗУ после создания сайта
3. **Не предупредил** - что Netlify может создать пустой сайт без кода

**Извините за путаницу! Следуйте этой инструкции - она точно сработает.**