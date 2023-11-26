// commands/show_post_comments.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    rl.question('Enter PostID to view comments: ', (postId) => {
        // Query the database for comments on the specified post
        const query = `
            SELECT Comments.CommentID, Comments.CommentText, Users.Username,
                   (SELECT COUNT(*) FROM CommentLikes WHERE CommentLikes.CommentID = Comments.CommentID AND IsLike = 1) AS Likes,
                   (SELECT COUNT(*) FROM CommentLikes WHERE CommentLikes.CommentID = Comments.CommentID AND IsLike = 0) AS Dislikes
            FROM Comments
            JOIN Users ON Comments.UserID = Users.UserID
            WHERE Comments.PostID = ?`;

        connection.query(query, [postId], (err, results) => {
            if (err) {
                console.error('Error occurred:', err);
                promptUser();
                return;
            }

            if (results.length > 0) {
                console.log('Comments:');
                results.forEach(comment => {
                    console.log(`CommentID: ${comment.CommentID} | Author: ${comment.Username} | Likes: ${comment.Likes} | Dislikes: ${comment.Dislikes}`);
                    console.log(`Comment: ${comment.CommentText}\n`);
                });
            } else {
                console.log('No comments found for this post.');
            }
            
            promptUser(); // Re-prompt for the next command
        });
    });
};
