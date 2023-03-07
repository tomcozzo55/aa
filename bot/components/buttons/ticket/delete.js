const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'delete-ticket'
  },
  async execute(Anya, interaction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(
            '<:tick:1002321903622565919> | Ticket will be deleted in a few moment...'
          )
      ]
    });
    setTimeout(() => {
      interaction.channel.delete().catch(console.error);
    }, 4000);
  }
};
