import db from '../db.js'

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
        const user = await db.get(
            'SELECT * FROM users WHERE id=?',
            id
        );
        if (user === undefined) {
            response.writeHead(404, {
                "Content-Type": "application/json"
            });
            response.end(JSON.stringify({
                message: 'user not found'
            }));
            return;
        }
        const firstName = receivedData.firstName?.replaceAll(';', '') ?? user.firstName;
        const lastName = receivedData.lastName?.replaceAll(';', '') ?? user.lastName;
        const age = receivedData.age ?? user.age;

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