// commands/rate_comment.js
const mysql = require('mysql2');
const connection = require('../config/db'); // Import the database connection

module.exports = function(args, rl, promptUser, globalState) {
    if (!globalState.isLoggedIn) {
        console.log('You must be logged in to rate a comment.');
        promptUser();
        return;
    }

    rl.question('Enter CommentID to rate: ', (commentId) => {
        rl.question('Enter L for like or D for dislike: ', (choice) => {
            const isLike = choice.toUpperCase() === 'L';
            if (!isLike && choice.toUpperCase() !== 'D') {
                console.log('Invalid choice. Please enter L for like or D for dislike.');
                promptUser();
                return;
            }

            // Check if the user has already rated this comment
            const checkQuery = 'SELECT * FROM CommentLikes WHERE UserID = ? AND CommentID = ?';

            connection.query(checkQuery, [globalState.userId, commentId], (err, results) => {
                if (err) {
                    console.error('Error occurred:', err);
                    promptUser();
                    return;
                }

                if (results.length > 0) {
                    // User has already rated, update their existing rating
                    if ((isLike && results[0].IsLike) || (!isLike && !results[0].IsLike)) {
                        console.log('You have already made this choice for this comment.');
                        promptUser();
                        return;
                    }

                    const updateQuery = 'UPDATE CommentLikes SET IsLike = ? WHERE UserID = ? AND CommentID = ?';
                    connection.query(updateQuery, [isLike, globalState.userId, commentId], (err, updateResults) => {
                        if (err) {
                            console.error('Error occurred:', err);
                        } else {
                            console.log(`You have successfully changed your rating.`);
                        }
                        promptUser();
                    });
                } else {
                    // Insert new rating
                    const insertQuery = 'INSERT INTO CommentLikes (UserID, CommentID, IsLike) VALUES (?, ?, ?)';
                    connection.query(insertQuery, [globalState.userId, commentId, isLike], (err, insertResults) => {
                        if (err) {
                            console.error('Error occurred:', err);
                        } else {
                            console.log(`You have successfully ${isLike ? 'liked' : 'disliked'} the comment.`);
                        }
                        promptUser();
                    });
                }
            });
        });
    });
};
