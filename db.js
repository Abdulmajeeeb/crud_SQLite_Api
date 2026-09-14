import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open a connection to the SQLite database.
const db = await open({
    filename: './data.sqlite',
    driver: sqlite3.Database
});

// Create the users table if it does not already exist.
await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        age INTEGER
    )
`);

// Check whether the users table already contains any records.
const count = await db.get('SELECT COUNT(*) AS count FROM users');

// Insert initial users if the table is empty.
if (count.count === 0) {
    await db.run(
        `INSERT INTO users (firstName, lastName, age)
        VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?),
               (?, ?, ?), (?, ?, ?), (?, ?, ?)`,
        'Ali', 'Hamza', 21,
        'Bakhtawar', 'Khan', 22,
        'Casim', 'Khan', 23,
        'Danish', 'Ali', 24,
        'Eruj', 'Noor', 25,
        'Farasat', 'Ahmed', 26
    );
}

export default db;