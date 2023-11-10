const { useMasterPlayer } = require("discord-player");
const { lyricsExtractor } = require("@discord-player/extractor");
const {
  MessageComponentInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const { consoleMessage } = require("../log");

module.exports = {
  name: "lyricButton",
  /**
   * @param {MessageComponentInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const player = useMasterPlayer();
    const search = lyricsExtractor();

    const queue = player.nodes.get(interaction.guildId);
    if (!queue || !queue.isPlaying())
      return await interaction.editReply({
        content: "Music is currently not being played!",
      });

    const currentSong = queue.currentTrack.title;

    const result = await search.search(currentSong);

    if (!result) {
      const errorEmbed = new EmbedBuilder()
        .setAuthor({ name: interaction.user.tag })
        .setColor("Green")
        .setTitle("Music Lyrics")
        .setDescription(`No lyrics found for **${currentSong}**!`)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({
          text: "Music System • AlienBot",
          iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
        });

      return await interaction.followUp({ embeds: [errorEmbed] });
    }

    const lyrics = result.lyrics.substring(0, 4000);

    const successEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music Lyrics")
      .setDescription(
        `Here are the lyrics for ${currentSong}:\n${
          lyrics.length == 4000 ? `${lyrics}...` : `${lyrics}`
        }`
      )
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.followUp({
      embeds: [successEmbed],
    });
  },
};

consoleMessage("pauseButton.js run", "botInit");
