// commands/write_post.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    if (!globalState.isLoggedIn) {
        console.log('You must be logged in to write a post.');
        promptUser();
        return;
    }

    rl.question('Enter post title: ', (title) => {
        rl.question('Enter post content: ', (content) => {
            // Insert the post into the database
            const query = 'INSERT INTO BlogPosts (UserID, Title, Content) VALUES (?, ?, ?)';
            connection.query(query, [globalState.userId, title, content], (err, results) => {
                if (err) {
                    console.error('Error occurred:', err);
                } else {
                    console.log('Post written successfully');
                }
                promptUser(); // Re-prompt for the next command
            });
        });
    });
};
