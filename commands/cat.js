const {
  SlashCommandBuilder,
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const { default: fetch } = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Get random pics of cats"),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const data = await fetch("https://api.thecatapi.com/v1/images/search").then(
      (d) => d.json()
    );

    const embed = new EmbedBuilder()
      .setTitle("Random Cat Pic")
      .setDescription(`Heres a random cat picture:`)
      .setColor("Blue")
      .setImage(data[0].url)
      .setTimestamp()
      .setFooter({
        text: "/cat • AlienBot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    return await interaction.editReply({
      embeds: [embed],
    });
  },
};

console.log("cat.js run");
