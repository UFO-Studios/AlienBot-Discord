const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");

const getPerms = async (perms) => {
  if (perms.has(Permissions.FLAGS.ADMINISTRATOR)) {
    return "Administrator";
  } else if (
    perms.has([
      Permissions.FLAGS.BAN_MEMBERS,
      Permissions.FLAGS.MODERATE_MEMBERS,
      Permissions.FLAGS.KICK_MEMBERS,
    ])
  ) {
    return "Moderator";
  } else if (
    perms.has([
      Permissions.FLAGS.MANAGE_CHANNELS,
      Permissions.FLAGS.MANAGE_GUILD,
      Permissions.FLAGS.MANAGE_MESSAGES,
      Permissions.FLAGS.MANAGE_ROLES,
      Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS,
      Permissions.FLAGS.MANAGE_EVENTS,
      Permissions.FLAGS.MANAGE_NICKNAMES,
      Permissions.FLAGS.MANAGE_THREADS,
      Permissions.FLAGS.MANAGE_WEBHOOKS,
    ])
  ) {
    return "Server Manager";
  } else {
    return "member";
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("Display info about a member.")
    .addUserOption((option) =>
      option.setName("target").setDescription("the target to get the info of")
    ),
  async execute(interaction) {
    const targetMember =
      interaction.options.getMember("target") || interaction.member;
    const targetUser =
      interaction.options.getUser("target") || interaction.user;

    const roles = targetMember.roles.cache
      .filter((role) => role.id !== interaction.guild.id)
      .map((role) => role.name)
      .join(", ");

    const permsText = await getPerms(targetMember.permissions);

    const embed = new MessageEmbed()
      .setAuthor(targetUser.tag)
      .setColor("RANDOM")
      .setTitle("User Info")
      .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: "username",
          value: `\`${targetUser.tag}\``,
          inline: true,
        },
        {
          name: "user id",
          value: `\`${targetUser.id}\``,
          inline: true,
        },
        {
          name: "nickname",
          value: `\`${targetMember.nickname || "no nickname"}\``,
          inline: true,
        },
        {
          name: "bot?",
          value: `\`${targetUser.bot.toString()}\``,
          inline: true,
        },
        {
          name: "joined at",
          value: `\`${targetMember.joinedAt}\``,
          inline: true,
        },
        {
          name: "created at",
          value: `\`${targetUser.createdAt}\``,
          inline: true,
        },
        {
          name: "boosting since",
          value: `\`${targetMember.premiumSince || "not boosting"}\``,
          inline: true,
        },
        {
          name: "permissions",
          value: `\`${permsText}\``,
          inline: true,
        },
        { name: "roles", value: `\`${roles || "No roles"}\`` }
      );
    return await interaction.reply({ embeds: [embed] });
  },
};
console.log("user-info.js run");
