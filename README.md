# 🎧 Jukebox

Jukebox is a web application built with vanilla JavaScript, HTML, and CSS that lets users:
- Create music playlists
- Add songs (with artist, duration, and optional Spotify link)
- Edit and delete playlists
- Delete songs
- Filter by genre or artist
- Sort by name or artist

All playlist data is stored in [restdb.io](https://restdb.io/), a NoSQL cloud database, using a RESTful API.

---

## 📦 Features

- ✅ Create & delete playlists
- ✅ Add/edit/delete songs (with artist, duration, Spotify link)
- ✅ Group playlists by genre
- ✅ Filter playlists by genre or artist
- ✅ Sort playlists by name or artist
- ✅ MVC structure: Model-View-Controller

---

## 🧠 MVC Structure

| Layer       | Role                                           |
|-------------|------------------------------------------------|
| **Model**   | Communicates with restdb.io (API CRUD calls)   |
| **View**    | Manages the DOM, handles user interaction      |
| **Controller** | Connects View & Model, applies app logic    |

---

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript (ES6 Modules)
- RESTDB.io (API + NoSQL backend)

---

## 🧪 Project Setup

Create RESTDB.io account: [restdb.io](https://restdb.io/)

Add API key to `js/model/musicModel.js`

```js
const API_KEY = 'YOUR_API_KEY';
```

ADD DB URL to `js/model/musicModel.js`, Make sure it is a Web Page API Keys (CORS) from settings in restdb.io.

```js
const DB_URL = 'YOUR_DB_URL';
```

ps

Clone the repo and open with Live Server:

```bash
git clone https://github.com/your-username/jukebox.git
cd jukebox
live-server
```

---
## Developed By
- [Omar Alme](https://github.com/omar-alme)