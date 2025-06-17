# 🚀 БЫСТРОЕ ИСПРАВЛЕНИЕ NETLIFY

## 🎯 ПРОБЛЕМА: Сайт не привязан к проекту

Ваш сайт `sparkling-figolla-cdb01f.netlify.app` показывает "broken link" потому что он не привязан к коду проекта.

## ✅ РЕШЕНИЕ: Привязать Git репозиторий

### Шаг 1: Зайдите в Netlify Dashboard
1. Откройте [app.netlify.com](https://app.netlify.com)
2. Найдите сайт "sparkling-figolla-cdb01f"
3. Нажмите на него

### Шаг 2: Подключите Git репозиторий
1. **Site settings → Build & deploy**
2. **Continuous deployment → Link repository**
3. **Выберите GitHub** (или ваш Git провайдер)
4. **Найдите репозиторий** с кодом теннисного сайта
5. **Выберите ветку:** `main`

### Шаг 3: Настройте сборку
Убедитесь, что настройки такие:
```
Build command: npm ci && npm run build
Publish directory: dist
```

### Шаг 4: Добавьте переменные окружения
**Site settings → Environment variables:**
```
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

### Шаг 5: Запустите сборку
1. **Deploys → Trigger deploy → Deploy site**
2. **Ждите 3-5 минут**

## 🔄 АЛЬТЕРНАТИВНЫЙ СПОСОБ: Создать новый сайт

Если привязка не работает:

### 1. Создайте новый сайт
1. **Add new site → Import an existing project**
2. **Выберите GitHub**
3. **Найдите ваш репозиторий**
4. **Deploy site**

### 2. Настройте домен
1. **Site settings → Domain management**
2. **Add custom domain: s-e-t-club.ru**

## 📋 ЧТО ДОЛЖНО ПОЛУЧИТЬСЯ:

✅ Временный URL работает  
✅ Сайт показывает контент  
✅ Автоматические обновления при push в Git  
✅ Домен s-e-t-club.ru настроен  

## 🆘 ЕСЛИ НИЧЕГО НЕ РАБОТАЕТ:

Удалите старый сайт и создайте новый:
1. **Site settings → General → Delete this site**
2. **Add new site → Import an existing project**
3. **Подключите Git репозиторий**
4. **Настройте переменные окружения**

---

**🎯 ЦЕЛЬ: Получить рабочий сайт на https://s-e-t-club.ru**