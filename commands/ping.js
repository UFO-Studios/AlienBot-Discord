const { SlashCommandBuilder } = require("discord.js");
const {
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Blue")
      .setTitle("Ping.")
      .setDescription(`🏓 | Ping is \`${client.ws.ping}\` ms.`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "/ping • AlienBot",
        iconURL:
          "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });
    return await interaction.reply({ embeds: [embed] });
  },
};
console.log("ping.js run");
