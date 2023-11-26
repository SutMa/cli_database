// commands/userinfo.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    if (!globalState.isLoggedIn) {
        console.log('No user is currently logged in.');
        promptUser();
        return;
    }

    // Query the database for the user's information
    const query = 'SELECT UserID, Username, Email FROM Users WHERE UserID = ?';
    connection.query(query, [globalState.userId], (err, results) => {
        if (err) {
            console.error('Error occurred:', err);
            promptUser();
            return;
        }

        if (results.length > 0) {
            const user = results[0];
            console.log(`Logged in as: \n UserID: ${user.UserID}, \n Username: ${user.Username}, \n Email: ${user.Email}`);
        } else {
            console.log('User not found.');
        }
        
        promptUser(); // Re-prompt for the next command
    });
};
