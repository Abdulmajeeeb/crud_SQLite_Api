import db from '../db.js';

const createUser = async (request, response) => {

    // Collect the request body data.
    let body = "";
    request.on('data', chunk => {
        body = body + chunk;
    })

    request.on('end', async () => {

        // Parse the request body into a JavaScript object.
        const newUser = JSON.parse(body);

        newUser.firstName = String(newUser.firstName);
        newUser.lastName = String(newUser.lastName);

        // Insert the new user into the database.
        await db.run(
            `INSERT INTO users (firstName, lastName, age)
            VALUES (?, ?, ?)`,
            newUser.firstName,
            newUser.lastName,
            newUser.age
        );

        // Return a successful creation response.
        response.writeHead(201, {
            "Content-Type": "application/json"
        })

        response.end(JSON.stringify({
            message: 'user created successfully'
        }))
    })
}

export default createUser;