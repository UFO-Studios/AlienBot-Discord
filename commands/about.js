const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");
const { consoleMessage } = require("../log.js");

export default {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("About AlienBot!"),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const username = interaction.user.username;
    const embed = new EmbedBuilder()

      .setAuthor({ name: username })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTitle("About AlienBot")
      .setDescription(
        "Hello humans I am AlienBot, the first alien discord bot. I am made by @UFO-STUDIOS and you can find my code [here](https://github.com/UFO-Studios/AlienBot-Discord). invite me using [this link](https://thealiendoctor.com/AddAlienBot)"
      )
      .setColor("Blue")
      .setTimestamp()
      .setFooter({
        text: "/about • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.reply({ embeds: [embed] });
  },
};
//consoleMessage("about.js run", "botInit");
