const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const db = require("easy-db-json");

db.setFile("./db.json");

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
    const target = interaction.options.getMember("target");
    const reason = interaction.options.getString("reason") || "No reason given";

    if (!interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS))
      return interaction.reply({
        content: `You dont have the permissions to warn ${target.user.tag}!`,
        ephemeral: true,
      });

    if (target.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return interaction.reply({
        content: "You cannot warn an admin!",
        ephemeral: true,
      });

    if (target.id == interaction.member.id)
      return interaction.reply({
        content: "You cannot warn yourself!",
        ephemeral: true,
      });

    let warns = db.get(`${target.id}-warns`);

    if (!warns) {
      db.set(`${target.id}-warns`, 1);
    } else {
      db.set(`${target.id}-warns`, warns + 1);
    }

    interaction.reply(
      `${target.user.tag} got warned by ${
        interaction.user.tag
      } and now has ${db.get(`${target.id}-warns`)} warns. reason: ${reason}`
    );
  },
};
