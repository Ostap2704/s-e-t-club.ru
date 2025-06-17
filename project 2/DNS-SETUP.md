# Настройка DNS для домена s-e-t-club.ru на Netlify

## 🌐 Пошаговая инструкция настройки DNS

### Шаг 1: Развертывание на Netlify

1. **Создайте новый сайт на Netlify:**
   - Зайдите на [netlify.com](https://netlify.com)
   - Нажмите "New site from Git"
   - Подключите ваш Git репозиторий
   - Настройки сборки:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: `18`

2. **Добавьте переменные окружения:**
   В настройках сайта → Environment variables добавьте:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_DOMAIN=https://s-e-t-club.ru
   NODE_ENV=production
   ```

### Шаг 2: Добавление кастомного домена

1. **В настройках Netlify:**
   - Перейдите в "Domain management"
   - Нажмите "Add custom domain"
   - Введите: `s-e-t-club.ru`
   - Подтвердите владение доменом

2. **Получите DNS записи:**
   Netlify покажет вам DNS записи для настройки:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME  
   Name: www
   Value: your-site-name.netlify.app
   ```

### Шаг 3: Настройка DNS у регистратора

#### Если домен на Reg.ru:

1. **Войдите в личный кабинет Reg.ru**
2. **Перейдите к управлению доменом s-e-t-club.ru**
3. **Настройте DNS записи:**
   - Удалите существующие A и CNAME записи
   - Добавьте записи от Netlify:
   ```
   Тип: A
   Имя: @
   Значение: 75.2.60.5
   TTL: 3600

   Тип: CNAME
   Имя: www  
   Значение: your-site-name.netlify.app
   TTL: 3600
   ```

#### Если домен на другом регистраторе:

**Cloudflare:**
1. DNS → Add record
2. Добавьте A и CNAME записи от Netlify
3. Убедитесь, что Proxy status отключен (серая тучка)

**Namecheap:**
1. Domain List → Manage → Advanced DNS
2. Добавьте записи от Netlify

**GoDaddy:**
1. My Products → DNS
2. Добавьте записи от Netlify

### Шаг 4: Проверка и ожидание

1. **Проверка DNS распространения:**
   - Используйте [whatsmydns.net](https://whatsmydns.net)
   - Введите `s-e-t-club.ru` и проверьте A записи
   - DNS изменения могут занять до 48 часов

2. **Автоматический SSL:**
   - Netlify автоматически выпустит SSL сертификат
   - После успешной настройки DNS

### Шаг 5: Финальная проверка

✅ **Проверьте URL:**
- `https://s-e-t-club.ru` - основной сайт
- `https://www.s-e-t-club.ru` - должен перенаправлять на основной
- SSL сертификат должен быть активен

## 🔧 Возможные проблемы

**Сайт не открывается:**
- Проверьте правильность DNS записей
- Подождите распространения DNS (до 48 часов)
- Очистите кэш браузера

**SSL не работает:**
- Убедитесь, что DNS настроен правильно
- Подождите до 24 часов для выпуска сертификата

## 📋 Чек-лист

- [ ] Сайт развернут на Netlify
- [ ] Переменные окружения настроены
- [ ] Кастомный домен добавлен в Netlify
- [ ] DNS записи настроены у регистратора
- [ ] DNS распространился (проверено)
- [ ] SSL сертификат активен
- [ ] Сайт открывается по HTTPS
- [ ] Переадресация с www работает

---

**После выполнения всех шагов сайт будет доступен по адресу https://s-e-t-club.ru! 🚀**