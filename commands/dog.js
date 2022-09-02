const {
  SlashCommandBuilder,
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const { default: fetch } = require("node-fetch");

module.exports = {
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
    await interaction.deferReply()
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
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    return await interaction.editReply({
      embeds: [embed],
    });
  },
};

console.log("dog.js run");
