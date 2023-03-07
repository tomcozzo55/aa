const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.AI_API
});
const openai = new OpenAIApi(configuration);
module.exports = {
  data: new SlashCommandBuilder()
    .setName('image')
    .setDescription('ChatGPT image generation...')
    .addStringOption((option) =>
      option
        .setName('prompt')
        .setDescription('The input to submit')
        .setRequired(true)
    ),
  async execute(Anya, interaction) {
    await interaction.reply({
      content: 'generating image...'
    });
    const prompt = interaction.options.getString('prompt');
    const response = await openai
      .createImage({
        prompt,
        n: 1,
        size: '1024x1024',
        user: interaction.member.user.tag
      })
      .catch((err) => {
        interaction.editReply({
          content: `Something went wrong\n\`\`\`js\n${err.toString()}\n\`\`\``
        });
      });
    if (!response) return;
    const url = response.data.data[0].url;
    await interaction.editReply({
      content: 'Image: ' + prompt,
      files: [new AttachmentBuilder(url, { name: 'image.png' })]
    });
  }
};
