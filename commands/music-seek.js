const { SlashCommandBuilder } = require("discord.js");
const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Seek to the given time")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("time to seek to in seconds, eg: 85")
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

    const queue = client.P.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return await interaction.editReply({
        content: "Music is not being played!",
      });

    const time = await interaction.options.getString("time");

    await queue.seek(time);
    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music seek")
      .setDescription(`Seeked to ${time}s!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.editReply({ embeds: [embed] });
  },
};

console.log("music-seek.js run");
