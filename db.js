import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const db = await open({
    filename: './data.sqlite',
    driver: sqlite3.Database
});

await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    age INTEGER
    )
    `);

const plate = await db.get('SELECT COUNT(*) AS count FROM users');

if (plate.count === 0) {
    await db.run(
        `INSERT INTO users (firstName, lastName, age)
        VALUES (?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?)`,
        'Ali','Hamza',21,
        'Bakhtawar','Khan',22,
        'Casim','Khan',23,
        'Danish','Ali',24,
        'Eruj','Noor',25,
        'Farasat','Ahmed',26
    );
}
export default db;