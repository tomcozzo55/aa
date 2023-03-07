const { Events, ChannelType } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: Events.MessageDelete,
  once: false,
  async execute(Anya, message) {
    try {
      if (!message.guild || message.author.bot) return;
      const { channel, type, author, attachments, createdAt } = message;

      const user = message.member.user ?? author;
      let content = message.content;
      if (content === '') content = '\u200B';

      Anya.snipes.set(channel.id, {
        author: {
          tag: user.tag,
          discriminator: user.discriminator,
          id: user.id,
          type: user.bot ? 'BOT' : 'USER',
          dp: message.member.user.displayAvatarURL({
            dynamic: true,
            size: 2048
          })
        },
        msg: {
          id: message.id,
          content: content,
          channel: channel,
          type: type,
          image: attachments.first()
            ? attachments.first().proxyURL
            : 'https://cdn.discordapp.com/attachments/933615219761111060/1067435822049148939/no_image.png',
          time: moment(createdAt).format('llll'),
          channel: channel.id,
          ch_type: channel.type
        }
      });
      // console.log(Anya.snipes.get(message.channel.id))
    } catch (err) {
      // console.log(message + "\nError:\n" + err)
      return;
    }
  }
};
