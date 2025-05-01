const {
  ContextMenuCommandBuilder,
  EmbedBuilder,
  ApplicationCommandType,
  ContextMenuCommandInteraction,
  Client,
} = require("discord.js");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
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
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.reply({ embeds: [embed] });
  },
};
consoleMessage("contextMenu/avatar.js run", "botInit");
