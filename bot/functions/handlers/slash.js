const { PermissionsBitField, Routes, REST } = require('discord.js');
const { readdirSync } = require('fs');
const { anya } = require('../../config/config');
const chalk = require('chalk');

module.exports = (Anya) => {
  const commands = [];
  readdirSync('./bot/commands/slash/').forEach((folder) => {
    const commandFiles = readdirSync(`./bot/commands/slash/${folder}`).filter(
      (file) => file.endsWith('.js')
    );

    for (const file of commandFiles) {
      const command = require(`../../commands/slash/${folder}/${file}`);
      if ('data' in command && 'execute' in command) {
        Anya.slashes.set(command.data.name, command);
        commands.push(command.data.toJSON());
      } else {
        console.log(
          chalk.red(`[ANYA] - could not load slash command in ${file}`)
        );
        continue;
      }
    }
  });

  const id = anya.client;
  const token = process.env.peanut;
  const guildid = anya.server;
  const rest = new REST({ version: '10' }).setToken(token);
  (async () => {
    try {
      console.log(
        chalk.cyan(
          `[ANYA] - started refreshing ${commands.length} application (/) commands.`
        )
      );
      const data = await rest.put(
        Routes.applicationGuildCommands(id, guildid),
        { body: commands }
      );
      console.log(
        chalk.cyan(
          `[ANYA] - successfully reloaded ${data.length} application (/) commands.`
        )
      );
    } catch (error) {
      console.error(error);
    }
  })();
};
