// commands/signup.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser) {
    rl.question('Enter username: ', (username) => {
        rl.question('Enter email: ', (email) => {
            rl.question('Enter password: ', (password) => {
                // Insert into the database
                const query = 'INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?)';
                connection.query(query, [username, email, password], (err, results) => {
                    if (err) {
                        console.error('Error occurred:', err);
                    } else {
                        console.log('User registered successfully');
                    }
                    promptUser(); // Re-prompt for the next command instead of closing rl
                });
            });
        });
    });
};
