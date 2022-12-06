const { SlashCommandBuilder } = require("discord.js");
const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the current playing stream"),
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

    const paused = queue.setPaused(true);

    const successEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music pause")
      .setDescription(`Paused ${queue.current.title}`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL:
          "https://thealiendoctor.com/img/alienbot/face-64x64.png",
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
        iconURL:
          "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });
    return await interaction.editReply({
      embeds: paused ? [successEmbed] : [errorEmbed],
    });
  },
};

console.log("music-pause.js run");
