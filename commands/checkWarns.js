const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("easy-db-json");

db.setFile("./db.json");

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
  async execute(interaction, client) {
    const target = interaction.options.getMember("target");
    const warns = db.get(`${target.id}-warns`);

    if (!warns) {
      return interaction.reply({ content: `${target.user.tag} has 0 warns` });
    }

    return interaction.reply(`${target.user.tag} has ${warns} warns.`);
  },
};
