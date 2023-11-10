const {
  ContextMenuCommandInteraction,
  ContextMenuCommandBuilder,
  Client,
  ApplicationCommandType,
} = require("discord.js");
const mongo = require("../mongodb");
const { consoleMessage } = require("../log");

module.exports = {
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
