const { SlashCommandBuilder } = require("discord.js");
const { Interaction, Client, EmbedBuilder } = require("discord.js");
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
   * @param {Interaction} interaction
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
    const timems = ms(time);

    await queue.seek(timems);
    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music seek")
      .setDescription(`Seeked to ${timems}!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • Alienbot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    return await interaction.editReply({ embeds: [embed] });
  },
};

console.log("music-seek.js run");
