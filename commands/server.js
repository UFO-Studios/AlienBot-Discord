const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const getMemberAndBots = async (interaction) => {
  return `Members - ${await interaction.guild.members.cache.filter(
    (member) => !member.user.bot
  ).size},\nBots - ${await interaction.guild.members.cache.filter(
    (member) => member.user.bot
  ).size}`;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("Display info about this server."),
  global: true,
  async execute(interaction) {
    await interaction.deferReply();

    await interaction.guild.members.fetch();
    await interaction.guild.roles.fetch();
    await interaction.guild.channels.fetch();

    const owner = await interaction.guild.fetchOwner();

    const serverSize = await getMemberAndBots(interaction);

    const roleNames = interaction.guild.roles.cache
      .map((role) => role.name)
      .join(", ");

    const categories = interaction.guild.channels.cache.filter(
      (channel) => channel.type == "GUILD_CATEGORY"
    ).size;

    const announcementChannels = interaction.guild.channels.cache.filter(
      (channel) => channel.type == "GUILD_NEWS"
    ).size;

    const threads = interaction.guild.channels.cache.filter(
      (channel) => channel.type == "GUILD_PUBLIC_THREAD"
    ).size;

    const textChannels = interaction.guild.channels.cache.filter(
      (channel) => channel.type == "GUILD_TEXT"
    ).size;

    const voiceChannels = interaction.guild.channels.cache.filter(
      (channel) => channel.type == "GUILD_VOICE"
    ).size;

    const stageChannels = interaction.guild.channels.cache.filter(
      (channel) => channel.type == "GUILD_STAGE_VOICE"
    ).size;

    const embed = new MessageEmbed()
      .setAuthor(interaction.user.tag)
      .setColor("RANDOM")
      .setTitle("Server Info")
      .addFields(
        {
          name: "server name",
          value: `\`\`\`${interaction.guild.name}\`\`\``,
          inline: true,
        },
        {
          name: "server ID",
          value: `\`\`\`${interaction.guildId}\`\`\``,
          inline: true,
        },
        {
          name: "server owner",
          value: `\`\`\`${owner.user.username}\`\`\``,
          inline: true,
        },
        {
          name: `members (${interaction.guild.memberCount})`,
          value: `\`\`\`${serverSize}\`\`\``,
          inline: true,
        },
        {
          name: "Created at",
          value: `\`\`\`${interaction.guild.createdAt}\`\`\``,
          inline: true,
        },
        {
          name: "partnered?",
          value: `\`\`\`${interaction.guild.partnered}\`\`\``,
          inline: true,
        },
        {
          name: `roles (${interaction.guild.roles.cache.size})`,
          value: `\`\`\`${roleNames}\`\`\``,
        },
        {
          name: `channels (${interaction.guild.channels.cache.size})`,
          value: `\`\`\`Text channels - ${textChannels}, Voice channels - ${voiceChannels}, categories - ${categories}, Announcement channels - ${announcementChannels}, stage channels - ${stageChannels}, threads - ${threads}\`\`\``,
        },
        {
          name: "total boosts",
          value: `\`\`\`${interaction.guild.premiumSubscriptionCount}\`\`\``,
          inline: true,
        },
        {
          name: "boost level",
          value: `\`\`\`${interaction.guild.premiumTier.toLowerCase()}\`\`\``,
          inline: true,
        }
      );

    return await interaction.editReply({ embeds: [embed] });
  },
};
console.log("server.js run");
