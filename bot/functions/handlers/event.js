const { readdirSync } = require('fs');
const chalk = require('chalk');
const ascii = require('ascii-table');
const table = new ascii('EVENTS');

module.exports = (Anya) => {
  readdirSync('./bot/events/').forEach((folder) => {
    const eventFiles = readdirSync(`./bot/events/${folder}`).filter((file) =>
      file.endsWith('.js')
    );
    for (const file of eventFiles) {
      const event = require(`../../events/${folder}/${file}`);
      if (event.name) {
        table.addRow(event.name, '✅');
        Anya.events.set(event.name, event);
        if (event.once) {
          Anya.once(event.name, (...args) => event.execute(Anya, ...args));
        } else {
          Anya.on(event.name, (...args) => event.execute(Anya, ...args));
        }
      } else {
        table.addRow(file, '❌');
      }
    }
  });
  console.log(chalk.blue(table.toString()));
};
