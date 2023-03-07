const { readdirSync } = require('fs');
const chalk = require('chalk');

module.exports = (Anya) => {
  readdirSync('./bot/components/buttons').forEach((dir) => {
    const buttonFiles = readdirSync(`./bot/components/buttons/${dir}`).filter(
      (file) => file.endsWith('.js')
    );

    for (const file of buttonFiles) {
      const button = require(`../../components/buttons/${dir}/${file}`);
      if (button.data.name) {
        Anya.buttons.set(button.data.name, button);
      } else {
        console.log(`[MISSING] - could not find name in ${file}.`.red);
      }
    }
  });
};
