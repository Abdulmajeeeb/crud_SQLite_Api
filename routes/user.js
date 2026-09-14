import db from '../db.js';

const getUser = async (request, response) => {


    // Extract the user ID from the request URL.
    // console.log(JSON.stringify(request.url, null, 2, false))
    const id = request.url.split('/')[2];
    const user = await db.get(
        'SELECT * FROM users WHERE id=?',
        id
    );


    // Return a 404 response if the user does not exist.
    if (user === undefined) {
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'user not found'
        }));
        return;
    }


    // Return the requested user as JSON.
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(user));
}

export default getUser;