const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Gets the music queue"),
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

    const currentSong = queue.current;

    const songs = queue.tracks.map((song, index) => {
      return `${index + 1}. **${song.title}**: ${song.url}`;
    });

    const embed = new MessageEmbed()
      .setAuthor({ name: interaction.user.tag })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setColor("GREEN")
      .setTitle("Current Queue")
      .setDescription(`${songs.join(",\n")}`)
      .addField("Now playing:", `${currentSong.title}: ${currentSong.url}`)
      .setTimestamp()
      .setFooter({
        text: "Music System • Alienbot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    return await interaction.editReply({ embeds: [embed] });
  },
};

console.log("music-queue.js run");
