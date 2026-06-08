
# Discord Clone

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-brightgreen)](https://vuejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)

Полнофункциональный клон Discord с открытым исходным кодом. Поддерживает текстовые сообщения, голосовые вызовы, создание серверов и каналов.


## ✨ Особенности

- **Текстовый чат** с историей сообщений
- **Голосовые вызовы** через WebRTC
- **Создание серверов и каналов**
- **Аутентификация пользователей**
- **Управление участниками**
- **Темная тема**
- **Уведомления в реальном времени**

## 🛠 Технологии

- **Frontend:** 
  - Vue 3 (Composition API)
  - Tailwind CSS
  - Socket.IO Client
  - SimplePeer (WebRTC)
  
- **Backend:**
  - Node.js
  - Express.js
  - Socket.IO
  - PostgreSQL (или SQLite)

- **Инфраструктура:**
  - Docker
  - Nginx
  - TURN-сервер (coturn)

## ⚙️ Установка

### Требования
- Node.js 18+
- PostgreSQL
- Docker (опционально)

### Инструкция

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/discord-clone.git
cd discord-clone
```

2. Установите зависимости:
```bash
cd client && npm install
cd ../server && npm install
```

3. Настройте базу данных:
```sql
CREATE DATABASE discord;
CREATE USER discord_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE discord TO discord_user;
```

4. Настройте переменные окружения (создайте `.env` в папке server):
```env
DATABASE_URL=postgres://user:password@localhost:5432/discord
JWT_SECRET=your_jwt_secret
TURN_SERVER_URL=turn:your-turn-server.com
TURN_USERNAME=username
TURN_CREDENTIAL=password
```

## 🚀 Запуск

### Локальная разработка

**Сервер:**
```bash
cd server
npm run dev
```

**Клиент:**
```bash
cd client
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:5173`

### Запуск через Docker
```bash
docker-compose up --build
```

## 🌐 Деплой

### Бесплатные опенсорсные решения:

1. **Frontend:**
   - [Cloudflare Pages](https://pages.cloudflare.com/)
   - [GitHub Pages](https://pages.github.com/)
   - [Netlify](https://www.netlify.com/)

2. **Backend:**
   - [Fly.io](https://fly.io/) (бесплатный тариф)
   - [Railway.app](https://railway.app/) (бесплатные кредиты)
   - [Render.com](https://render.com/) (бесплатный тариф)

3. **База данных:**
   - [Supabase](https://supabase.com/) (PostgreSQL)
   - [Neon.tech](https://neon.tech/) (Serverless PostgreSQL)

### Инструкция для Fly.io:

```bash
# Установите Fly CLI
curl -L https://fly.io/install.sh | sh

# Деплой бэкенда
cd server
fly launch
fly deploy

# Деплой фронтенда
cd ../client
fly launch
fly deploy
```

## 📚 Документация

- [API Reference](/docs/API.md)
- [WebRTC Setup](/docs/WEBRTC.md)
- [Database Schema](/docs/DATABASE.md)


## 📜 Лицензия

Этот проект распространяется под лицензией MIT - смотрите [LICENSE](LICENSE).

