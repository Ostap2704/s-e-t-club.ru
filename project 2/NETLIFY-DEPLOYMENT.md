# 🚀 Развертывание на Netlify с доменом s-e-t-club.ru

## Шаг 1: Создание проекта в Netlify

### Вариант A: Через Git (Рекомендуется)
1. **Зайдите на [netlify.com](https://netlify.com)**
2. **Войдите в аккаунт** или создайте новый
3. **Нажмите "Add new site" → "Import an existing project"**
4. **Выберите GitHub/GitLab/Bitbucket**
5. **Выберите ваш репозиторий**

### Вариант B: Drag & Drop
1. **Соберите проект:**
   ```bash
   npm run build
   ```
2. **Перетащите папку `dist/`** на netlify.com

## Шаг 2: Настройки сборки (автоматически из netlify.toml)
- **Build command:** `npm ci && npm run build`
- **Publish directory:** `dist`
- **Node version:** `18`

## Шаг 3: Переменные окружения
В **Site settings → Environment variables** добавьте:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

## Шаг 4: Настройка домена s-e-t-club.ru

### В Netlify:
1. **Site settings → Domain management**
2. **Add custom domain → s-e-t-club.ru**
3. **Netlify покажет DNS записи**

### У регистратора домена:
Настройте следующие DNS записи:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

**Где найти your-site-name.netlify.app:**
- В Netlify Dashboard → Site overview
- Например: `amazing-tennis-123456.netlify.app`

## Шаг 5: Проверка

После настройки DNS (может занять до 48 часов):
- ✅ `https://s-e-t-club.ru` - основной сайт
- ✅ `https://www.s-e-t-club.ru` - перенаправление на основной
- ✅ SSL сертификат активен
- ✅ Автоматические развертывания при push в Git

## 🔧 Возможные проблемы

**DNS не распространился:**
- Проверьте на [whatsmydns.net](https://whatsmydns.net)
- Подождите до 48 часов

**Ошибка сборки:**
- Проверьте переменные окружения
- Убедитесь, что все зависимости установлены

**SSL не работает:**
- Подождите 24 часа после настройки DNS
- Проверьте правильность DNS записей

## 📞 Поддержка

Если нужна помощь:
1. Покажите скриншот ошибки
2. Поделитесь логами сборки
3. Укажите текущие DNS настройки

---

**Результат:** Сайт будет доступен по адресу https://s-e-t-club.ru с автоматическими развертываниями! 🎾