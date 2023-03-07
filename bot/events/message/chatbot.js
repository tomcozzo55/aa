const { Events } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.AI_API
});
const fetch = require('node-fetch');
const chalk = require('chalk');
module.exports = {
  name: Events.MessageCreate,
  async execute(Anya, message) {
    if (message.channel.id === '1001584567993503895') {
      if (message.author.bot) return;
      const id = process.env.BrainId;
      const api = process.env.BrainApi;

      message.content = message.content
        .replace(/@(everyone)/gi, 'everyone')
        .replace(/@(here)/gi, 'here');
      const mesg = message.content.split(' ').slice(0);
      if (mesg) {
        message.channel.sendTyping();
        try {
          await fetch(
            `http://api.brainshop.ai/get?bid=${id}&key=${api}&uid=${
              message.author.id
            }&msg=${encodeURIComponent(mesg)}`
          )
            .catch((err) => {
              message.channel.send({
                content: 'something went wrong..\n' + err
              });
            })
            .then((res) => res.json())
            .then((data) => {
              message
                .reply({
                  content: data.cnt,
                  allowedMentions: {
                    repliedUser: false
                  }
                })
                .catch((err) => {
                  console.log(err);
                  message.channel.send(`something went wrong\n${err}`);
                });
            });
        } catch (err) {
          const openai = new OpenAIApi(configuration);
          const input = message.content.split(' ').slice(0);
          console.log(chalk.red('[BRAINSHOP] - something went wrong.\n' + err));
          const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            max_tokens: 2048,
            temperature: 0.9,
            prompt: `ChatGpt is a friendly chatbot.\n\
	ChatGPT: Hello there!\n\
${message.member.user.username}: ${input}\n\
ChatGPT:`,
            stop: ['ChatGPT', `${message.member.user.username}`]
          });
          const res = completion.data.choices[0].text;
          message.reply({
            content: res,
            allowedMentions: {
              repliedUser: false
            }
          });
        }
      } else {
        return;
      }
    } else {
      return;
    }
  }
};
