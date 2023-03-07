const { Client, Collection, Partials } = require('discord.js');
const chalk = require('chalk');

const Anya = new Client({
  intents: 3276799,
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ],
  allowedMentions: {
    parse: ['everyone', 'roles', 'users'],
    repliedUSer: false
  }
});

//collections
Anya.events = new Collection();
Anya.commands = new Collection();
Anya.slashes = new Collection();
Anya.buttons = new Collection();
Anya.snipes = new Collection();

module.exports = Anya;

['event', 'command', 'slash', 'components', 'checkupdate', 'mongo'].forEach(
  (file) => {
    require(`./functions/handlers/${file}`)(Anya);
  }
);

Anya.login(process.env.peanut).catch((err) => {
  console.log(chalk.red(`[ANYA] - anya could not eat peanuts :\(`));
  process.exit();
});

setInterval(() => {
  if (!Anya || !Anya.user) {
    process.kill(1);
    console.log(chalk.red('[ANYA] - could not find anya, calling yor...'));
  }
}, 5000);

/*
process.on('unhandledRejection', (error) => {
  console.log(chalk.red('Unhandled promise rejection:', error));
});
process.on('MongooseServerSelectionError', (error, reason) => {
  console.log(
    chalk.red(
      `[MONGO] - could not connect to database\n` + error + '\n' + reason
    )
  );
});
*/
