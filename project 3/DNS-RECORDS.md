# 🌐 DNS записи для домена s-e-t-club.ru

## 📋 Записи для добавления у регистратора домена

### A запись (основной домен)
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600 (или Auto)
```

### CNAME запись (www поддомен)
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app
TTL: 3600 (или Auto)
```

## 🔍 Как найти your-site-name.netlify.app

1. **Зайдите в Netlify Dashboard**
2. **Выберите ваш сайт**
3. **В Site overview найдите URL вида:**
   ```
   https://amazing-tennis-123456.netlify.app
   ```
4. **Используйте эту часть:** `amazing-tennis-123456.netlify.app`

## 📝 Пример для разных регистраторов

### Reg.ru
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

### Cloudflare
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

### Namecheap
```
Type: A Record
Host: @
Value: 75.2.60.5
TTL: Automatic

Type: CNAME Record
Host: www
Value: your-site-name.netlify.app
TTL: Automatic
```

### GoDaddy
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 1 Hour

Type: CNAME
Name: www
Value: your-site-name.netlify.app
TTL: 1 Hour
```

## ⚠️ Важные моменты

1. **Замените `your-site-name.netlify.app`** на реальный URL вашего сайта из Netlify
2. **Удалите существующие A и CNAME записи** для @ и www перед добавлением новых
3. **DNS изменения могут занять до 48 часов** для полного распространения
4. **Проверьте распространение** на [whatsmydns.net](https://whatsmydns.net)

## ✅ Проверка после настройки

После добавления записей проверьте:
- `https://s-e-t-club.ru` - основной сайт
- `https://www.s-e-t-club.ru` - должен перенаправлять на основной
- SSL сертификат должен быть активен (зеленый замок)

## 🔧 Если что-то не работает

1. **Проверьте правильность записей**
2. **Подождите до 48 часов**
3. **Очистите кэш браузера**
4. **Проверьте в режиме инкогнито**

---

**После настройки DNS ваш сайт будет доступен по адресу https://s-e-t-club.ru! 🎾**