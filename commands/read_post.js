// commands/read_post.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    rl.question('Enter PostID: ', (postId) => {
        // Query the database for the specified post
        const query = `
            SELECT BlogPosts.PostID, BlogPosts.Title, BlogPosts.Content, Users.Username,
                   (SELECT COUNT(*) FROM Likes WHERE Likes.PostID = BlogPosts.PostID) AS Likes,
                   (SELECT COUNT(*) FROM Dislikes WHERE Dislikes.PostID = BlogPosts.PostID) AS Dislikes
            FROM BlogPosts
            JOIN Users ON BlogPosts.UserID = Users.UserID
            WHERE BlogPosts.PostID = ?`;

        connection.query(query, [postId], (err, results) => {
            if (err) {
                console.error('Error occurred:', err);
                promptUser();
                return;
            }

            if (results.length > 0) {
                const post = results[0];
                console.log(`PostID: ${post.PostID} | Title: "${post.Title}" | Author: ${post.Username} | Likes: ${post.Likes} | Dislikes: ${post.Dislikes}`);
                console.log(`Content:\n${post.Content}\n`);
            } else {
                console.log('Post not found.');
            }
            
            promptUser(); // Re-prompt for the next command
        });
    });
};
