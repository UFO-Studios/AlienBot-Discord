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

        const ClientID = interaction.member.id;
        const ServerID = interaction.guild.id;
        mongo.addWarn(ServerID, ClientID);


      await interaction.editReply({
        content: `${target.user.tag} got warned by ${
          interaction.user.tag
        } and now has ${warns.warns + 1} warns. reason: ${reason}`,
      });
    } else if (interaction.options.getSubcommand() == "view") { //START Check warns
      // view a member's warns
      const target = await interaction.options.getMember("target");
      const ClientID = interaction.member.id;
      const ServerID = interaction.guild.id;
      const warns = await mongo.getWarnCount(ServerID, ClientID);

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
      await interaction.editReply("Uh-oh! this feature is not avalible right now. Please submit a bug on the github") //client.F.deleteData("warns", target.id);

      //return await interaction.editReply({
        //content: `Cleared all warns of ${target.tag}.`,
      //});
    }
  },
};
console.log("warn.js run")