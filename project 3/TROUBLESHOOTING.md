# 🔧 Устранение неполадок - Белый экран

## 🚨 Проблема: Белый экран на продакшене

### Возможные причины:
1. **Отсутствуют переменные окружения**
2. **Ошибка JavaScript**
3. **Проблема с Supabase подключением**
4. **Неправильная сборка**

## 🔍 Диагностика

### 1. Проверьте консоль браузера
1. **Откройте сайт:** https://s-e-t-club.ru
2. **Нажмите F12** (Developer Tools)
3. **Перейдите на вкладку Console**
4. **Ищите ошибки** (красные сообщения)

### 2. Проверьте переменные окружения в Netlify
1. **Зайдите в Netlify Dashboard**
2. **Site settings → Environment variables**
3. **Убедитесь, что есть:**
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   VITE_DOMAIN=https://s-e-t-club.ru
   NODE_ENV=production
   ```

### 3. Проверьте логи сборки
1. **Netlify Dashboard → Deploys**
2. **Нажмите на последний deploy**
3. **Проверьте Deploy log** на ошибки

## 🛠️ Решения

### Решение 1: Добавить переменные окружения
```bash
# В Netlify Dashboard → Site settings → Environment variables
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

### Решение 2: Пересобрать и переразвернуть
1. **В Netlify Dashboard:**
2. **Deploys → Trigger deploy → Deploy site**

### Решение 3: Проверить Supabase настройки
1. **Зайдите в Supabase Dashboard**
2. **Settings → API**
3. **Скопируйте правильные URL и ключи**
4. **Обновите в Netlify**

### Решение 4: Локальная проверка
```bash
# Клонируйте репозиторий
git clone https://github.com/YOUR_USERNAME/tennis-league-website.git
cd tennis-league-website

# Установите зависимости
npm install

# Создайте .env файл
cp .env.example .env

# Добавьте ваши переменные в .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_DOMAIN=http://localhost:5173

# Запустите локально
npm run dev
```

## 🔍 Частые ошибки и решения

### Ошибка: "Missing Supabase environment variables"
**Решение:**
1. Добавьте переменные в Netlify
2. Пересоберите сайт

### Ошибка: "Failed to fetch"
**Решение:**
1. Проверьте Supabase URL
2. Убедитесь, что проект Supabase активен
3. Проверьте CORS настройки в Supabase

### Ошибка: "Chunk load error"
**Решение:**
1. Очистите кэш браузера
2. Попробуйте в режиме инкогнито
3. Пересоберите сайт в Netlify

### Ошибка: "Network Error"
**Решение:**
1. Проверьте интернет соединение
2. Убедитесь, что Supabase доступен
3. Проверьте настройки файрвола

## 📋 Чеклист для исправления

- [ ] Переменные окружения добавлены в Netlify
- [ ] Supabase URL и ключи правильные
- [ ] Сайт пересобран после добавления переменных
- [ ] Консоль браузера проверена на ошибки
- [ ] Логи сборки Netlify проверены
- [ ] Supabase проект активен и доступен
- [ ] DNS настроен правильно
- [ ] SSL сертификат активен

## 🆘 Если ничего не помогает

### Временное решение - Mock данные:
1. **Отключите Supabase** временно
2. **Используйте mock данные** из `src/lib/mockData.ts`
3. **Сайт заработает** без базы данных

### Полный сброс:
1. **Удалите сайт** в Netlify
2. **Создайте заново** из Git репозитория
3. **Настройте переменные** с нуля
4. **Переразверните**

## 📞 Получить помощь

### Информация для поддержки:
1. **URL сайта:** https://s-e-t-club.ru
2. **Ошибки из консоли** (скриншот)
3. **Логи сборки Netlify** (скриншот)
4. **Переменные окружения** (без значений, только названия)

### Контакты:
- **Netlify Support:** [support.netlify.com](https://support.netlify.com)
- **Supabase Support:** [supabase.com/support](https://supabase.com/support)

---

**🎯 Цель:** Исправить белый экран и запустить сайт https://s-e-t-club.ru**