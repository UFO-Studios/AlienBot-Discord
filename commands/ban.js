const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("This command bans a member!")
    .addUserOption((option) => {
      option
        .setName("target")
        .setDescription("The member to ban.")
        .setRequired(true);
      return option;
    })
    .addStringOption((option) => {
      option
        .setName("reason")
        .setDescription("The reason to ban the member.")
        .setRequired(false);
      return option;
    }),
  async execute(interaction, client) {
    const target = interaction.options.getMember("target");
    const reason =
      interaction.options.getString("reason") || "No reason given.";

    try {
      if (
        interaction.member.permissions.has("MODERATE_MEMBERS", "BAN_MEMBERS")
      ) {
        if (target) {
          await interaction.guild.bans.create(target, {
            reason,
          });
          interaction.reply(
            `${target.user.tag} was banned by ${interaction.user.tag}. Reason: ${reason}`
          );
          console.log(
            `${target.user.tag} was banned by ${interaction.user.tag}. Reason: ${reason}`
          );
        } else {
          return interaction.reply({
            content: "Invalid member.",
            ephemeral: true,
          });
        }
      } else {
        return interaction.reply({
          content: "You dont have the permissions to ban a member!",
          ephemeral: true,
        });
      }
    } catch (e) {
      if (e.code == 50013) {
        return interaction.reply({
          content: `I dont have the permissions to ban ${target.user.tag}`,
          ephemeral: true,
        });
      }
      if (e) {
        console.log(e);
        return interaction.reply({
          content: "An unknown error has occurred. Please try again later.",
          ephemeral: true,
        });
      }
    }
  },
};

console.log("ban.js run");
