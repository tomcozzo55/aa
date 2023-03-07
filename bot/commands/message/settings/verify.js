const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

module.exports = {
  name: 'set-verify',
  aliases: ['verify', 'setverify'],
  async execute(Anya, message, args) {
    let channel = message.guild.channels.cache.get('933615189989937162');
    if (!channel) channel = message.channel;

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('verify-me')
        .setEmoji('📩')
        .setLabel('Verify Me')
        .setStyle(ButtonStyle.Success)
    );

    const embed = new EmbedBuilder()
      .setColor('#ff0000')
      .setDescription(
        "<:idcard:1041319218643206225> | Please verify yourself before accesing the server. This is to prevent raid and self botting. If you're having trouble verifying yourself please mention or dm <@931971127092322396>."
      );

    channel.send({
      embeds: [embed],
      components: [buttons]
    });

    await message.delete();
  }
};
