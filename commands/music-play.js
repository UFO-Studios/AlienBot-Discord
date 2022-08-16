require("discord-player/smoothVolume");
const { SlashCommandBuilder } = require("discord.js");
const { Client, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song with its name!")
    .addStringOption((option) =>
      option
        .setName("song-name")
        .setDescription("The name of the song you want to play")
        .setRequired(true)
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const songName = interaction.options.get("song-name").value;

    if (!interaction.member.voice.channelId)
      return await interaction.editReply({
        content: "You are not in a voice channel!",
        ephemeral: true,
      });

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.members.me.voice.channelId
    )
      return await interaction.editReply({
        content: "You are not in my current voice channel!",
        ephemeral: true,
      });

    const queue = client.P.createQueue(interaction.guild, {
      metadata: {
        channel: interaction.channel,
      },
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      queue.destroy();
      return await interaction.editReply({
        content: "Error joining your voice channel!",
        ephemeral: true,
      });
    }

    const song = await client.P.search(songName, {
      requestedBy: interaction.user,
    }).then((x) => x.tracks[0]);

    if (!song)
      return await interaction.editReply({
        content: `Song ${songName} not found!`,
        ephemeral: true,
      });

    queue.addTrack(song);
    if (!queue.playing) await queue.play();

    return await interaction.editReply({ content: "Added to the queue!" });
  },
};

console.log("music-play.js run");
