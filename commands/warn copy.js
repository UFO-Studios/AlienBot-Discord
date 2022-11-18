const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const mongo = require("../mongodb");
const { server } = require("../node_modules/minecraft-lookup/typings/index");

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
async execute (interaction, client) {
  await interaction.deferReply();

    if (interaction.options.getSubcommand() == "punish") {
        if ((target.permissions.has(PermissionFlagsBits.Administrator))) {
            return await interaction.editReply({
                content: "You can`t warn an admin!",
                ephemeral: false,
                })
        }

        if (
            !interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)
        ) {
            return await interaction.editReply({
                content: "You cant moderate users!", 
                ephemeral: false,
                })
        }

        if (target.id == interaction.member.id)
            return interaction.editReply({
                content: "You cannot warn yourself!",
                ephemeral: true,
            });
        const target = (await interaction.options.getMember("target"));
        const targetID = await interaction.member.targetID;
        const reason = (await interaction.options.getString("reason")) || "No reason given";
        const serverID = await interaction.options.serverID()

        await mongo.addWarn(serverID, target)

        return await interaction.editReply({
            content: "User has been warned! Reason: " + reason,
            ephemeral: false,
        });


    }

    if (interaction.options.getSubcommand() == "view") { }

    if (interaction.options.getSubcommand() == "clear") { }

  }
}
console.log("warn.js run")