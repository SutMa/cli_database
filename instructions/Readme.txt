This is a Command Line Interface Application.
To run this program make sure you have the following:
1. Nodejs and NPM installed
2. MySQL installed (server and workbench)
3. Use the dump file to recreate the MySQL database.
   The dumpfile is located in the dumpfile folder.
   This will create a database called blog_database and comes with data inside it as well.

To start make sure you are in the root folder:
1. run "npm install"
2. make a .env file in the root folder, with the following below:
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=PasswordHere
    DB_DATABASE=blog_database
   Make sure to replace the variables that reflect your mySQL database for the connection to work.
   This includes, but limited to things like DB_PASSWORD and others variables that are specific to your system.
3. run "npm run start"
With this the program will run.

By default there are already 2 accounts:
  username: test1
  password: password

  username: test2
  password: password
You can sign in by typing in the command "login".
You can also exit the program by typing in the command "exit".

You can find the list of available commands to run in the commands.txt file located in the instructions folder.
Each command listed comes with extensive documentation. 


The 5 test queries are in testQueries.exe file.
To run enter the following command into command prompt "testQueries.exe"
Keep in mind this is for Windows machine. 
To run executable on MacOS, install Wine through Homebrew. 
Once Wine is installed run "wine testQueries.exe"

Keep in mind for this to work, you will need to create a .env file in the root project folder
or the same folder as the executable. Refer to the instructions above for more info about .env files.

The source code for the test queries are in testQueries.js file. 
For reference the following is the test queries: 
"SELECT Users.Username, BlogPosts.Title FROM Users LEFT JOIN BlogPosts ON Users.UserID = BlogPosts.UserID;",
    "SELECT BlogPosts.PostID, BlogPosts.Title, COUNT(DISTINCT Likes.LikeID) AS TotalLikes, COUNT(DISTINCT Dislikes.DislikeID) AS TotalDislikes FROM BlogPosts LEFT JOIN Likes ON BlogPosts.PostID = Likes.PostID LEFT JOIN Dislikes ON BlogPosts.PostID = Dislikes.PostID GROUP BY BlogPosts.PostID;",
    "SELECT Users.Username, Comments.CommentText FROM Comments JOIN Users ON Comments.UserID = Users.UserID;",
    "SELECT Comments.CommentID, COUNT(CommentLikes.CommentLikeID) AS LikeCount, COUNT(CommentDislikes.CommentDislikeID) AS DislikeCount FROM Comments LEFT JOIN CommentLikes ON Comments.CommentID = CommentLikes.CommentID LEFT JOIN CommentDislikes ON Comments.CommentID = CommentDislikes.CommentID GROUP BY Comments.CommentID;",
    "SELECT 'User' AS EntityType, UserID AS EntityID, CreatedAt FROM Users UNION ALL SELECT 'BlogPost', PostID, CreatedAt FROM BlogPosts UNION ALL SELECT 'Comment', CommentID, CreatedAt FROM Comments ORDER BY CreatedAt DESC;"

To run type in the terminal testQueries.exe:
The outcome of the test queries should be printed in the terminal as follows: 
*************************************************************************************************************************
Query:  SELECT Users.Username, BlogPosts.Title FROM Users LEFT JOIN BlogPosts ON Users.UserID = BlogPosts.UserID;
Results:  [
  { Username: 'test1', Title: '3rd Post' },
  { Username: 'test1', Title: '2nd Post' },
  { Username: 'test1', Title: '1st post' },
  { Username: 'test2', Title: '6th Post' },
  { Username: 'test2', Title: '5th Post' },
  { Username: 'test2', Title: '4th Post' }
]
----------------------------------------------------
Query:  SELECT BlogPosts.PostID, BlogPosts.Title, COUNT(DISTINCT Likes.LikeID) AS TotalLikes, COUNT(DISTINCT Dislikes.DislikeID) AS TotalDislikes FROM BlogPosts LEFT JOIN Likes ON BlogPosts.PostID = Likes.PostID LEFT JOIN Dislikes ON BlogPosts.PostID = Dislikes.PostID GROUP BY BlogPosts.PostID;
Results:  [
  { PostID: 1, Title: '1st post', TotalLikes: 1, TotalDislikes: 0 },
  { PostID: 2, Title: '2nd Post', TotalLikes: 0, TotalDislikes: 1 },
  { PostID: 3, Title: '3rd Post', TotalLikes: 1, TotalDislikes: 0 },
  { PostID: 4, Title: '4th Post', TotalLikes: 1, TotalDislikes: 0 },
  { PostID: 5, Title: '5th Post', TotalLikes: 0, TotalDislikes: 1 },
  { PostID: 6, Title: '6th Post', TotalLikes: 1, TotalDislikes: 0 }
]
----------------------------------------------------
Query:  SELECT Users.Username, Comments.CommentText FROM Comments JOIN Users ON Comments.UserID = Users.UserID;
Results:  [
  {
    Username: 'test1',
    CommentText: 'This is the best thing that I have read.'
  },
  {
    Username: 'test1',
    CommentText: 'This is alright. Not that good of a read.'
  },
  {
    Username: 'test1',
    CommentText: 'This was a good read. I agree on most of this stuff.'
  },
  { Username: 'test2', CommentText: 'THis was a great blog post!!' },
  { Username: 'test2', CommentText: 'This was a bad take.' },
  { Username: 'test2', CommentText: 'I agree with this!' }
]
----------------------------------------------------
Query:  SELECT Comments.CommentID, COUNT(CommentLikes.CommentLikeID) AS LikeCount, COUNT(CommentDislikes.CommentDislikeID) AS DislikeCount FROM Comments LEFT JOIN CommentLikes ON Comments.CommentID = CommentLikes.CommentID LEFT JOIN CommentDislikes ON Comments.CommentID = CommentDislikes.CommentID GROUP BY Comments.CommentID;
Results:  [
  { CommentID: 1, LikeCount: 1, DislikeCount: 0 },
  { CommentID: 2, LikeCount: 1, DislikeCount: 0 },
  { CommentID: 3, LikeCount: 1, DislikeCount: 0 },
  { CommentID: 4, LikeCount: 1, DislikeCount: 0 },
  { CommentID: 5, LikeCount: 1, DislikeCount: 0 },
  { CommentID: 6, LikeCount: 1, DislikeCount: 0 }
]
----------------------------------------------------
Query:  SELECT 'User' AS EntityType, UserID AS EntityID, CreatedAt FROM Users UNION ALL SELECT 'BlogPost', PostID, CreatedAt FROM BlogPosts UNION ALL SELECT 'Comment', CommentID, CreatedAt FROM Comments ORDER BY CreatedAt DESC;
Results:  [
  {
    EntityType: 'Comment',
    EntityID: 6,
    CreatedAt: 2023-11-26T02:39:12.000Z
  },
  {
    EntityType: 'Comment',
    EntityID: 5,
    CreatedAt: 2023-11-26T02:38:59.000Z
  },
  {
    EntityType: 'Comment',
    EntityID: 4,
    CreatedAt: 2023-11-26T02:38:46.000Z
  },
  {
    EntityType: 'Comment',
    EntityID: 3,
    CreatedAt: 2023-11-26T02:37:40.000Z
  },
  {
    EntityType: 'Comment',
    EntityID: 2,
    CreatedAt: 2023-11-26T02:37:18.000Z
  },
  {
    EntityType: 'Comment',
    EntityID: 1,
    CreatedAt: 2023-11-26T02:36:54.000Z
  },
  {
    EntityType: 'BlogPost',
    EntityID: 6,
    CreatedAt: 2023-11-26T02:27:25.000Z
  },
  {
    EntityType: 'BlogPost',
    EntityID: 5,
    CreatedAt: 2023-11-26T02:27:07.000Z
  },
  {
    EntityType: 'BlogPost',
    EntityID: 4,
    CreatedAt: 2023-11-26T02:26:53.000Z
  },
  {
    EntityType: 'BlogPost',
    EntityID: 3,
    CreatedAt: 2023-11-26T02:26:22.000Z
  },
  {
    EntityType: 'BlogPost',
    EntityID: 2,
    CreatedAt: 2023-11-26T02:26:05.000Z
  },
  {
    EntityType: 'BlogPost',
    EntityID: 1,
    CreatedAt: 2023-11-26T02:25:50.000Z
  },
  {
    EntityType: 'User',
    EntityID: 2,
    CreatedAt: 2023-11-26T02:20:08.000Z
  },
  {
    EntityType: 'User',
    EntityID: 1,
    CreatedAt: 2023-11-26T02:19:42.000Z
  }
]
----------------------------------------------------
**********************************************************************************************************************
