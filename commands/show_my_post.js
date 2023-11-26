// commands/show_my_post.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    if (!globalState.isLoggedIn) {
        console.log('You must be logged in to view your posts.');
        promptUser();
        return;
    }

    // Query the database for posts by the logged-in user
    const query = `
        SELECT BlogPosts.PostID, BlogPosts.Title,
               (SELECT COUNT(*) FROM Likes WHERE Likes.PostID = BlogPosts.PostID) AS Likes,
               (SELECT COUNT(*) FROM Dislikes WHERE Dislikes.PostID = BlogPosts.PostID) AS Dislikes
        FROM BlogPosts
        WHERE BlogPosts.UserID = ?`;

    connection.query(query, [globalState.userId], (err, results) => {
        if (err) {
            console.error('Error occurred:', err);
            promptUser();
            return;
        }

        if (results.length > 0) {
            console.log('Your Posts:');
            results.forEach(post => {
                console.log(`PostID: ${post.PostID} | Title: "${post.Title}" | Likes: ${post.Likes} | Dislikes: ${post.Dislikes}`);
            });
        } else {
            console.log('You have not published any posts.');
        }
        
        promptUser(); // Re-prompt for the next command
    });
};
