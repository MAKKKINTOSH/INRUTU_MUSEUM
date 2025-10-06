# Виртуальный музей вычислительной техники

Backend для виртуального музея вычислительной техники, построенный на Django 5.0 и Django REST Framework.

## 🚀 Быстрый старт

### Требования
- Python 3.12+
- Poetry
- Docker и Docker Compose

### Установка и запуск

```bash
# 1. Клонируйте репозиторий и перейдите в папку проекта
cd /Users/ivan/Desktop/INRUTU_MUSEUM/server

# 2. Установка зависимостей
poetry install
poetry shell

# 3. Настройка переменных окружения
cp env.example .env
cp museum/env.example museum/.env

# 4. Запуск PostgreSQL
docker-compose up -d

# 5. Инициализация базы данных
python manage.py migrate
python manage.py createsuperuser

# 6. Запуск сервера
python manage.py runserver
```

## 📋 Доступные сервисы

После запуска будут доступны:

- **Django сервер**: http://localhost:8000/
- **Админ-панель**: http://localhost:8000/admin/
- **API документация (Swagger)**: http://localhost:8000/api/docs/
- **API документация (ReDoc)**: http://localhost:8000/api/redoc/
- **PostgreSQL**: localhost:5432 (museum_user/museum_password)

## 🛠️ Технологический стек

### Backend
- **Python 3.12+**
- **Django 5.0** - веб-фреймворк
- **Django REST Framework** - API
- **django-filters** - фильтрация данных
- **drf-spectacular** - документация API (Swagger/OpenAPI)

### База данных
- **PostgreSQL** - основная база данных
- **Django ORM** - объектно-реляционное отображение

### Хранение файлов
- **Локальное хранение** - медиафайлы в папке `media/`
- **Pillow** - обработка изображений

### Endpoints

#### Общие ресурсы (shared)
- `GET/POST /api/shared/images/` - Изображения
- `GET/POST /api/shared/models3d/` - 3D модели

#### Исторические личности
- `GET/POST /api/historical-figures/science-fields/` - Области науки
- `GET/POST /api/historical-figures/historical-figures/` - Исторические личности

#### Артефакты
- `GET/POST /api/artifacts/hall-categories/` - Категории залов
- `GET/POST /api/artifacts/halls/` - Залы
- `GET/POST /api/artifacts/artifact-categories/` - Категории артефактов
- `GET/POST /api/artifacts/artifacts/` - Артефакты

### Документация
- **Swagger UI**: `/api/docs/`
- **ReDoc**: `/api/redoc/`
- **OpenAPI Schema**: `/api/schema/`

## 🎛️ Админ-панель

### Особенности
- Кастомизированная админ-панель с русской локализацией
- Удобные фильтры и поиск для всех моделей
- Группировка полей в fieldsets
- Поддержка ManyToMany полей через filter_horizontal
- Отображение временных меток (created_at, updated_at)
- Превью изображений в списках

### Настройки
- Кастомные заголовки и названия
- Оптимизированные списки с сортировкой
- Поиск по релевантным полям

## 📁 Хранение медиафайлов

Все медиафайлы (изображения и 3D модели) хранятся локально в папке `media/`.

### Поддерживаемые форматы:
- **Изображения**: JPG, JPEG, PNG, GIF, WebP, SVG
- **3D модели**: GLB, GLTF

### Загрузка файлов:
Файлы загружаются через админ-панель Django. После загрузки они автоматически сохраняются локально и доступны по URL.

### Структура хранения:
```
media/
├── images/          # Изображения
└── models3d/        # 3D модели
```

## 🛠️ Разработка

### Форматирование кода:
```bash
# Форматирование с Black
poetry run black .

# Сортировка импортов
poetry run isort .

# Проверка стиля
poetry run flake8 .
```

### Создание миграций:
```bash
# После изменения моделей
python manage.py makemigrations

# Применение миграций
python manage.py migrate
```

### Остановка сервисов:
```bash
# Остановка Django сервера
Ctrl+C

# Остановка Docker сервисов
docker-compose down

# Остановка с удалением данных
docker-compose down -v
```
