# 🔧 Исправление белого экрана на Netlify

## 🚨 Проблема: Белый экран на sparkling-figolla-cdb01f.netlify.app

### Причина:
Сайт не загружается из-за отсутствующих переменных окружения или ошибок JavaScript.

## 🛠️ СРОЧНОЕ ИСПРАВЛЕНИЕ

### Шаг 1: Добавьте переменные окружения в Netlify

1. **Зайдите в [Netlify Dashboard](https://app.netlify.com)**
2. **Найдите сайт "sparkling-figolla-cdb01f"**
3. **Site settings → Environment variables**
4. **Add variable для каждой переменной:**

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

### Шаг 2: Получите правильные Supabase данные

1. **Зайдите на [supabase.com](https://supabase.com)**
2. **Выберите ваш проект**
3. **Settings → API**
4. **Скопируйте:**
   - **Project URL** → это ваш `VITE_SUPABASE_URL`
   - **anon public** → это ваш `VITE_SUPABASE_ANON_KEY`

### Шаг 3: Пересоберите сайт

1. **В Netlify Dashboard**
2. **Deploys → Trigger deploy → Deploy site**
3. **Дождитесь завершения сборки** (2-3 минуты)

## 🔍 Если не знаете Supabase данные

### Временное решение - отключить Supabase:

1. **В Netlify Environment variables добавьте:**
```
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
REACT_APP_USE_MOCK_DATA=true
```

2. **Пересоберите сайт**
3. **Сайт заработает с демо-данными**

## 📋 Пошаговая инструкция

### 1. Откройте Netlify Dashboard
- Перейдите на [app.netlify.com](https://app.netlify.com)
- Найдите сайт "sparkling-figolla-cdb01f"

### 2. Добавьте переменные окружения
- Site settings → Environment variables
- Add variable (4 раза для каждой переменной)

### 3. Настройте домен
- Site settings → Domain management
- Add custom domain: `s-e-t-club.ru`

### 4. Пересоберите
- Deploys → Trigger deploy → Deploy site

## 🚀 После исправления

1. **Временный URL заработает:** `https://sparkling-figolla-cdb01f.netlify.app`
2. **Настройте DNS** у регистратора домена:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: sparkling-figolla-cdb01f.netlify.app
   ```

3. **Через 24-48 часов** домен s-e-t-club.ru заработает

## ⚡ Экстренный запуск (если нет Supabase)

Если у вас нет настроенного Supabase проекта, можно запустить сайт с демо-данными:

1. **Добавьте в Netlify Environment variables:**
```
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

2. **Пересоберите сайт**
3. **Сайт заработает** с предустановленными турнирами и данными

## 📞 Нужна помощь?

Если не получается:
1. **Скриншот** страницы Environment variables в Netlify
2. **Скриншот** логов сборки (Deploy log)
3. **Сообщите**, есть ли у вас Supabase проект

---

**🎯 Главное:** Добавьте переменные окружения в Netlify и пересоберите сайт. Это исправит белый экран!