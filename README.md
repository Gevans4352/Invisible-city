# Invisible City

A tiny web world where users build an impossible city, invent objects that shouldn't exist, and tune into a radio that only plays text fragments.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)

## Features

- Invisible City: submit a building with a name, vibe, and impossible object. It renders as an SVG in a shared skyline. Hover to reveal a hidden fragment.
- Cabinet: a collection of objects that should not exist.
- Fragment Radio: submit short text fragments. The radio tunes between them randomly.

## Stack

- Frontend: HTML, CSS, vanilla JS, SVG
- Backend: Node.js, Express
- Database: SQLite via better-sqlite3

## Getting Started

```bash
cd backend
npm install
npm run dev
```

Open `frontend/index.html` in a browser or use Live Server.

The backend runs on `http://localhost:5000`.

## API Routes

```
GET  /api/buildings     fetch all buildings
POST /api/buildings     add a building
GET  /api/fragments     fetch all fragments
POST /api/fragments     add a fragment
```

## Project Structure

```
backend/
  server.js
  db.js
  routes/
    buildings.js
    fragments.js
frontend/
  index.html
  index.css
  index.js
```

## Status

Work in progress. Built for fun.
