// commands/show_all_posts.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    if (!globalState.isLoggedIn) {
        console.log('You must be logged in to view posts.');
        promptUser();
        return;
    }

    // Query the database for all blog posts, likes, and dislikes
    const query = `
        SELECT BlogPosts.PostID, BlogPosts.Title, Users.Username,
               (SELECT COUNT(*) FROM Likes WHERE Likes.PostID = BlogPosts.PostID) AS Likes,
               (SELECT COUNT(*) FROM Dislikes WHERE Dislikes.PostID = BlogPosts.PostID) AS Dislikes
        FROM BlogPosts
        JOIN Users ON BlogPosts.UserID = Users.UserID`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error occurred:', err);
            promptUser();
            return;
        }

        if (results.length > 0) {
            console.log('Blog Posts:');
            results.forEach(post => {
                console.log(`PostID: ${post.PostID} | Title: "${post.Title}" | Author: ${post.Username} | Likes: ${post.Likes} | Dislikes: ${post.Dislikes}`);
            });
        } else {
            console.log('No posts found.');
        }
        
        promptUser(); // Re-prompt for the next command
    });
};
