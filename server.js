// Import Node's built-in HTTP module.
import http from 'node:http';

// Import route handlers for each CRUD operation.
import route_404 from './routes/_404.js';
import getUser from './routes/user.js';
import getAllUsers from './routes/allUsers.js';
import createUser from './routes/createUser.js';
import updateUser from './routes/updateUser.js';
import deleteUser from './routes/deleteUser.js';

const crudServer = http.createServer(async function (request, response) {

    // Configure CORS to allow requests from external clients.
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const url = request.url;

    // Route requests based on the requested URL.
    switch (url) {

        // Retrieve all users from the database.
        case '/users':
            await getAllUsers(request, response);
            break;

        // Create a new user in the database.
        case '/user':
            if (request.method === 'POST') {
                await createUser(request, response);
            }
            break;

        // Handle requests containing a user ID.
        default:
            if (url.startsWith('/user/')) {

                // Retrieve a user by ID from the database.
                if (request.method === "GET") {
                    await getUser(request, response);
                    break;
                }

                // Update an existing user in the database.
                if (request.method === "PATCH") {
                    await updateUser(request, response);
                    break;
                }

                // Delete an existing user from the database.
                if (request.method === "DELETE") {
                    await deleteUser(request, response);
                    break;
                }

            } else {

                // Handle requests that do not match any defined route.
                route_404(request, response);
            }
            break;
    }

    return;
})

// Start the CRUD server on port 4001.
crudServer.listen(4001);