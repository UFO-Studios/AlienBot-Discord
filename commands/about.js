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
      .setAuthor({ name: interaction.user.tag })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTitle("About AlienBot")
      .setDescription(
        "Hello humans I am AlienBot, the first alien discord bot. I am made by @UFO-STUDIOS and you can find my code at https://github.com/UFO-Studios/AlienBot-2.0. invite me using this link: https://thealiendoctor.com/AddAlienBot"
      )
      .setColor("Blue")
      .setTimestamp()
      .setFooter({
        text: "/about • AlienBot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });
    await interaction.reply({ embeds: [embed] });
  },
};
console.log("about.js run");
