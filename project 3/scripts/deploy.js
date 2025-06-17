const fs = require('fs');
const path = require('path');

// Скрипт для автоматического развертывания на Netlify
console.log('🚀 Подготовка к развертыванию на Netlify...');

// Проверяем наличие необходимых файлов
const requiredFiles = [
  'dist/index.html',
  'netlify.toml',
  'package.json'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Файл ${file} не найден`);
    allFilesExist = false;
  } else {
    console.log(`✅ Файл ${file} найден`);
  }
});

if (!allFilesExist) {
  console.error('❌ Не все необходимые файлы найдены. Запустите npm run build');
  process.exit(1);
}

// Проверяем переменные окружения
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.warn('⚠️  Отсутствуют переменные окружения:', missingEnvVars.join(', '));
  console.warn('Убедитесь, что они настроены в Netlify Dashboard');
}

console.log('✅ Проект готов к развертыванию на Netlify');
console.log('📋 Следующие шаги:');
console.log('1. Зайдите на https://netlify.com');
console.log('2. Создайте новый сайт из Git репозитория');
console.log('3. Настройте переменные окружения');
console.log('4. Добавьте домен s-e-t-club.ru');