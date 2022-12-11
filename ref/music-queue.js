const { SlashCommandBuilder } = require("discord.js");
const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Gets the music queue"),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.P.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return await interaction.editReply({
        content: "Music is not being played!",
      });

    currentSong = queue.current;

    const songs = queue.tracks.map(
      (song, index) => `${index + 1}. **${song.title}**: ${song.url}`
    );

    const embed = new EmbedBuilder()
      .setTitle("Current Queue")
      .setDescription(`${songs.join(",\n")}`)
      .setAuthor({ name: interaction.user.tag })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setColor("Green")
      .addFields({
        name: "Now playing:",
        value: `${currentSong.title}: ${currentSong.url}`,
      })
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.editReply({ embeds: [embed] });
  },
};

console.log("ref/music-queue.js run");
