const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const mongo = require("../database/mongodb");
export default {
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
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() == "punish") {
      const target = interaction.options.getMember("target");
      const reason =
        interaction.options.getString("reason") || "No reason given.";

      if (target.permissions.has(PermissionFlagsBits.Administrator)) {
        return await interaction.reply({
          content: "You cant warn an admin!",
          ephemeral: true,
        });
      }

      if (target.id == interaction.member.id) {
        return interaction.editReply({
          content: "You cannot warn yourself!",
          ephemeral: true,
        });
      }

      const warnCount = await mongo.addWarn(interaction.guild.id, target.id);

      return interaction.reply({
        content: `${interaction.user.tag} warned ${target.user.tag}! ${target.user.tag} now has ${warnCount} warns! Reason: ${reason}`,
      });
    } else if (interaction.options.getSubcommand() == "view") {
      const target = interaction.options.getMember("target");

      const warnCount = mongo.getWarns(interaction.guild.id, target.id);

      return interaction.reply({
        content: `${target.user.tag} has ${warnCount} warns!`,
      });
    } else if (interaction.options.getSubcommand() == "clear") {
      const target = interaction.options.getMember("target");

      if (
        !interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)
      ) {
        return await interaction.editReply({
          content: "You cant moderate users!",
          ephemeral: false,
        });
      }

      const warnCount = await mongo.getWarns(interaction.guild.id, target.id);
      await mongo.clearWarns(interaction.guild.id, target.id);

      return interaction.reply({
        content: `${target.user.tag} had ${warnCount} warns, but now has 0!`,
      });
    }
  },
};

console.log("warn.js run");
