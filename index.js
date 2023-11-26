const readline = require('readline');
const path = require('path');
const fs  = require('fs');
const connection = require('./config/db.js');

let globalState = {
  isLoggedIn: false,
  userId: null
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Connected to MySQL');

const promptUser = () => {
  rl.question('Enter a command: ', (input) => {
      const [command, ...args] = input.split(' ');
      const commandPath = path.join(__dirname, 'commands', `${command}.js`);

      if (fs.existsSync(commandPath)) {
          const commandFunction = require(commandPath);
          commandFunction(args, rl, promptUser, globalState);  // Passing args, readline interface, and promptUser function
      } else {
          console.log('Command not found');
          promptUser();  // Re-prompt if command not found
      }
  });
};

promptUser();