const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder
} = require('discord.js');

const {
  createAudioPlayer,
  createAudioResource,
  StreamType,
  demuxProbe,
  joinVoiceChannel,
  NoSubscriberBehavior,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  getVoiceConnection
} = require('@discordjs/voice');

var Spotify = require('spotify-web-api-js');
var spotify = new Spotify();

const play = require('play-dl');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Replies with Pong!')
    .addStringOption((option) =>
      option.setName('song').setDescription('song to play').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(Anya, interaction) {
    const query = interaction.options.getString('song');

    await interaction.deferReply();

    if (!interaction.member.voice?.channel) {
      await interaction.editReply({
        content: 'You are not connected to a vc.'
      });
      return;
    }

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator
    });

    let track = await play.search(query, {
      limit: 1
    });

    let stream = await play.stream(track[0].url);
    let resource = createAudioResource(stream.stream, {
      inputType: stream.type
    });

    let player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play
      }
    });

    player.play(resource);
    connection.subscribe(player);
    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor('#ffffff')
          .setDescription(
            `<:tick:1002321903622565919> | Playing ${track[0].title}`
          )
      ]
    });
  }
};
