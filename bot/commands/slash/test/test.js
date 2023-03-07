const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ch')
    .setDescription('Replies with Pong!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(Anya, interaction) {
    await interaction.deferReply();
    interaction.guild.channels
      .create({
        name: 'test',
        type: ChannelType.GuildCategory
      })
      .then((c) => {
        interaction.guild.channels
          .create({
            name: 'general',
            type: ChannelType.GuildText,
            parent: c.id
          })
          .then((c) => {
            interaction.guild.channels.create({
              name: 'chat',
              type: ChannelType.GuildText,
              parent: c.parent.id
            });
          });
      });
    interaction.followUp({
      content: 'done'
    });
  }
};
