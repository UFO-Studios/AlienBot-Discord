const { SlashCommandBuilder } = require("discord.js");
const {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the song and move towards the next one!"),
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

    const currentSong = queue.current;

    const skipped = queue.skip();

    const successEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music skip")
      .setDescription(`Skipped **${currentSong}**!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    const errorEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music skip")
      .setDescription(`Couldn't skip **${queue.current.title}**!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.editReply({
      embeds: skipped ? [successEmbed] : [errorEmbed],
    });
  },
};

console.log("music-skip.js run");
