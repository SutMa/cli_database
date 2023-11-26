// commands/login.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    rl.question('Enter username: ', (username) => {
        rl.question('Enter password: ', (password) => {
            // Query the database
            const query = 'SELECT UserID FROM Users WHERE Username = ? AND Password = ?';
            connection.query(query, [username, password], (err, results) => {
                if (err) {
                    console.error('Error occurred:', err);
                    promptUser();
                    return;
                }

                if (results.length > 0) {
                    console.log('Login successful');
                    globalState.isLoggedIn = true;
                    globalState.userId = results[0].UserID; // Store the logged-in user's ID
                } else {
                    console.log('Incorrect username or password');
                }
                
                promptUser(); // Re-prompt for the next command
            });
        });
    });
};
