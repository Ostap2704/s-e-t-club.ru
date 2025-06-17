# 🌐 Настройка DNS в Netlify для домена s-e-t-club.ru

## 🎯 Шаг 1: Добавление домена в Netlify

### В Netlify Dashboard:
1. **Зайдите в ваш сайт** на [netlify.com](https://netlify.com)
2. **Site settings → Domain management**
3. **Нажмите "Add custom domain"**
4. **Введите:** `s-e-t-club.ru`
5. **Нажмите "Verify"**
6. **Подтвердите владение доменом**

### Netlify покажет вам DNS записи:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

## 🔧 Шаг 2: Настройка у регистратора домена

### Найдите ваш Netlify URL:
В Netlify Dashboard найдите URL вида: `amazing-tennis-123456.netlify.app`

### Добавьте DNS записи у регистратора:

#### Если домен на Reg.ru:
1. **Личный кабинет → Домены → s-e-t-club.ru**
2. **DNS-серверы и управление зоной**
3. **Удалите существующие A и CNAME записи**
4. **Добавьте новые записи:**
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

#### Если домен на Cloudflare:
1. **DNS → Add record**
2. **Добавьте записи:**
   ```
   Type: A
   Name: @
   IPv4 address: 75.2.60.5
   Proxy status: DNS only (серая тучка)

   Type: CNAME
   Name: www
   Target: your-site-name.netlify.app
   Proxy status: DNS only (серая тучка)
   ```

#### Если домен на Namecheap:
1. **Domain List → Manage → Advanced DNS**
2. **Add New Record:**
   ```
   Type: A Record
   Host: @
   Value: 75.2.60.5

   Type: CNAME Record
   Host: www
   Value: your-site-name.netlify.app
   ```

## 🚀 Шаг 3: Проверка в Netlify

### После добавления DNS записей:
1. **Вернитесь в Netlify Dashboard**
2. **Site settings → Domain management**
3. **Нажмите "Check DNS configuration"**
4. **Дождитесь зеленых галочек** ✅

### Автоматические настройки Netlify:
- ✅ **SSL сертификат** - выпустится автоматически
- ✅ **HTTPS redirect** - настроен в netlify.toml
- ✅ **www → non-www redirect** - настроен в netlify.toml

## ⏰ Шаг 4: Ожидание распространения DNS

### Время распространения:
- **Обычно:** 15 минут - 2 часа
- **Максимум:** до 48 часов

### Проверка распространения:
1. **Откройте [whatsmydns.net](https://whatsmydns.net)**
2. **Введите:** `s-e-t-club.ru`
3. **Выберите тип:** A
4. **Проверьте, что показывает:** `75.2.60.5`

## 🔍 Шаг 5: Финальная проверка

### Проверьте URL:
- ✅ `https://s-e-t-club.ru` - основной сайт
- ✅ `https://www.s-e-t-club.ru` - перенаправление на основной
- ✅ `http://s-e-t-club.ru` - перенаправление на HTTPS
- ✅ SSL сертификат активен (зеленый замок)

### В Netlify Dashboard должно быть:
- ✅ **Primary domain:** s-e-t-club.ru
- ✅ **HTTPS:** Enabled
- ✅ **SSL certificate:** Active

## 🛠️ Дополнительные настройки в Netlify

### 1. Настройка переменных окружения:
**Site settings → Environment variables:**
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

### 2. Настройка уведомлений:
**Site settings → Build & deploy → Deploy notifications:**
- Email при успешном развертывании
- Slack интеграция (опционально)

### 3. Настройка форм (если используются):
**Site settings → Forms:**
- Включить обработку форм
- Настроить уведомления

## 🔧 Troubleshooting

### Проблема: DNS не распространился
**Решение:**
- Подождите до 48 часов
- Проверьте правильность записей
- Очистите кэш DNS: `ipconfig /flushdns` (Windows) или `sudo dscacheutil -flushcache` (Mac)

### Проблема: SSL не работает
**Решение:**
- Убедитесь, что DNS настроен правильно
- Подождите до 24 часов для выпуска сертификата
- Проверьте в Netlify: Site settings → Domain management → HTTPS

### Проблема: Сайт не открывается
**Решение:**
- Проверьте статус сборки в Netlify
- Убедитесь, что переменные окружения настроены
- Проверьте логи развертывания

## 📞 Поддержка

### Полезные команды для проверки:
```bash
# Проверка DNS записей
nslookup s-e-t-club.ru

# Проверка A записи
dig s-e-t-club.ru A

# Проверка CNAME записи
dig www.s-e-t-club.ru CNAME

# Проверка SSL сертификата
openssl s_client -connect s-e-t-club.ru:443 -servername s-e-t-club.ru
```

### Контакты:
- **Netlify Support:** [support.netlify.com](https://support.netlify.com)
- **Документация:** [docs.netlify.com](https://docs.netlify.com)

---

**🎾 Результат:** После выполнения всех шагов ваш сайт будет доступен по адресу https://s-e-t-club.ru с автоматическим SSL и переадресациями!**