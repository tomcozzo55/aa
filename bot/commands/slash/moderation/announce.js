const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('sends a message to ')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('the name of the webhook')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('title')
        .setDescription('the title of the embed')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('the description of the embed')
        .setRequired(true)
    )

    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('The channel to run the announce to.')
        .addChannelTypes(ChannelType.GuildText)
        .addChannelTypes(ChannelType.GuildNews)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(Anya, interaction) {
    await interaction.deferReply({ ephemeral: true });
    const name = interaction.options.getString('name');
    const title = interaction.options.getString('title');
    const message = interaction.options.getString('message');
    const channel =
      interaction.options.getChannel('channel') ?? interaction.channel;

    try {
      const webhooks = await channel.fetchWebhooks().catch(console.error);
      const webhook = webhooks.find((wh) => wh.token);

      if (!webhook) {
        try {
          channel
            .createWebhook({
              name: 'Anya Announcement',
              avatar: Anya.user.displayAvatarURL()
            })
            .then(async (webhook) => {
              await webhook.send({
                username: name ?? 'Announcement',
                avatarURL: interaction.guild.iconURL(),
                embeds: [
                  new EmbedBuilder()
                    .setColor('#7d0404')
                    .setTitle(title.toUpperCase())
                    .setFooter({
                      text: `Sent by: ${interaction.user.username}`,
                      iconURL: interaction.user.displayAvatarURL()
                    })
                    .setDescription(message ?? 'Something went wrong')
                ]
              });
            })
            .catch(console.error);
        } catch (err) {
          console.log('[ANYA] - could not create webhook.\n' + err);
        }
      } else {
        await webhook.send({
          username: name ?? 'Announcement',
          avatarURL: interaction.guild.iconURL(),
          embeds: [
            new EmbedBuilder()
              .setColor('#7d0404')
              .setTitle(title.toUpperCase())
              .setFooter({
                text: `Sent by: ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL()
              })
              .setDescription(message ?? 'Something went wrong')
          ]
        });
      }
    } catch (err) {
      console.log(err);
    }
    await interaction.followUp({
      content: 'Done!'
    });
  }
};
