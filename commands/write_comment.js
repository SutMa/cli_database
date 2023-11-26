// commands/write_comment.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    if (!globalState.isLoggedIn) {
        console.log('You must be logged in to write a comment.');
        promptUser();
        return;
    }

    rl.question('Enter PostID to comment on: ', (postId) => {
        rl.question('Enter your comment: ', (commentText) => {
            // Insert the comment into the database
            const query = 'INSERT INTO Comments (UserID, PostID, CommentText) VALUES (?, ?, ?)';
            connection.query(query, [globalState.userId, postId, commentText], (err, results) => {
                if (err) {
                    console.error('Error occurred:', err);
                } else {
                    console.log('Comment added successfully.');
                }
                promptUser(); // Re-prompt for the next command
            });
        });
    });
};
