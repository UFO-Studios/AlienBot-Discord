const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stop the current playing song."),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const queue = client.P.getQueue(interaction.guildId);
    if (!queue || !queue.playing) {
      return await interaction.reply({ content: "Music is not being played!" });
    } else {
      const currentSong = queue.current;
      await queue.destroy();
      const embed = new EmbedBuilder()
        .setTitle("Stop Music")
        .setDescription(
          `Music stopped. \n**Song that was being played**: ${currentSong.title}: ${currentSong.url}`
        )
        .setAuthor({ name: interaction.user.tag })
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setColor("Green")
        .setTimestamp()
        .setFooter({
          text: "Music System • Alienbot",
          iconURL:
            "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
        });

      return await interaction.reply({ embeds: [embed] });
    }
  },
};

console.log("music-stop.js running");
