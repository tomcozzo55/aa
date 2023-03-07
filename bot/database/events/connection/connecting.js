const chalk = require('chalk');

module.exports = {
  name: 'connecting',
  execute() {
    console.log(chalk.yellow('[DATABASE] - connecting to database...'));
  }
};
