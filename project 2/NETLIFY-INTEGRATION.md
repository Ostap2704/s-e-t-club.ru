# 🔗 Интеграция с Netlify

## 🎯 Цель
Настроить автоматическое развертывание сайта https://s-e-t-club.ru с GitHub на Netlify.

## 📋 Предварительные требования

✅ **GitHub репозиторий создан** (следуйте `GITHUB-SETUP-STEP-BY-STEP.md`)  
✅ **Код загружен в GitHub**  
✅ **У вас есть ссылка на репозиторий**

## 🚀 Шаг 1: Регистрация в Netlify

1. **Перейдите на [netlify.com](https://netlify.com)**
2. **Нажмите "Sign up"**
3. **Выберите "GitHub"** для входа (рекомендуется)
4. **Авторизуйте Netlify** в вашем GitHub аккаунте

## 🔗 Шаг 2: Подключение репозитория

1. **В Netlify Dashboard нажмите "Add new site"**
2. **Выберите "Import an existing project"**
3. **Нажмите "GitHub"**
4. **Найдите репозиторий `tennis-league-website`**
5. **Нажмите на него**

## ⚙️ Шаг 3: Настройка сборки

Netlify автоматически определит настройки из `netlify.toml`:

```
Build command: npm ci && npm run build
Publish directory: dist
Node version: 18
```

**Просто нажмите "Deploy site"** - настройки уже правильные!

## 🔧 Шаг 4: Добавление переменных окружения

1. **После создания сайта перейдите в "Site settings"**
2. **Найдите "Environment variables"**
3. **Нажмите "Add variable"** для каждой переменной:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

### 🔍 Где взять Supabase данные:

1. **Зайдите на [supabase.com](https://supabase.com)**
2. **Выберите ваш проект**
3. **Settings → API**
4. **Скопируйте:**
   - **Project URL** → это ваш `VITE_SUPABASE_URL`
   - **anon public** → это ваш `VITE_SUPABASE_ANON_KEY`

## 🌐 Шаг 5: Настройка домена s-e-t-club.ru

1. **В Netlify Dashboard → Site settings → Domain management**
2. **Нажмите "Add custom domain"**
3. **Введите: `s-e-t-club.ru`**
4. **Netlify покажет DNS записи для настройки**

### Пример DNS записей:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

## 🔄 Шаг 6: Первое развертывание

1. **Netlify автоматически запустит сборку**
2. **Перейдите в "Deploys"** чтобы следить за процессом
3. **Дождитесь зеленой галочки** "Published"
4. **Ваш сайт готов!**

## ✅ Проверка работы

### Временный URL
Netlify даст временный URL вида: `https://amazing-tennis-123456.netlify.app`

### Проверьте:
- ✅ Сайт загружается
- ✅ Навигация работает
- ✅ Нет ошибок в консоли браузера

## 🔄 Автоматические обновления

Теперь при каждом изменении в GitHub:

1. **Вы изменяете код** и делаете `git push`
2. **GitHub уведомляет Netlify**
3. **Netlify автоматически собирает и публикует** новую версию
4. **Сайт обновляется** через 2-5 минут

## 🌍 Настройка DNS у регистратора

После получения DNS записей от Netlify:

### Если домен на Reg.ru:
1. **Личный кабинет → Домены → s-e-t-club.ru**
2. **DNS-серверы и управление зоной**
3. **Добавить записи от Netlify**

### Если домен на других регистраторах:
- **Cloudflare:** DNS → Add record
- **Namecheap:** Advanced DNS → Add New Record
- **GoDaddy:** DNS → Manage

## ⏱️ Время активации

- **DNS изменения:** до 48 часов
- **SSL сертификат:** автоматически после DNS
- **Обычно работает:** через 2-6 часов

## 🔍 Мониторинг

### В Netlify Dashboard:
- **Deploys** - история развертываний
- **Functions** - серверные функции (если нужны)
- **Analytics** - статистика посещений

### Уведомления:
1. **Site settings → Build & deploy → Deploy notifications**
2. **Add notification → Email**
3. **Выберите события:** Deploy succeeded, Deploy failed

## 🛠️ Troubleshooting

### Сборка падает с ошибкой:
1. **Проверьте Deploy log** в Netlify
2. **Убедитесь, что переменные окружения добавлены**
3. **Проверьте, что все файлы загружены в GitHub**

### Сайт не открывается:
1. **Проверьте временный Netlify URL**
2. **Если временный работает** - проблема в DNS
3. **Если не работает** - проблема в коде или переменных

### DNS не работает:
1. **Проверьте правильность записей**
2. **Подождите до 48 часов**
3. **Проверьте на [whatsmydns.net](https://whatsmydns.net)**

## 📞 Поддержка

- **Netlify Support:** [support.netlify.com](https://support.netlify.com)
- **Документация:** [docs.netlify.com](https://docs.netlify.com)

---

**🎯 Результат:** Полностью автоматизированное развертывание сайта https://s-e-t-club.ru с обновлениями при каждом изменении в GitHub!