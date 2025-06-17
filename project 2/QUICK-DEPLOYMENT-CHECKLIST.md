# ⚡ Быстрый чеклист развертывания

## 🎯 За 15 минут от кода до рабочего сайта

### 1️⃣ GitHub (5 минут)
```
✅ Создать репозиторий tennis-league-website
✅ Загрузить все файлы проекта
✅ Убедиться, что есть: src/, public/, package.json, netlify.toml
```

### 2️⃣ Netlify (5 минут)
```
✅ Add new site → Import from Git → GitHub
✅ Выбрать tennis-league-website
✅ Deploy site (настройки автоматически из netlify.toml)
```

### 3️⃣ Переменные окружения (2 минуты)
```
✅ Site settings → Environment variables
✅ VITE_SUPABASE_URL=https://demo.supabase.co
✅ VITE_SUPABASE_ANON_KEY=demo-key
✅ VITE_DOMAIN=https://s-e-t-club.ru
✅ NODE_ENV=production
```

### 4️⃣ Домен (3 минуты)
```
✅ Site settings → Domain management
✅ Add custom domain: s-e-t-club.ru
✅ Настроить DNS у регистратора (записи от Netlify)
```

## 🔍 Проверка работы

### Сразу после настройки:
- ✅ Временный URL работает: `https://amazing-name-123456.netlify.app`
- ✅ Автообновления: изменить файл в GitHub → сайт обновится

### Через 2-48 часов:
- ✅ Домен работает: `https://s-e-t-club.ru`
- ✅ SSL сертификат активен

## 🚨 Если что-то не работает:

### "Page not found" в Netlify:
1. Проверьте, что репозиторий подключен
2. Убедитесь, что файлы загружены в GitHub
3. Trigger deploy

### Ошибка сборки:
1. Добавьте переменные окружения
2. Проверьте логи в Netlify Deploys

### Домен не работает:
1. Проверьте DNS записи
2. Подождите до 48 часов

---

**🎯 Результат: Рабочий сайт с автообновлениями на домене s-e-t-club.ru**