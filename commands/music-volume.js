const { SlashCommandBuilder } = require("discord.js");
const { Interaction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Gives the current volume or changes the current volume.")
    .addIntegerOption((option) =>
      option
        .setName("volume")
        .setDescription("The volume to set")
        .setRequired(false)
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

    const volume = await interaction.options.getInteger("volume");
    if (!volume) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: interaction.user.tag })
        .setColor("Green")
        .setTitle("Music volume")
        .setDescription(`The current volume is **${queue.volume}**%!`)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({
          text: "Music System • Alienbot",
          iconURL:
            "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
        });

      return await interaction.editReply({ embeds: [embed] });
    }
    if (volume < 0 || volume > 100)
      return await interaction.editReply({ content: "Invalid volume!" });

    const changed = queue.setVolume(volume);

    const successEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music volume")
      .setDescription(`Changed the volume to **${volume}**%!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • Alienbot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    const errorEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music pause")
      .setDescription(`Couldn't change the volume to **${volume}**!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • Alienbot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    return await interaction.editReply({
      embeds: changed ? [successEmbed] : [errorEmbed],
    });
  },
};

console.log("music-volume.js run");
