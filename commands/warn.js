const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn commands for a member.")
    .addSubcommand((sc) =>
      sc
        .setName("punish")
        .setDescription("Warn a member")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("target to warn.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("reason").setDescription("reason to warn the target")
        )
    )
    .addSubcommand((sc) =>
      sc
        .setName("view")
        .setDescription("View a members' warns")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The member to view warns of.")
            .setRequired(true)
        )
    )
    .addSubcommand((sc) =>
      sc
        .setName("clear")
        .setDescription("Clear a member's warns.")
        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("The member to clear warns of")
            .setRequired(true)
        )
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();

    if (interaction.options.getSubcommand() == "punish") {
      // warn a member
      const target = await interaction.options.getMember("target");
      const reason =
        (await interaction.options.getString("reason")) || "No reason given";

      if (
        !interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)
      )
        return await interaction.editReply({
          content: `You dont have the permissions to warn ${target.user.tag}!`,
          ephemeral: true,
        });

      if (target.permissions.has(PermissionFlagsBits.Administrator))
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

      await interaction.editReply({
        content: `${target.user.tag} got warned by ${
          interaction.user.tag
        } and now has ${warns.warns + 1} warns. reason: ${reason}`,
      });
    } else if (interaction.options.getSubcommand() == "view") {
      // view a member's warns
      const target = await interaction.options.getMember("target");
      const warns = await client.F.getData("warns", `${target.id}`);

      if (!warns) {
        return await interaction.editReply({
          content: `${target.user.tag} has 0 warns`,
        });
      }

      await interaction.editReply(
        `${target.user.tag} has ${warns.warns} warns.`
      );
    } else if (interaction.options.getSubcommand() == "clear") {
      // clear a member's warns
      const target = await interaction.options.getUser("member");
      await client.F.deleteData("warns", target.id);

      return await interaction.editReply({
        content: `Cleared all warns of ${target.tag}.`,
      });
    }
  },
};
