const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  EmbedBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Set up ticket system.')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('The channel to setup the ticket to.')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(Anya, interaction) {
    const channel = interaction.options.getChannel('channel');

    //button
    const ticketBtn = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('create-ticket')
        .setEmoji('📩')
        .setLabel('Create ticket')
        .setStyle(ButtonStyle.Secondary)
    );

    //embed
    const ticketEmbed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('BEAR BASE TICKET')
      .setDescription(
        'Create a ticket if you need any help from the <@&964169084969295932> team releted to this server.\n**NB:** Creating a ticket without a valid reason will lead to punishment.'
      );
    await interaction.reply({
      content: 'Ticket setup compleated successfully.',
      ephemeral: true
    });
    channel.send({
      embeds: [ticketEmbed],
      components: [ticketBtn]
    });
  }
};
