const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Interaction, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume the current playing stream."),
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
        ephemeral: true,
      });

    const successEmbed = new MessageEmbed()
      .setAuthor({ name: interaction.user.tag })
      .setColor("GREEN")
      .setTitle("Music resume")
      .setDescription(`Resumed **${queue.current.title}**!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • Alienbot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    const errorEmbed = new MessageEmbed()
      .setAuthor({ name: interaction.user.tag })
      .setColor("GREEN")
      .setTitle("Music resume")
      .setDescription(`Couldn't resume **${queue.current}**!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • Alienbot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    const resumed = queue.setPaused(false);
    return await interaction.editReply({
      embeds: resumed ? [successEmbed] : [errorEmbed],
    });
  },
};

console.log("music-resume.js run");
