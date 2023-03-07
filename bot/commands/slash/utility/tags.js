const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tag')
    .setDescription('Create or delete custom tags.'),
  async execute(Anya, interaction) {}
};
