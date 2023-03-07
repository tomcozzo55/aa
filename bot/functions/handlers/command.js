const { readdirSync } = require('fs');
const chalk = require('chalk');
const ascii = require('ascii-table');
const table = new ascii('COMMANDS');

module.exports = (Anya) => {
  readdirSync('./bot/commands/message/').forEach((folder) => {
    const commandFiles = readdirSync(`./bot/commands/message/${folder}`).filter(
      (file) => file.endsWith('.js')
    );
    for (const file of commandFiles) {
      const command = require(`../../commands/message/${folder}/${file}`);
      if (command.name) {
        table.addRow(command.name, '✅');
        Anya.commands.set(command.name, command);
      } else {
        table.addRow(file, '❌');
      }
    }
  });
  console.log(chalk.blue(table.toString()));
};
