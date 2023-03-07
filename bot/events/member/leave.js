const { Events, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas');
const chalk = require('chalk');
registerFont('./assets/fonts/impact.ttf', { family: 'Impact' });
registerFont('./assets/fonts/crowden.ttf', { family: 'Crowden' });

module.exports = {
  name: Events.GuildMemberRemove,
  once: false,
  async execute(Anya, member) {
    const channel = member.guild.channels.cache.get('933615186932281384');

    const canvas = createCanvas(1400, 514);
    const ctx = canvas.getContext('2d');
    const backgroundImage =
      'https://cdn.discordapp.com/attachments/933734336069509190/1061002009014194217/eb2967f12914edb92c50f927b7978c1d.jpg';
    const joinbg = await loadImage(backgroundImage);
    ctx.drawImage(joinbg, 0, 0, canvas.width, canvas.height);

    const overlayIMG =
      'https://cdn.discordapp.com/attachments/933734336069509190/1060888374057128037/leaveoverlay.jpg';
    const overlay = await loadImage(overlayIMG);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1.0;
    ctx.font = 'Bold 150px Impact';
    ctx.fillStyle = '#F8F8F8';
    ctx.textAlign = 'center';
    ctx.fillText('GOODBYE', 747, 280);

    ctx.font = 'Bold 50px Crowden';
    ctx.fillStyle = '#F8F8F8';
    ctx.textAlign = 'left';
    ctx.fillText(member.user.tag.toUpperCase(), 480, 350);

    ctx.beginPath();
    ctx.arc(270, 257, 150, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(
      member.user.displayAvatarURL({ extension: 'jpg', size: 512 })
    );
    ctx.drawImage(avatar, 100, 100, 340, 340);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: 'welcomecard.png'
    });

    try {
      const webhooks = await channel.fetchWebhooks().catch(console.error);
      const webhook = webhooks.find((wh) => wh.token);

      if (!webhook) {
        return channel.send({
          content: `**${member.user.username.toUpperCase()} JUST LEFT THE SERVR.**`,
          files: [attachment]
        });
      }

      await webhook.send({
        username: 'WELCOMER',
        avatarURL: member.guild.iconURL(),
        content: `**${member.user.username.toUpperCase()} JUST LEFT THE SERVR.**`,
        files: [attachment]
      });
    } catch (error) {
      console.error(
        chalk.red(
          'Something went wrong while executing guild member add event.\n',
          error
        )
      );
    }
  }
};
