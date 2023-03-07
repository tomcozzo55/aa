const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: {
    name: 'verify-me'
  },
  async execute(Anya, interaction) {
    const astronaut = interaction.guild.roles.cache.get('954265490048569377');
    const impostor = interaction.guild.roles.cache.get('954264347360776202');
    if (
      !interaction.member.roles.cache.has(impostor.id) &&
      interaction.member.roles.cache.has(astronaut.id)
    ) {
      interaction.reply({
        content: 'You are already verified.',
        ephemeral: true
      });
    } else {
      interaction.member.roles
        .add(astronaut, 'Verified themselves.')
        .catch(console.error);
      await wait(2000);
      interaction.member.roles
        .remove(impostor, 'Verified themselves.')
        .catch(console.error);
      interaction.reply({
        content: "Congratulations you're now verified!",
        ephemeral: true
      });
    }
  }
};
