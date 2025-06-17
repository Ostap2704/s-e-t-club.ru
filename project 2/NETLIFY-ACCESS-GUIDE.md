# 🔐 Настройка доступа к Netlify

## 1. Создание аккаунта Netlify

### Регистрация:
1. **Перейдите на [netlify.com](https://netlify.com)**
2. **Нажмите "Sign up"**
3. **Выберите способ регистрации:**
   - GitHub (рекомендуется)
   - GitLab
   - Bitbucket
   - Email

### Подключение Git репозитория:
- При регистрации через GitHub/GitLab/Bitbucket доступ к репозиториям настраивается автоматически
- Netlify получит права на чтение ваших репозиториев

## 2. Создание сайта

### Автоматическое развертывание:
1. **В Netlify Dashboard нажмите "Add new site"**
2. **Выберите "Import an existing project"**
3. **Выберите Git провайдера (GitHub/GitLab/Bitbucket)**
4. **Найдите и выберите ваш репозиторий**
5. **Настройки сборки (заполнятся автоматически из netlify.toml):**
   ```
   Build command: npm ci && npm run build
   Publish directory: dist
   ```

### Ручное развертывание:
1. **Соберите проект локально:**
   ```bash
   npm run build
   ```
2. **Перетащите папку `dist/` на netlify.com**

## 3. Настройка переменных окружения

### В Netlify Dashboard:
1. **Site settings → Environment variables**
2. **Add variable** для каждой переменной:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

### Где взять Supabase данные:
1. **Зайдите в [supabase.com](https://supabase.com)**
2. **Выберите ваш проект**
3. **Settings → API**
4. **Скопируйте:**
   - Project URL → `VITE_SUPABASE_URL`
   - anon public → `VITE_SUPABASE_ANON_KEY`

## 4. Настройка домена s-e-t-club.ru

### В Netlify:
1. **Site settings → Domain management**
2. **Add custom domain**
3. **Введите: `s-e-t-club.ru`**
4. **Netlify покажет DNS записи для настройки**

### У регистратора домена:
Добавьте DNS записи, которые показал Netlify:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

**Пример для разных регистраторов:**

#### Reg.ru:
1. Личный кабинет → Домены → s-e-t-club.ru
2. DNS-серверы и управление зоной
3. Добавить записи

#### Cloudflare:
1. DNS → Add record
2. Добавить A и CNAME записи
3. Отключить Proxy (серая тучка)

#### Namecheap:
1. Domain List → Manage → Advanced DNS
2. Add New Record

## 5. Проверка развертывания

### Автоматические проверки:
- ✅ Сборка проходит без ошибок
- ✅ Сайт доступен по временному URL
- ✅ Переменные окружения загружены
- ✅ SSL сертификат выпущен

### Ручная проверка:
1. **Откройте временный URL** (например: amazing-tennis-123456.netlify.app)
2. **Проверьте основные функции:**
   - Загрузка страниц
   - Работа навигации
   - Подключение к Supabase

## 6. Мониторинг и управление

### Netlify Dashboard:
- **Deploys** - история развертываний
- **Functions** - серверные функции (если используются)
- **Analytics** - статистика посещений
- **Forms** - обработка форм

### Автоматические развертывания:
- При каждом push в основную ветку Git
- Можно настроить для других веток
- Возможность отключить автоматические развертывания

## 7. Безопасность

### Настроенные заголовки безопасности:
```
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### Рекомендации:
- Используйте HTTPS для всех запросов
- Регулярно обновляйте зависимости
- Мониторьте логи развертывания

## 8. Troubleshooting

### Частые проблемы:

**Ошибка сборки:**
```bash
# Проверьте локально
npm ci
npm run build
```

**DNS не работает:**
- Подождите до 48 часов
- Проверьте на whatsmydns.net

**Supabase не подключается:**
- Проверьте переменные окружения
- Убедитесь в правильности URL и ключей

**404 ошибки:**
- Проверьте настройки переадресации в netlify.toml
- Убедитесь, что React Router настроен правильно

## 9. Полезные команды

```bash
# Локальная сборка
npm run build

# Предварительный просмотр
npm run preview

# Проверка переменных окружения
echo $VITE_SUPABASE_URL

# Проверка DNS
nslookup s-e-t-club.ru
```

## 10. Контакты поддержки

- **Netlify Support:** [support.netlify.com](https://support.netlify.com)
- **Документация:** [docs.netlify.com](https://docs.netlify.com)
- **Community:** [community.netlify.com](https://community.netlify.com)

---

**Результат:** После выполнения всех шагов ваш сайт будет доступен по адресу https://s-e-t-club.ru с автоматическими развертываниями! 🎾