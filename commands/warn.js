const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a member.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("target to warn.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("reason to warn the target")
    ),
  async execute(interaction, client) {
    await interaction.deferReply();
    const target = await interaction.options.getMember("target");
    const reason =
      (await interaction.options.getString("reason")) || "No reason given";

    if (!interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS))
      return await interaction.reply({
        content: `You dont have the permissions to warn ${target.user.tag}!`,
        ephemeral: true,
      });

    if (target.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return await interaction.reply({
        content: "You cannot warn an admin!",
        ephemeral: true,
      });

    if (target.id == interaction.member.id)
      return interaction.reply({
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
      content: `${target.user.tag} got warned by ${
        interaction.user.tag
      } and now has ${warns.warns + 1} warns. reason: ${reason}`,
    });
  },
};
