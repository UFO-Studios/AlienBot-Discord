const { SlashCommandBuilder } = require("discord.js");
const {
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
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
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });
    //consoleMessage("Bots ping is " + client.ws.ping, "ping");
    return await interaction.reply({ embeds: [embed] });
  },
};
//consoleMessage("ping.js run", "botInit");
