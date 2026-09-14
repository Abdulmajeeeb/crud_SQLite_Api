import db from '../db.js';

const updateUser = async (request, response) => {

    // Extract the user ID from the request URL.
    const id = request.url.split('/')[2];

    // Collect the request body data.
    let body = "";
    request.on('data', chunk => {
        body += chunk;
    })

    request.on('end', async () => {

        // Parse the request body into a JavaScript object.
        const receivedData = JSON.parse(body);

        // Retrieve the existing user from the database.
        const user = await db.get(
            'SELECT * FROM users WHERE id = ?',
            id
        );

        // Return a 404 response if the user does not exist.
        if (user === undefined) {
            response.writeHead(404, {
                "Content-Type": "application/json"
            });

            response.end(JSON.stringify({
                message: 'user not found'
            }));

            return;
        }

        // Use the new value when provided; otherwise retain the existing value.
        const firstName = receivedData.firstName ?? user.firstName;
        const lastName = receivedData.lastName ?? user.lastName;
        const age = receivedData.age ?? user.age;

        // Update the user's information in the database.
        await db.run(
            `UPDATE users
            SET firstName = ?, lastName = ?, age = ?
            WHERE id = ?`,
            firstName,
            lastName,
            age,
            id
        )

        // Return a successful update response.
        response.writeHead(200, {
            "Content-Type": "application/json"
        })

        response.end(JSON.stringify({
            message: 'user updated successfully'
        }))
    })
}

export default updateUser;