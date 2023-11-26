// commands/rate_post.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    if (!globalState.isLoggedIn) {
        console.log('You must be logged in to rate a post.');
        promptUser();
        return;
    }

    rl.question('Enter PostID to rate: ', (postId) => {
        rl.question('Enter L for like or D for dislike: ', (choice) => {
            const isLike = choice.toUpperCase() === 'L';
            const isDislike = choice.toUpperCase() === 'D';

            if (!isLike && !isDislike) {
                console.log('Invalid choice. Please enter L for like or D for dislike.');
                promptUser();
                return;
            }

            // Check if the user has already liked or disliked this post
            const checkLikesQuery = 'SELECT * FROM Likes WHERE UserID = ? AND PostID = ?';
            const checkDislikesQuery = 'SELECT * FROM Dislikes WHERE UserID = ? AND PostID = ?';

            connection.query(isLike ? checkLikesQuery : checkDislikesQuery, [globalState.userId, postId], (err, results) => {
                if (err) {
                    console.error('Error occurred:', err);
                    promptUser();
                    return;
                }

                if (results.length > 0) {
                    console.log(`You have already ${isLike ? 'liked' : 'disliked'} this post.`);
                    promptUser();
                    return;
                }

                // Insert new like or dislike
                const insertQuery = isLike ? 'INSERT INTO Likes (UserID, PostID) VALUES (?, ?)' : 'INSERT INTO Dislikes (UserID, PostID) VALUES (?, ?)';
                    
                connection.query(insertQuery, [globalState.userId, postId], (err, insertResults) => {
                    if (err) {
                        console.error('Error occurred:', err);
                    } else {
                        console.log(`You have successfully ${isLike ? 'liked' : 'disliked'} the post.`);
                    }
                    promptUser(); // Re-prompt for the next command
                });
            });
        });
    });
};
