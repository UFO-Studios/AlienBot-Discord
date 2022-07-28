const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check-warns")
    .setDescription("Check a member's warns")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("the target to get the warns of.")
        .setRequired(true)
    ),
  global: true,
  async execute(interaction, client) {
    await interaction.deferReply();
    const target = await interaction.options.getMember("target");
    const warns = await client.F.getData("warns", `${target.id}`);

    if (!warns) {
      return await interaction.editReply({
        content: `${target.user.tag} has 0 warns`,
      });
    }

    return await interaction.editReply(
      `${target.user.tag} has ${warns.warns} warns.`
    );
  },
};
