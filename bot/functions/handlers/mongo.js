const { readdirSync } = require('fs');
const { connection } = require('mongoose');

module.exports = (client) => {
  readdirSync('./bot/database/events').forEach((dir) => {
    const eventFiles = readdirSync(`./bot/database/events/${dir}`).filter(
      (file) => file.endsWith('.js')
    );

    for (const file of eventFiles) {
      let event = require(`../../database/events/${dir}/${file}`);
      if (event.once) {
        connection.once(event.name, (...args) =>
          event.execute(client, ...args)
        );
      } else {
        connection.on(event.name, (...args) => event.execute(client, ...args));
      }
    }
  });
};
