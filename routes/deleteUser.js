import db from '../db.js'

const deleteUser = async (request, response) => {
    const id = request.url.split('/')[2];
    const user = await db.get(
        'SELECT * FROM users WHERE id = ?',
        id
    );

    if (user === undefined) {
        response.writeHead(404, {
            "Content-Type": "application/json"
        })
        response.end(JSON.stringify({
            message: 'user not found'
        }))
        return;
    }
    await db.run(
        'DELETE FROM users WHERE id = ?',
        id
    );

    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.end(JSON.stringify({
        message: 'user deleted successfully'
    }))
}
export default deleteUser;