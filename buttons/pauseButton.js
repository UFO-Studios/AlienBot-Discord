const { useMasterPlayer } = require("discord-player");
const {
  MessageComponentInteraction,
  Client,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  name: "pauseButton",
  /**
   * @param {MessageComponentInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const player = useMasterPlayer();

    const queue = player.nodes.get(interaction.guildId);
    if (!queue || !queue.isPlaying())
      return await interaction.editReply({
        content: "Music is currently not being played!",
      });

    const currentSong = queue.currentTrack;
    const paused = queue.node.setPaused(true);

    const successEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music pause")
      .setDescription(`Paused **${currentSong}**`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    const errorEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music pause")
      .setDescription("There was an error pausing the music stream!")
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.followUp({
      embeds: paused ? [successEmbed] : [errorEmbed],
    });
  },
};

console.log("pauseButton.js run");
