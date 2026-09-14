import db from '../db.js'
const allUsers = async (request, response) => {

    const finalUsers= await db.all('SELECT * FROM users');

    // Return the complete user list as JSON.
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(finalUsers));

}

export default allUsers;