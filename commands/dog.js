const {
  SlashCommandBuilder,
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const { default: fetch } = require("node-fetch");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
  data: new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Get random pics of dogs"),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const data = await fetch("https://dog.ceo/api/breeds/image/random").then(
      (d) => d.json()
    );

    const embed = new EmbedBuilder()
      .setTitle("Random Dog Pic")
      .setDescription(`Heres a random dog picture:`)
      .setColor("Blue")
      .setImage(data.message)
      .setTimestamp()
      .setFooter({
        text: "/dog • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.editReply({
      embeds: [embed],
    });
  },
};

//consoleMessage("dog.js run", "botInit")
