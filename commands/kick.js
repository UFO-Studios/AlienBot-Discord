const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("This command kicks a member!")
    .addUserOption((option) => {
      option
        .setName("target")
        .setDescription("The member to kick.")
        .setRequired(true);
      return option;
    })
    .addStringOption((option) => {
      option
        .setName("reason")
        .setDescription("The reason to kick the member.")
        .setRequired(false);
      return option;
    }),
  global: true,
  async execute(interaction, client) {
    const target = interaction.options.getMember("target");
    const reason =
      interaction.options.getString("reason") || "No reason given.";

    try {
      if (
        interaction.member.permissions.has(
          PermissionsBitField.Flags.KickMembers
        ) ||
        interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator
        )
      ) {
        if (target) {
          await interaction.guild.members.kick(target, reason);
          const successEmbed = new EmbedBuilder()
            .setColor("0099ff")
            .setTitle(`${target.user.tag} got kicked.`)
            .setAuthor({ name: interaction.user.tag })
            .setDescription(
              `${target.user.tag} was kicked by ${interaction.user.tag}. Reason: ${reason}`
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({
              text: "/kick • AlienBot",
              iconURL:
                "https://thealiendoctor.com/img/alienbot/face-64x64.png",
            });
          interaction.reply({ embeds: [successEmbed] });
          console.log(
            `${target.user.tag} was kicked by ${interaction.user.tag}. Reason: ${reason}`
          );
        } else {
          return interaction.reply({
            content: "Invalid member.",
            ephemeral: true,
          });
        }
      } else {
        return interaction.reply({
          content: "You dont have the permissions to kick a member. You need the \"KickMembers\" permission!",
          ephemeral: true,
        });
      }
    } catch (e) {
      if (e.code == 50013) {
        return interaction.reply({
          content: `I dont have the permissions to kick ${target.user.tag}. I need the "KickMembers" permission!`,
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

console.log("kick.js run");
