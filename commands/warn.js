const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const mongo = require("../mongodb");

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
   * @param {target} target
   */
  async execute(interaction, client, target) {
    if (interaction.options.getSubcommand() == "punish") {
      if (target.permissions.has(PermissionFlagsBits.Administrator)) {
        return await interaction.editReply({
          content: "You can`t warn an admin!",
          ephemeral: false,
        });
      }

      if (
        !interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)
      ) {
        return await interaction.editReply({
          content: "You cant moderate users!",
          ephemeral: false,
        });
      }

      if (target.id == interaction.member.id)
        return interaction.editReply({
          content: "You cannot warn yourself!",
          ephemeral: true,
        });
      const target = await interaction.options.getMember("target");
      const targetID = await interaction.member.targetID;
      const reason =
        (await interaction.options.getString("reason")) || "No reason given";
      const serverID = await interaction.options.serverID();

      const warnCount = await mongo.addWarn(serverID, targetID);

      return await interaction.editReply({
        content:
          target +
          " has been warned! Reason: " +
          reason +
          ". User has " +
          warnCount +
          " warns.",
        ephemeral: false,
      });
    }

    if (interaction.options.getSubcommand() == "view") {
      const targetID = await interaction.member.targetID;
      const serverID = await interaction.options.serverID();
      const warns = mongo.getWarns(serverID, targetID);
      return await interaction.editReply({
        content: target + " has " + warns + " warns.",
        ephemeral: false,
      });
    }

    if (interaction.options.getSubcommand() == "clear") {
      const targetID = await interaction.member.targetID;
      const target = await interaction.options.getMember("target");
      const serverID = await interaction.options.serverID();
      const CWS = await mongo.clearWarns(serverID, targetID);
      if (CWS == true) {
        return await interaction.editReply({
          content: "Warns cleared!",
          emhpereal: false,
        });
      } else {
        return await interaction.editReply({
          content:
            "Error! Warns not cleared! Try again later or report this on the github.",
        });
      }
    }
  },
};

console.log("warn.js run");
