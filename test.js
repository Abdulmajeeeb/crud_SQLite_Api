import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database.db');
db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    age INTEGER
    )
    `, function (error){
        if (error){
            console.log(error.message);
        } else {
            console.log('User table is ready')
        }
    }
    );
db.run(`
    INSERT INTO users (firstName, lastName, age)
    VALUES ('Ali', 'Hassan', 21)
    `, function (error){
        if (error){
            console.log(error.message)
        }else{
            console.log('User created successfully')
        }
    })
console.log('Database connected!');