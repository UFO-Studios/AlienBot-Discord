const {
  ContextMenuCommandBuilder,
  EmbedBuilder,
  ApplicationCommandType,
  ContextMenuCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("avatar")
    .setType(ApplicationCommandType.User),
  /**
   *
   * @param {ContextMenuCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const user = interaction.targetUser;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("Blue")
      .setTitle("Profile Picture")
      .setDescription(`Heres the profile picture of \`${user.tag}\`:`)
      .setImage(
        user.displayAvatarURL({
          dynamic: true,
        })
      )
      .setTimestamp()
      .setFooter({
        text: "pfp • AlienBot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    return await interaction.reply({ embeds: [embed] });
  },
};
console.log("avatar.js run");
