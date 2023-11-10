const {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { consoleMessage } = require("../log");

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
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const target = interaction.options.getMember("target");
    const user = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") || "No reason given.";

    try {
      if (!target)
        return await interaction.reply({
          content: "Invalid target provided.",
          ephemeral: true,
        });

      if (target.permissions.has(PermissionFlagsBits.Administrator))
        return await interaction.reply({
          content: "Cannot ban an administrator!",
          ephemeral: true,
        });

      if (
        interaction.member.permissions.has(PermissionFlagsBits.Administrator) ||
        interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
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
            text: "/ban • AlienBot",
            iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
          });
        console.log(
          `${target.user.tag} was banned by ${interaction.user.tag}. Reason: ${reason}`
        );
        return await interaction.reply({ embeds: [successEmbed] });
      } else {
        return await interaction.reply({
          content:
            'You do not have the permissions to ban a member. You need the "BanMembers" or "Administrator" permission!',
          ephemeral: true,
        });
      }
    } catch (e) {
      if (e.code == 50013) {
        return await interaction.reply({
          content: `I do not have the permissions to ban ${target.user.tag}. I need the "BanMembers" or "Administrator" permission!`,
          ephemeral: true,
        });
      } else {
        console.log(e);
        return await interaction.reply({
          content: "An unknown error has occurred. Please try again later.",
          ephemeral: true,
        });
      }
    }
  },
};

consoleMessage("ban.js run", "botInit");
