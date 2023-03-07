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
    name: 'create-ticket'
  },
  async execute(Anya, interaction) {
    await interaction.deferReply({ ephemeral: true });
    const channel = interaction.channel;
    let data = await schema.findOne({
      guildId: interaction.guild.id,
      userId: interaction.user.id
    });
    if (data && interaction.user.id === data.userId) {
      interaction.followUp({
        embeds: [
          new EmbedBuilder()
            .setColor('ff0000')
            .setDescription(
              '<:cross:1002321999319805993> | You already have a ticket open. Ask an admin or moderator to close the ticket before trying again.'
            )
        ]
      });
    } else {
      data = new schema({
        guildId: interaction.guild.id,
        userId: interaction.user.id
      });
      await data.save().catch(console.error);
      data.ticketCount += 1;
      await data.save().catch(console.error);

      const ticketh = interaction.guild.channels
        .create({
          name: `ticket-${'0'.repeat(4 - data.ticketCount.toString().length)}${
            data.ticketCount
          }`,
          type: ChannelType.GuildText,
          parent: channel.parent.id,
          permissionOverwrites: [
            {
              id: interaction.user.id,
              allow: [PermissionsBitField.Flags.ViewChannel, 'SendMessages']
            },
            {
              id: interaction.guild.id,
              deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: Anya.user.id,
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.ManageChannels,
                PermissionsBitField.Flags.ManageMessages
              ]
            },
            {
              id: '964169084969295932',
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.ManageChannels,
                PermissionsBitField.Flags.ManageMessages
              ]
            }
          ]
        })
        .then(async (ticketh) => {
          const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('close-ticket')
              .setEmoji('🔒')
              .setLabel('Close ticket')
              .setStyle(ButtonStyle.Danger)
          );
          const tickedEmbed = new EmbedBuilder()
            .setColor('ff0000')
            .setTitle(interaction.user.username + "'s Ticket")
            .setDescription(
              '🎫 | Someone from the <@&964169084969295932> team will be here shortly.\nIn the mean time explain your issue.'
            );
          await ticketh.send({
            embeds: [tickedEmbed],
            components: [buttons]
          });
          await interaction.followUp({
            embeds: [
              new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription(
                  `<:tick:1002321903622565919> | Your ticket has been created in <#${ticketh.id}>`
                )
            ]
          });
        });
    }
  }
};
