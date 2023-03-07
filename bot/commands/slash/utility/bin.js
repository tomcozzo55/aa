const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { pasteInBin } = require('../../../functions/util/util');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('paste')
    .setDescription('Paste your code with source.bin.')
    .addStringOption((option) =>
      option
        .setName('title')
        .setDescription('The title of your bin.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('content')
        .setDescription('The content you want to paste.')
        .setRequired(true)
    ),
  async execute(Anya, interaction) {
    await interaction.deferReply();
    const title = interaction.options.getString('title'),
      content = interaction.options.getString('content'),
      res = await paste(content, title);

    await interaction.editReply(res);
  }
};

async function paste(content, title) {
  const res = await pasteInBin(content, title);
  if (!res)
    return {
      embeds: [
        new EmbedBuilder()
          .setColor('#ff0000')
          .setDescription(
            `<:cross:1002321999319805993> | Couldn't execute the command. Something went wrong.`
          )
      ],
      allowedMentions: { repliedUser: false }
    };
  const SuccessEmbed = new EmbedBuilder()
    .setAuthor({ name: 'ANYA GOT YOUR BIN!' })
    .setColor('#03ad00')
    .setDescription(
      `<:link:1063503846397182123> | [**NORMAL**](${res.url})\n<:link:1063503846397182123> | [**RAW**](${res.raw})`
    );

  return { embeds: [SuccessEmbed] };
}
