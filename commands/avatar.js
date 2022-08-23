const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

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
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    return await interaction.reply({ embeds: [embed] });
  },
};
console.log("avatar.js run");
