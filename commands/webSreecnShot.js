const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("web-screenshot")
    .setDescription("Gets a screenshot of a website")
    .addStringOption((option) =>
      option.setName("website").setDescription("The website to screen shot")
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

    // `const response = await axios.get(
    //   "https://poopoo-api.vercel.app/api/image?url=https://thealiendoctor.com"
    // );`

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
