const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.AI_API
});
const chalk = require('chalk');
const openai = new OpenAIApi(configuration);
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('ask anyting to ChatGPT')
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription('question to ask')
        .setRequired(true)
    ),
  async execute(Anya, interaction) {
    await interaction.deferReply();
		try {
			const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      max_tokens: 350,
      temperature: 0.9,
    prompt: `${Anya.user.username} is a friendly chatbot.
             ${Anya.user.username}: Hello, how can I help you?
						 ${interaction.user.username}: ${interaction.options.getString('question')}
             ${Anya.user.username}:
             `,
      stop: [`${Anya.user.username}, ${interaction.user.username}`]
    });
    const res = completion.data.choices[0].text;
    interaction.editReply({
      content: res
    });
		} catch(err) {
			  interaction.editReply({
      content: 'ChatGPT is currently not reponding. Please try again some other time.'
    });
			console.log(chalk.red(`[ChatGPT] - something went wrong.\n${err}`))
		}
  }
};
