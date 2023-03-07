const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Clears a number of messages from a channel.')
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('The amount of messages you want to delete.')
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('The channel to run the purge to.')
        .addChannelTypes(ChannelType.GuildText)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(Anya, interaction) {
    const amount = interaction.options.getInteger('amount');
    const channel =
      interaction.options.getChannel('channel') ?? interaction.channel;

    await channel
      .bulkDelete(amount)
      .then(() => {
        interaction.reply({
          content: `Deleted ${amount} messages from ${channel}`,
          ephemeral: true
        });
      })
      .catch((err) => {
        interaction.reply({
          content: `An error occured executing this command.\n\`\`\`${err}\`\`\``,
          ephemeral: true
        });
      });
  }
};
