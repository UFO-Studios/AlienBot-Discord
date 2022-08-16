const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

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
  global: true,
  async execute(interaction, client) {
    const target = interaction.options.getMember("target");
    const user = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") || "No reason given.";

    try {
      if (
        interaction.member.permissions.has(PermissionFlagsBits.BanMembers) ||
        interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        if (target) {
          await interaction.guild.bans.create(target, {
            reason,
          });

          const successEmbed = new EmbedBuilder()
            .setColor("0099ff")
            .setAuthor({ name: interaction.user.tag })
            .setTitle(`${target.user.tag} got banned.`)
            .setDescription(
              `${target.user.tag} was banned by ${interaction.user.tag}. Reason: ${reason}`
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({
              text: "/ban • Alienbot",
              iconURL:
                "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
            });
          interaction.reply({ embeds: [successEmbed] });
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
