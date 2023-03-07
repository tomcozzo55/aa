const {
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField
} = require('discord.js');
const schema = require('../../../database/schema/ticket');

module.exports = {
  data: {
    name: 'close-ticket'
  },
  async execute(Anya, interaction) {
    interaction.deferReply();
    let data = await schema.findOne({
      guildId: interaction.guild.id
    });
    await interaction.channel.permissionOverwrites.edit(data.userId, {
      ViewChannel: false
    });
    data.delete().catch(console.error);
    interaction.followUp({
      content: `${interaction.user} has closed the ticket.`,
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('delete-ticket')
            .setEmoji('🗑')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId('reopen-ticket')
            .setEmoji('🔓')
            .setLabel('Re-open')
            .setStyle(ButtonStyle.Success)
        )
      ]
    });
  }
};
