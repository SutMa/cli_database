const connection = require('../config/db');

module.exports = function(args, rl, promptUser) {
  console.log('Exiting CLI...');
  rl.close();  
  connection.end();  
};
