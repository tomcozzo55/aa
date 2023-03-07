const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const chalk = require('chalk');
const { ocrSpace } = require('ocr-space-api-wrapper');
const { channels, roles } = require('@config/config.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('sub')
    .setDescription('Subscribe proof.')
    .addAttachmentOption((option) =>
      option
        .setRequired(true)
        .setName('screenshot')
        .setDescription("Screenshot that shows you're subscribed")
    ),
  async execute(Anya, interaction) {
    await interaction.deferReply({
      ephemeral: true
    });

    const api = process.env.OCR_API;
    const attachment = interaction.options.getAttachment('screenshot');
    const url = attachment.url;
    const role = interaction.guild.roles.cache.get(roles.subscriber);
    const res = await ocrSpace(url, { apiKey: api });
    const text = res.ParsedResults[0].ParsedText.toLowerCase();

    if (text.includes('devbear') && text.includes('subscribed')) {
      if (interaction.member.roles.cache.has(roles.subscriber)) {
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor('#f6ff00')
              .setDescription(
                '<:idcard:1041319218643206225> | You already have the <@&1066841777895653406> role equiped. Please check <#1066841701076959252> for the source codes.\nOh, and thank you so much for subscribeng to [DevBear](https://www.youtube.com/@devbear69)'
              )
          ],
          ephemeral: true
        });
      } else {
        await interaction.member.roles.add(role, 'Subscribed!').catch((err) => {
          console.log(
            chalk.red(
              '[ANYA] - could not add subscriber role to this member.\n' + err
            )
          );
        });
        interaction.guild.channels.cache.get(channels.log).send({
          embeds: [
            new EmbedBuilder()
              .setColor('#04ff00')
              .setTitle('SUBSCRIBER ROLE ADDED!')
              .setDescription(
                `${interaction.member} just prooved that he is subscribed and equiped the <@&1066841777895653406> from Anya!`
              )
              .setThumbnail(
                interaction.member.user.displayAvatarURL({
                  dynamic: true,
                  size: 4096
                })
              )
              .setImage(attachment.url)
              .setTimestamp()
          ],
          ephemeral: true
        });

        interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor('#00a31b')
              .setDescription(
                '<:tick:1002321903622565919> | Congratulations! You have successfully equiped the <@&1066841777895653406> role.\nPlease check <#1066841701076959252> for the source codes. and thank you so much for subscribing to DevBear.'
              )
          ],
          ephemeral: true
        });
      }
    } else {
      interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor('#fc0303')
            .setDescription(
              '<:cross:1002321999319805993> | The screenshot you provided doesnt proof that you are actually subscribed to [DevBear](https://www.youtube.com/@devbear69).\nPlease make sure you are subscribed to the correct channel and make sure the screenshot you provided is clear and shows channel dp, channel name, subscribe count and your subscribe status.\n If you still facing problem feel free to create a ticket.'
            )
        ],
        ephemeral: true
      });
    }
  }
};
