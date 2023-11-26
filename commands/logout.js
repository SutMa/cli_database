// commands/logout.js

module.exports = function(args, rl, promptUser, globalState) {
  if (!globalState.isLoggedIn) {
      console.log('No user is currently logged in.');
      promptUser();
      return;
  }

  // Reset the globalState to log out the user
  globalState.isLoggedIn = false;
  globalState.userId = null;

  console.log('You have been logged out successfully.');
  
  promptUser(); // Re-prompt for the next command
};
