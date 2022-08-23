const {
  ContextMenuCommandInteraction,
  ContextMenuCommandBuilder,
  Client,
  ApplicationCommandType,
} = require("discord.js");

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
    const user = interaction.targetUser
    const data = await client.F.getData("warns", user.id);
    const warns = data ? data.warns : 0

    return await interaction.reply({
      content: `${user.tag} has ${warns} warns.`,
      ephemeral: true,
    });
  },
};

console.log("checkWarnsOfUser.js run");
