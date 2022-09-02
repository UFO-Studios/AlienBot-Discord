const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("web-screenshot")
    .setDescription("Gets a screenshot of a website")
    .addStringOption((option) =>
      option
        .setName("website")
        .setDescription("The website to screen shot")
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
    let website = interaction.options.getString("website");
    if (!website.startsWith("https://")) {
      website = "https://" + website;
    }

    try {
      await fetch(website);
    } catch (error) {
      if (error.code == "ENOTFOUND") {
        return await interaction.reply({ content: "Invalid URL." });
      }
    }

    const embed = new EmbedBuilder()
      .setTitle("Website Screenshot")
      .setDescription(`Screen shot of \`${website}\``)
      .setImage(
        `https://v1.nocodeapi.com/kingerious/screen/kBTMlfMgGDvGbeAd/screenshot?url=${website}`
      )
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("Blue")
      .setFooter({
        text: "/web-screenshot • AlienBot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });
    return await interaction.editReply({ embeds: [embed] });
  },
};

console.log("webScreenShot.js run");