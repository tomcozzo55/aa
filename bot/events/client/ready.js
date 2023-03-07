const { Events } = require('discord.js');
const chalk = require('chalk');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(Anya) {
    console.log(
      chalk.green(
        '[ANYA] - ' + Anya.user.username.toLowerCase() + ' is online.'
      )
    );
    const activities = ['for DevBear!', 'for your mom ;-;', 'BEAR BASE'];
    const status = ['online', 'dnd', 'idle', 'invisible'];
    let i = 0;
    setInterval(
      () =>
        Anya.user.setActivity(`${activities[i++ % activities.length]}`, {
          type: 5
        }),
      12000
    );
    setInterval(
      () => Anya.user.setStatus(`${status[i++ % status.length]}`),
      20000
    );
    setTimeout(Anya.checkUpdates, 18 * 1000000);
  }
};
