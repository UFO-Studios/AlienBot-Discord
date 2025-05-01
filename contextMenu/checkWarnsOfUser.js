const {
  ContextMenuCommandInteraction,
  ContextMenuCommandBuilder,
  Client,
  ApplicationCommandType,
} = require("discord.js");
const mongo = require("../database/mongodb");import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
  data: new ContextMenuCommandBuilder()
    .setName("view-warns")
    .setType(ApplicationCommandType.User),
  /**
   *
   * @param {ContextMenuCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const user = interaction.targetUser;
    const data = await mongo.getWarns(interaction.guild.id, user.id);

    return await interaction.reply({
      content: `${user.tag} has ${data} warns.`,
      ephemeral: true,
    });
  },
};

consoleMessage("checkWarnsOfUser.js run", "botInit");
