const { Events } = require('discord.js');
const { anya, channels, roles } = require('../../config/config');
const prefix = anya.prefix;

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(Anya, message) {
    //console.log(Anya.emojis)
    ////////////
    if (message.channel.id === channels.public_req) {
      await message.react('<:tick:1002321903622565919>').then(async () => {
        await message.react('<:cross:1002321999319805993>');
      });
    }

    /////////////////
    if (
      message.author.bot ||
      !message.content.toLowerCase().startsWith(prefix) ||
      !anya.devs.includes(message.author.id)
    )
      return;
    const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    if (cmd.length === 0) return;

    const command =
      Anya.commands.get(cmd.toLowerCase()) ||
      Anya.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
    if (!command) return;

    try {
      command.execute(Anya, message, args);
    } catch (error) {
      console.error(error);
    }
  }
};
