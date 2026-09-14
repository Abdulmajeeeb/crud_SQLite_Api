import db from '../db.js';

const deleteUser = async (request, response) => {

    // Extract the user ID from the request URL.
    const id = request.url.split('/')[2];

    // Retrieve the user from the database.
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

    // Delete the user from the database.
    await db.run(
        'DELETE FROM users WHERE id = ?',
        id
    );

    // Return a successful deletion response.
    response.writeHead(200, {
        "Content-Type": "application/json"
    });

    response.end(JSON.stringify({
        message: 'user deleted successfully'
    }))
}

export default deleteUser;