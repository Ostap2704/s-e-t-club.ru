# ⚡ Быстрый старт: GitHub + Netlify

## 🎯 Цель
За 15 минут настроить автоматическое развертывание сайта s-e-t-club.ru

## 📋 Что нужно
- Аккаунт GitHub (создать на [github.com](https://github.com))
- Аккаунт Netlify (создать на [netlify.com](https://netlify.com))
- Данные Supabase (URL и ключ API)

## 🚀 Пошаговый план

### 1️⃣ GitHub (5 минут)
```bash
1. Зайти на github.com → Sign up (если нет аккаунта)
2. New repository → tennis-league-website
3. Загрузить все файлы проекта (drag & drop)
4. Commit changes
```

### 2️⃣ Netlify (5 минут)
```bash
1. Зайти на netlify.com → Sign up with GitHub
2. Add new site → Import from Git → GitHub
3. Выбрать tennis-league-website
4. Deploy site
```

### 3️⃣ Переменные окружения (3 минуты)
```bash
В Netlify: Site settings → Environment variables
Добавить:
- VITE_SUPABASE_URL=your_url
- VITE_SUPABASE_ANON_KEY=your_key
- VITE_DOMAIN=https://s-e-t-club.ru
- NODE_ENV=production
```

### 4️⃣ Домен (2 минуты)
```bash
В Netlify: Site settings → Domain management
Add custom domain: s-e-t-club.ru
Настроить DNS у регистратора (записи от Netlify)
```

## ✅ Проверка

После настройки:
- ✅ Временный Netlify URL работает
- ✅ Автообновления при git push
- ✅ Домен s-e-t-club.ru (через 2-48 часов)

## 🔄 Ежедневное использование

```bash
# Изменить код
git add .
git commit -m "Описание изменений"
git push origin main

# Сайт обновится автоматически через 2-5 минут
```

## 📞 Помощь

Подробные инструкции:
- `GITHUB-SETUP-STEP-BY-STEP.md` - настройка GitHub
- `NETLIFY-INTEGRATION.md` - настройка Netlify
- `GITHUB-COMMANDS.md` - команды Git

---

**🎾 Результат: Профессиональная система развертывания за 15 минут!**