// commands/edit_post.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    if (!globalState.isLoggedIn) {
        console.log('You must be logged in to edit a post.');
        promptUser();
        return;
    }

    rl.question('Enter the PostID you want to edit: ', (postId) => {
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

            rl.question('Enter the new title: ', (newTitle) => {
                rl.question('Enter the new content: ', (newContent) => {
                    // Update the post
                    const updateQuery = 'UPDATE BlogPosts SET Title = ?, Content = ? WHERE PostID = ? AND UserID = ?';
                    connection.query(updateQuery, [newTitle, newContent, postId, globalState.userId], (err, updateResults) => {
                        if (err) {
                            console.error('Error occurred:', err);
                        } else {
                            console.log('Post updated successfully.');
                        }
                        promptUser(); // Re-prompt for the next command
                    });
                });
            });
        });
    });
};
