# 📝 Команды Git для ежедневной работы

## 🚀 Первоначальная настройка (один раз)

```bash
# Настройка имени и email (замените на свои данные)
git config --global user.name "Ваше Имя"
git config --global user.email "your.email@example.com"

# Инициализация репозитория в папке проекта
git init

# Добавление удаленного репозитория
git remote add origin https://github.com/YOUR_USERNAME/tennis-league-website.git

# Первый коммит и отправка
git add .
git commit -m "Initial commit: Tennis League website"
git branch -M main
git push -u origin main
```

## 📝 Ежедневные команды

### Проверка статуса
```bash
# Посмотреть, какие файлы изменены
git status

# Посмотреть конкретные изменения
git diff
```

### Сохранение изменений
```bash
# Добавить все изменения
git add .

# Или добавить конкретный файл
git add src/pages/HomePage.tsx

# Создать коммит с описанием
git commit -m "Описание изменений"

# Отправить на GitHub
git push origin main
```

### Получение обновлений
```bash
# Получить последние изменения с GitHub
git pull origin main
```

## 🔄 Работа с ветками

### Создание новой ветки для фичи
```bash
# Создать и переключиться на новую ветку
git checkout -b feature/new-feature

# Работать с кодом...
# Добавить изменения
git add .
git commit -m "Add new feature"

# Отправить ветку на GitHub
git push origin feature/new-feature
```

### Слияние веток
```bash
# Переключиться на main
git checkout main

# Получить последние изменения
git pull origin main

# Слить ветку с фичей
git merge feature/new-feature

# Отправить обновленный main
git push origin main

# Удалить ветку с фичей (опционально)
git branch -d feature/new-feature
```

## 🆘 Полезные команды

### Отмена изменений
```bash
# Отменить изменения в файле (до git add)
git checkout -- filename.txt

# Отменить последний коммит (но сохранить изменения)
git reset --soft HEAD~1

# Отменить последний коммит полностью
git reset --hard HEAD~1
```

### Просмотр истории
```bash
# Посмотреть историю коммитов
git log --oneline

# Посмотреть изменения в конкретном коммите
git show COMMIT_HASH
```

### Работа с удаленным репозиторием
```bash
# Посмотреть настроенные удаленные репозитории
git remote -v

# Изменить URL удаленного репозитория
git remote set-url origin https://github.com/NEW_USERNAME/tennis-league-website.git
```

## 📋 Типичный рабочий процесс

```bash
# 1. Начало работы - получить последние изменения
git pull origin main

# 2. Внести изменения в код
# (редактировать файлы)

# 3. Проверить, что изменилось
git status
git diff

# 4. Добавить изменения
git add .

# 5. Создать коммит с описанием
git commit -m "Fix: исправлена ошибка в навигации"

# 6. Отправить на GitHub
git push origin main
```

## 💡 Советы по коммитам

### Хорошие примеры сообщений:
```bash
git commit -m "feat: добавлена страница турниров"
git commit -m "fix: исправлена ошибка регистрации"
git commit -m "style: обновлен дизайн главной страницы"
git commit -m "docs: обновлена документация"
```

### Плохие примеры:
```bash
git commit -m "изменения"
git commit -m "фикс"
git commit -m "работает"
```

## 🔧 Решение проблем

### Если забыли добавить файлы в последний коммит:
```bash
git add forgotten-file.txt
git commit --amend --no-edit
```

### Если нужно изменить сообщение последнего коммита:
```bash
git commit --amend -m "Новое сообщение коммита"
```

### Если есть конфликты при git pull:
```bash
# Git покажет конфликтующие файлы
# Отредактируйте их вручную, удалив маркеры конфликтов
# Затем:
git add .
git commit -m "Resolve merge conflicts"
```

---

**💡 Помните:** После каждого `git push origin main` Netlify автоматически обновит ваш сайт!