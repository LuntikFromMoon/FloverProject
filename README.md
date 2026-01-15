# FloverProject

Проект интернет-магазина цветов с каталогом продукции.

## Структура проекта

```
FloverProject/
├── Backend/          # Symfony API (PHP 8.2+)
│   ├── src/          # Исходный код
│   ├── config/       # Конфигурация
│   ├── migrations/   # Миграции БД
│   └── public/       # Публичная директория
└── Frontend/         # React приложение (Vite)
    ├── src/          # Исходный код
    └── public/       # Статические файлы
```

## Требования

### Backend
- PHP >= 8.2
- Composer
- PostgreSQL база данных
- Расширения PHP: ctype, iconv, pdo_pgsql

### Frontend
- Node.js >= 18
- npm или yarn

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd FloverProject
```

### 2. Настройка Backend

Перейдите в директорию бэкенда:

```bash
cd Backend
```

Установите зависимости:

```bash
composer install
```

Настройте переменные окружения в файле `.env`:

```env
APP_ENV=dev
APP_DEBUG=1
APP_SECRET=ваш_секретный_ключ

# Настройка базы данных PostgreSQL
DATABASE_URL="postgresql://postgres:ваш_пароль@127.0.0.1:5432/YoFlowers?charset=utf8"
```

Выполните миграции базы данных:

```bash
php bin/console doctrine:migrations:migrate
```

Запустите встроенный сервер Symfony:

```bash
php -S localhost:8000 -t public/
```

Или используйте Symfony CLI:

```bash
symfony server:start
```

Backend будет доступен по адресу: `http://localhost:8000`

### 3. Настройка Frontend

Откройте новый терминал и перейдите в директорию фронтенда:

```bash
cd Frontend
```

Установите зависимости:

```bash
npm install
```

Запустите сервер разработки:

```bash
npm run dev
```

Frontend будет доступен по адресу: `http://localhost:5173` (или другой порт, указанный Vite)

## Полезные команды

### Backend

```bash
# Очистка кэша
php bin/console cache:clear

# Создание новой миграции
php bin/console doctrine:migrations:generate

# Выполнение миграций
php bin/console doctrine:migrations:migrate

# Загрузка фикстур (если есть)
php bin/console doctrine:fixtures:load
```

### Frontend

```bash
# Сборка для продакшена
npm run build

# Предпросмотр продакшн-сборки
npm run preview

# Проверка линтера
npm run lint
```

## APIEndpoints

Основные эндпоинты API:

- `GET /api/products` — Получить список всех продуктов
- `GET /api/product/{id}` — Получить продукт по ID
- `POST /api/product` — Создать новый продукт
- `PUT /api/product/{id}` — Обновить продукт
- `DELETE /api/product/{id}` — Удалить продукт

## База данных

Проект использует PostgreSQL с ORM Doctrine. Сущности описаны в `Backend/src/Entity/`.

## Разработка

При разработке убедитесь, что:
1. Backend сервер запущен на порту 8000
2. Frontend сервер запущен на порту 5173
3. PostgreSQL база данных доступна