const {
  ContextMenuCommandBuilder,
  PermissionsBitField,
  ApplicationCommandType,
  ContextMenuCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("warnUser")
    .setType(ApplicationCommandType.User),
  global: true,
  /**
   *
   * @param {ContextMenuCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const target = interaction.targetUser;
    const targetM = interaction.targetMember;
    const reason = `Warned using the context menu by ${interaction.user.tag}.`;

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    )
      return await interaction.editReply({
        content: `You dont have the permissions to warn ${target.tag}. You need the "ModerateMembers" permission!`,
        ephemeral: true,
      });

    if (targetM.permissions.has(PermissionsBitField.Flags.Administrator))
      return await interaction.editReply({
        content: "You cannot warn an admin!",
        ephemeral: true,
      });

    if (target.id == interaction.member.id)
      return interaction.editReply({
        content: "You cannot warn yourself!",
        ephemeral: true,
      });

    let warns = await client.F.getData("warns", `${target.id}`);

    if (!warns) {
      await client.F.addData("warns", `${target.id}`, { warns: 1 });
    } else {
      await client.F.addData("warns", `${target.id}`, {
        warns: warns.warns + 1,
      });
    }

    return await interaction.editReply({
      content: `${target.tag} got warned by ${
        interaction.user.tag
      } and now has ${warns.warns + 1} warns. reason: ${reason}`,
    });
  },
};
