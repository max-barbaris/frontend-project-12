### Hexlet tests and linter status:
[![Actions Status](https://github.com/max-barbaris/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/max-barbaris/frontend-project-12/actions)

# Hexlet Chat

Hexlet Chat — это приложение для обмена сообщениями в реальном времени.  
Приложение разделено на каналы — отдельные комнаты для общения. Пользователи могут присоединяться к существующим каналам, создавать новые или отправлять сообщения другим зарегистрированным пользователям.

## Технологии

### Фронтенд

- React — библиотека для построения интерфейсов.
- Redux Toolkit — управление состоянием приложения.
- React Router DOM — маршрутизация.
- Axios — HTTP-клиент для API-запросов.
- Socket.IO Client — реалтайм-связь с сервером.
- Formik — управление формами.
- Yup — валидация форм.
- React Bootstrap — стилизация.
- i18next — интернационализация.
- React Toastify — уведомления.
- Leo Profanity — фильтр нецензурной лексики.

### Бэкенд

- `@hexlet/chat-server` — готовый сервер для работы с чатами в реальном времени.

### Инструменты разработки

- Vite — современный сборщик и дев-сервер для фронтенда.
- ESLint — проверка качества кода.
- Make — автоматизация запуска и сборки.

## Установка

1. **Клонируйте репозиторий:**
  ```bash
  git clone https://github.com/max-barbaris/frontend-project-12.git
  cd frontend-project-12
  ```

2. **Установите зависимости сервера и фронтенда:**
  ```bash
  npm ci
  cd frontend && npm ci
  ```

3. **Запуск приложения в режиме разработки:**

    Запуск бэкенда (из корневой директории):
      ```bash
      npm run server
      ```

    Запуск фронтенда (из директории frontend):
      ```bash
      cd frontend
      npm run dev
      ```

    Или запустите сервер и фронтенд одновременно:
      ```bash
      make develop
      ```
4. **Запуск приложения в продакшене:**
    ```bash
    make build
    make start
    ```

## Деплой:

Готовое приложение доступно по ссылке: [Chat App](https://chat-slack-u9x1.onrender.com/)