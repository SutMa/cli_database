const mysql2 = require('mysql2');
require('dotenv').config();

const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
});


const queries = [
    "SELECT Users.Username, BlogPosts.Title FROM Users LEFT JOIN BlogPosts ON Users.UserID = BlogPosts.UserID;",
    "SELECT BlogPosts.PostID, BlogPosts.Title, COUNT(DISTINCT Likes.LikeID) AS TotalLikes, COUNT(DISTINCT Dislikes.DislikeID) AS TotalDislikes FROM BlogPosts LEFT JOIN Likes ON BlogPosts.PostID = Likes.PostID LEFT JOIN Dislikes ON BlogPosts.PostID = Dislikes.PostID GROUP BY BlogPosts.PostID;",
    "SELECT Users.Username, Comments.CommentText FROM Comments JOIN Users ON Comments.UserID = Users.UserID;",
    "SELECT Comments.CommentID, COUNT(CommentLikes.CommentLikeID) AS LikeCount, COUNT(CommentDislikes.CommentDislikeID) AS DislikeCount FROM Comments LEFT JOIN CommentLikes ON Comments.CommentID = CommentLikes.CommentID LEFT JOIN CommentDislikes ON Comments.CommentID = CommentDislikes.CommentID GROUP BY Comments.CommentID;",
    "SELECT 'User' AS EntityType, UserID AS EntityID, CreatedAt FROM Users UNION ALL SELECT 'BlogPost', PostID, CreatedAt FROM BlogPosts UNION ALL SELECT 'Comment', CommentID, CreatedAt FROM Comments ORDER BY CreatedAt DESC;"
];

queries.forEach(query => {
    connection.query(query, (err, results) => {
        if (err) throw err;
        console.log("Query: ", query);
        console.log("Results: ", results);
        console.log("----------------------------------------------------");
    });
});

connection.end();
