const { SlashCommandBuilder } = require("@discordjs/builders");

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
  async execute(interaction, client) {
    const target = interaction.options.getMember("target");
    const reason =
      interaction.options.getString("reason") || "No reason given.";

    try {
      if (
        interaction.member.permissions.has("MODERATE_MEMBERS", "KICK_MEMBERS")
      ) {
        if (target) {
          await interaction.guild.members.kick(target, reason);
          const successEmbed = new MessageEmbed()
            .setColor("0099ff")
            .setTitle(`${target.user.tag} got kicked.`)
            .setDescription(
              `${target.user.tag} was kicked by ${interaction.user.tag}. Reason: ${reason}`
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({
              text: "/help for a list of all the commands. - Alienbot",
              iconURL:
                "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
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
          content: "You dont have the permissions to kick a member!",
          ephemeral: true,
        });
      }
    } catch (e) {
      if (e.code == 50013) {
        return interaction.reply({
          content: `I dont have the permissions to kick ${target.user.tag}`,
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
