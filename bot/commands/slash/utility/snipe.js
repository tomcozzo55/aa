const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
  MessageType,
  PermissionFlagsBits
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('Snipe the last deleted message of a channel.')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('The channel to snipe.')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannel),
  async execute(Anya, interaction) {
    await interaction.deferReply();
    const channel =
        interaction.options.getChannel('channel') ?? interaction.channel,
      data = Anya.snipes.get(channel.id);

    if (data) {
      const snipeEmbed = new EmbedBuilder()
        .setColor('#ffcc00')
        .setDescription(
          `Anya found a top secret info for you! A message was deleted in <#${channel.id}> recently.`
        )
        .addFields(
          {
            name: 'Message Content',
            value: data.msg.content ?? '**NONE**',
            inline: false
          },
          {
            name: 'Message id',
            value: data.msg.id,
            inline: false
          },
          {
            name: 'Created at',
            value: data.msg.time,
            inline: false
          },
          {
            name: 'Message type',
            value: MessageType[data.msg.type],
            inline: false
          },
          {
            name: 'Author name',
            value: data.author.tag,
            inline: true
          },
          {
            name: 'Author id',
            value: data.author.id
          },
          {
            name: 'Author type',
            value: data.author.type
          },
          {
            name: '\u200B',
            value: '**ATTACHMENT:**'
          }
        )
        .setThumbnail(data.author.dp)
        .setImage(data.msg.image);

      await interaction.editReply({
        embeds: [snipeEmbed]
      });
    } else {
      await interaction.editReply({
        content: 'nothing to snipe here.'
      });
    }
  }
};
