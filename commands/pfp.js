const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const { consoleMessage } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pfp")
    .setDescription("Get the profile picture of a member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The target to show the pfp of")
        .setRequired(true)
    ),
  global: true,
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");

    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("Blue")
      .setTitle("Profile Picture")
      .setDescription(`Heres the profile picture of \`${user.tag}\`:`)
      .setImage(user.displayAvatarURL({ dynamic: true }).toString())
      .setTimestamp()
      .setFooter({
        text: "/pfp • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.reply({ embeds: [embed] });
  },
};
consoleMessage("pfp.js run", "botInit");
