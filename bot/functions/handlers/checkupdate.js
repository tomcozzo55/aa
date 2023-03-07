const { readFileSync, writeFileSync } = require('fs'),
  { anya, channels } = require('../../config/config'),
  { EmbedBuilder } = require('discord.js'),
  Parser = require('rss-parser'),
  parser = new Parser(),
  chalk = require('chalk');

module.exports = (Anya) => {
  Anya.checkUpdates = async () => {
    try {
      const data = await parser.parseURL(process.env.YT_LINK);
      const rawData = readFileSync('./json/video.json');
      const jsonData = JSON.parse(rawData);

      if (jsonData.id !== data.items[0].id) {
        writeFileSync(
          './json/video.json',
          JSON.stringify({
            id: data.items[0].id
          })
        );
        const guild = await Anya.guilds.fetch(anya.server).catch(console.error);
        const channel = await guild.channels
          .fetch(channels.announcement)
          .catch(console.error);
        const { title, link, author, id } = data.items[0];
        const embed = new EmbedBuilder()
          .setColor('#ff0000')
          .setTitle(title)
          .setURL(link)
          .setTimestamp()
          .setImage(
            `https://img.youtube.com/vi/${id.slice(9)}/maxresdefault.jpg`
          );

        await channel
          .send({
            content:
              '**DEVBEAR JUST UPLOADED A VIDEO**\n ||@everyone|| ||@here||',
            embeds: [embed]
          })
          .catch(console.error);
      }
    } catch (err) {
      console.log(chalk.red(`[ANYA] - could not parse updates.\n ${err}`));
    }
  };
};
