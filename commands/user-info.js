const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("Display info about a member.")
    .addUserOption((option) =>
      option.setName("target").setDescription("the target to get the info of")
    ),
  global: true,
  async execute(interaction) {
    const targetMember =
      interaction.options.getMember("target") || interaction.member;
    const targetUser =
      interaction.options.getUser("target") || interaction.user;

    const roles = targetMember.roles.cache
      .filter((role) => role.id !== interaction.guild.id)
      .map((role) => role.name)
      .join(", ");

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
      )
      .setFooter({
        text: "/user-info • AlienBot",
        iconURL:
          "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });
    return await interaction.reply({ embeds: [embed] });
  },
};
console.log("user-info.js run");
