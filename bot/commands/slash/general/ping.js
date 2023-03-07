const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Replies with Pong!')
    .addUserOption((option) =>
      option.setName('name').setDescription('test').setRequired(true)
    ),
  async execute(Anya, interaction) {
    const mem = interaction.options.getMember('name');
    await interaction.reply({
      content: mem.user.username
    });
  }
};
