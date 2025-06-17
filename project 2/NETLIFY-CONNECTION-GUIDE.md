# 🔗 Привязка сайта sparkling-figolla-cdb01f к проекту

## 🎯 СРОЧНЫЕ ДЕЙСТВИЯ

### Шаг 1: Зайдите в Netlify Dashboard
1. **Откройте:** [app.netlify.com](https://app.netlify.com)
2. **Найдите сайт:** "sparkling-figolla-cdb01f"
3. **Нажмите на него**

### Шаг 2: Подключите Git репозиторий
1. **Site settings → Build & deploy**
2. **Continuous deployment → Link repository**
3. **Выберите GitHub**
4. **Найдите репозиторий** с этим кодом
5. **Настройки сборки:**
   ```
   Build command: npm ci && npm run build
   Publish directory: dist
   Branch to deploy: main
   ```

### Шаг 3: Добавьте переменные окружения
**Site settings → Environment variables → Add variable:**

```
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
VITE_DOMAIN=https://s-e-t-club.ru
NODE_ENV=production
```

### Шаг 4: Запустите первую сборку
1. **Deploys → Trigger deploy → Deploy site**
2. **Ждите 3-5 минут**

### Шаг 5: Настройте домен
1. **Site settings → Domain management**
2. **Add custom domain: s-e-t-club.ru**
3. **Netlify покажет DNS записи**

## 🔧 DNS настройки у регистратора
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: sparkling-figolla-cdb01f.netlify.app
```

## ✅ Проверка
После выполнения:
- ✅ `https://sparkling-figolla-cdb01f.netlify.app` - работает
- ✅ `https://s-e-t-club.ru` - работает (через 24-48 часов)
- ✅ Автоматические обновления при push в Git

## 🆘 Если не получается
1. **Удалите сайт** sparkling-figolla-cdb01f
2. **Создайте новый:** Add new site → Import an existing project
3. **Подключите Git репозиторий**
4. **Настройте переменные окружения**

---

**🎯 Результат: Рабочий сайт с автоматическими обновлениями!**