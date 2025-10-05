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
python manage.py setup_groups

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

## 🏗️ Архитектура

### Модели данных

#### shared (Общие компоненты)
- **TimeStampedModel** - абстрактная модель с полями created_at и updated_at
- **Image** - модель для хранения изображений с ImageField и описанием
- **Model3D** - модель для хранения 3D моделей в формате .glb/.gltf

#### historical_figures (Исторические личности)
- **ScienceField** - области науки (ManyToMany с HistoricalFigure)
- **HistoricalFigure** - исторические личности с полями:
  - ФИО (last_name, first_name, middle_name)
  - Даты рождения и смерти (birth_date, death_date)
  - Описание и биография (description, biography)
  - Связи с областями науки, изображениями и артефактами

#### artifacts (Артефакты)
- **HallCategory** - категории залов музея
- **Hall** - залы с изображением и категорией
- **ArtifactCategory** - категории артефактов
- **Artifact** - артефакты с полями:
  - Название и описание
  - Год создания (IntegerField)
  - Связи с категорией, залом, 3D моделью и изображениями

### Связи между моделями

- **HistoricalFigure ↔ ScienceField**: ManyToMany
- **HistoricalFigure ↔ Image**: ManyToMany
- **HistoricalFigure ↔ Artifact**: ManyToMany
- **Artifact ↔ Image**: ManyToMany
- **Artifact → Model3D**: ForeignKey (nullable)
- **Hall → Image**: ForeignKey
- **Hall → HallCategory**: ForeignKey
- **Artifact → ArtifactCategory**: ForeignKey
- **Artifact → Hall**: ForeignKey

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

### Инфраструктура
- **Docker & Docker Compose** - контейнеризация PostgreSQL
- **Poetry** - управление зависимостями

## 🔐 Безопасность и права доступа

### Система ролей
1. **Суперюзер** - полные права доступа
2. **Администратор** - доступ в админку с правами на изменение данных
3. **Редактор** - права на добавление, изменение и просмотр (без удаления)

### Аутентификация
- Стандартная система пользователей Django
- Session-based аутентификация для API
- Разграничение прав через группы и разрешения

## 📡 API

### Особенности
- RESTful API с полной поддержкой CRUD операций
- Фильтрация, поиск и сортировка для всех endpoints
- Пагинация результатов (20 элементов на страницу)
- Автоматическая документация через drf-spectacular

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

### Примеры запросов

```bash
# Получить все артефакты
curl http://localhost:8000/api/artifacts/artifacts/

# Получить артефакты с фильтрацией по году
curl "http://localhost:8000/api/artifacts/artifacts/?creation_year=1936"

# Получить исторические личности с поиском
curl "http://localhost:8000/api/historical-figures/historical-figures/?search=Тьюринг"
```

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

## 🔧 Конфигурация

### Переменные окружения

#### Корневой .env (для Docker Compose)
```env
POSTGRES_DB=museum_db
POSTGRES_USER=museum_user
POSTGRES_PASSWORD=museum_password
```

#### museum/.env (для Django)
```env
SECRET_KEY=your-secret-key-here-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

DB_NAME=museum_db
DB_USER=museum_user
DB_PASSWORD=museum_password
DB_HOST=localhost
DB_PORT=5432
```

### Docker Compose
- **PostgreSQL**: порт 5432

## 👥 Управление пользователями

### Создание администратора:
1. Войдите в админ-панель как суперпользователь
2. Перейдите в "Пользователи" → "Добавить пользователя"
3. Создайте пользователя и назначьте ему группу "Администраторы"

### Роли пользователей:
- **Суперюзер**: полные права доступа
- **Администраторы**: доступ в админку с правами на изменение данных

## 📂 Работа с файлами

### Загрузка изображений и 3D моделей
1. Войдите в админ-панель
2. Перейдите в раздел "Shared" → "Изображения" или "3D модели"
3. Нажмите "Добавить"
4. Загрузите файл и добавьте описание
5. Сохраните

### Связывание файлов с объектами:
- В админке для HistoricalFigure, Hall, Artifact можно выбрать связанные изображения
- Для Artifact можно выбрать 3D модель
- Все связи настраиваются через удобные интерфейсы с превью

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

### Тестирование:
```bash
# Запуск тестов
poetry run pytest

# Запуск с покрытием
poetry run pytest --cov=.
```

## 🚨 Устранение неполадок

### Проблемы с подключением к базе данных:
```bash
# Проверка статуса PostgreSQL
docker-compose ps db

# Просмотр логов
docker-compose logs db
```

### Очистка и пересоздание:
```bash
# Остановка всех сервисов
docker-compose down -v

# Удаление миграций (осторожно!)
rm -rf */migrations/0*.py

# Пересоздание миграций
python manage.py makemigrations
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
