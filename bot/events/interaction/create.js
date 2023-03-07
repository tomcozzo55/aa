const { Events } = require('discord.js');
const chalk = require('chalk');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(Anya, interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.slashes.get(interaction.commandName);
      if (!command) return;
      try {
        command.execute(Anya, interaction);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isButton()) {
      const button = Anya.buttons.get(interaction.customId);
      if (!button) return;
      try {
        button.execute(Anya, interaction);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
