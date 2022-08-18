const {
  ContextMenuCommandInteraction,
  ContextMenuCommandBuilder,
  Client,
  PermissionsBitField,
  ApplicationCommandType,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("UserInfo")
    .setType(ApplicationCommandType.User),
  global: true,
  /**
   *
   * @param {ContextMenuCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const targetMember = interaction.targetMember;
    const targetUser = interaction.targetUser;

    const roles = targetMember.roles.cache
      .filter((role) => role.id !== interaction.guild.id)
      .map((role) => role.name)
      .join(", ");

    // const permsText = await getPerms(targetMember.permissions);

    const embed = new EmbedBuilder()
      .setAuthor({ name: targetUser.tag })
      .setColor("Blue")
      .setTitle("User Info")
      .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: "username",
          value: `\`\`\`${targetUser.tag}\`\`\``,
          inline: true,
        },
        {
          name: "user id",
          value: `\`\`\`${targetUser.id}\`\`\``,
          inline: true,
        },
        {
          name: "nickname",
          value: `\`\`\`${targetMember.nickname || "no nickname"}\`\`\``,
          inline: true,
        },
        {
          name: "bot?",
          value: `\`\`\`${targetUser.bot.toString()}\`\`\``,
          inline: true,
        },
        {
          name: "joined at",
          value: `\`\`\`${targetMember.joinedAt}\`\`\``,
          inline: true,
        },
        {
          name: "created at",
          value: `\`\`\`${targetUser.createdAt}\`\`\``,
          inline: true,
        },
        {
          name: "boosting since",
          value: `\`\`\`${targetMember.premiumSince || "not boosting"}\`\`\``,
          inline: true,
        },
        {
          name: "permissions",
          value: `\`\`\`${targetMember.permissions.toArray().join(", ")}\`\`\``,
          inline: false,
        },
        { name: "roles", value: `\`\`\`${roles || "No roles"}\`\`\`` }
      );
    return await interaction.reply({ embeds: [embed] });
  },
};

console.log("nickname.js run");
