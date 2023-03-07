module.exports = {
  name: 'ping',
  async execute(Anya, message, args) {
    message.reply({
      content: 'Pong!'
    });
  }
};
