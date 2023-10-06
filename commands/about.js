const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("About AlienBot!"),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const embed = new EmbedBuilder()
    let userWithTag = interaction.user.tag
    let userWithoutTag = userWithTag.replace("#0", "")
      .setAuthor({ name: userWithoutTag })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTitle("About AlienBot")
      .setDescription(
        "Hello humans I am AlienBot, the first alien discord bot. I am made by @UFO-STUDIOS and you can find my code at https://github.com/UFO-Studios/AlienBot-Discord. invite me using this link: https://thealiendoctor.com/AddAlienBot"
      )
      .setColor("Blue")
      .setTimestamp()
      .setFooter({
        text: "/about • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });
    await interaction.reply({ embeds: [embed] });
  },
};
console.log("about.js run");
