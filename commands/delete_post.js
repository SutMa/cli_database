// commands/delete_post.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    if (!globalState.isLoggedIn) {
        console.log('You must be logged in to delete a post.');
        promptUser();
        return;
    }

    rl.question('Enter the PostID of the post you want to delete: ', (postId) => {
        // Verify that the logged-in user is the author of the post
        const verifyQuery = 'SELECT * FROM BlogPosts WHERE PostID = ? AND UserID = ?';
        connection.query(verifyQuery, [postId, globalState.userId], (err, results) => {
            if (err) {
                console.error('Error occurred:', err);
                promptUser();
                return;
            }

            if (results.length === 0) {
                console.log('No post found with this ID authored by you.');
                promptUser();
                return;
            }

            // Delete the post
            const deleteQuery = 'DELETE FROM BlogPosts WHERE PostID = ? AND UserID = ?';
            connection.query(deleteQuery, [postId, globalState.userId], (err, deleteResults) => {
                if (err) {
                    console.error('Error occurred:', err);
                } else {
                    console.log('Post deleted successfully.');
                }
                promptUser(); // Re-prompt for the next command
            });
        });
    });
};
