const {
  EmbedBuilder,
  PermissionFlagsBits,
  ApplicationCommandType,
  ContextMenuCommandInteraction,
  ContextMenuCommandBuilder,
  Client,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("kickUser")
    .setType(ApplicationCommandType.User),
  global: true,
  /**
   *
   * @param {ContextMenuCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const target = interaction.targetUser;
    const reason = `kicked using the context menu app by ${target.tag}.`;

    try {
      if (
        interaction.member.permissions.has(PermissionFlagsBits.BanMembers) ||
        interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        if (target) {
          await interaction.guild.members.kick(target, reason);

          const successEmbed = new EmbedBuilder()
            .setColor("0099ff")
            .setAuthor({ name: interaction.user.tag })
            .setTitle(`${target.tag} got kicked.`)
            .setDescription(
              `${target.tag} was kicked by ${interaction.user.tag}. Reason: ${reason}`
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({
              text: "kick • AlienBot",
              iconURL:
                "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
            });
          console.log(
            `${target.tag} was kicked by ${interaction.user.tag}. Reason: ${reason}`
          );
          return await interaction.reply({ embeds: [successEmbed] });
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
          content: `I dont have the permissions to kick ${target.tag}. I need the "KickMembers" permission!`,
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

console.log("kickUser.js run");
