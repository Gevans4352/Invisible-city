const Database = require("better-sqlite3");
const db = new Database("city.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS buildings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    vibe TEXT NOT NULL,
    object TEXT NOT NULL,
    fragment TEXT NOT NULL, 
    likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `);

db.exec(`
    CREATE TABLE IF NOT EXISTS fragments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `);

module.exports = db;