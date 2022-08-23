const { SlashCommandBuilder, EmbedBuilder, ChannelType, ChatInputCommandInteraction } = require("discord.js");

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
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction  
   */
  async execute(interaction) {
    try {
      await interaction.deferReply();

      await interaction.guild.members.fetch();
      await interaction.guild.roles.fetch();
      await interaction.guild.channels.fetch();

      const owner = await interaction.guild.fetchOwner();

      const serverSize = await getMemberAndBots(interaction);

      const roleNames = interaction.guild.roles.cache
        .map((role) => role.name)
        .join(", ");

      const categories = await interaction.guild.channels.cache.filter(
        (channel) => channel.type == ChannelType.GuildCategory
      ).size;

      const announcementChannels =
        await interaction.guild.channels.cache.filter(
          (channel) => channel.type == ChannelType.GuildNews
        ).size;

      const threads = await interaction.guild.channels.cache.filter(
        (channel) => channel.type == ChannelType.GuildPublicThread
      ).size;

      const textChannels = await interaction.guild.channels.cache.filter(
        (channel) => channel.type == ChannelType.GuildText
      ).size;

      const voiceChannels = await interaction.guild.channels.cache.filter(
        (channel) => channel.type == ChannelType.GuildVoice
      ).size;

      const stageChannels = await interaction.guild.channels.cache.filter(
        (channel) => channel.type == ChannelType.GuildStageVoice
      ).size;

      let forums = Array.from(
        await interaction.guild.channels.cache.filter(
          (channel) => channel.type == ChannelType.GuildForum
        )
      );

      if (forums.length <= 0) forums = 0;

      const embed = new EmbedBuilder()
        .setAuthor({ name: interaction.user.tag })
        .setColor("Blue")
        .setTitle("Server Info").setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
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
            name: "Server language",
            value: `\`\`\`${interaction.guild.preferredLocale}\`\`\``,
            inline: true,
          },
          {
            name: "verified?",
            value: `\`\`\`${interaction.guild.verified}\`\`\``,
            inline: true,
          },
          {
            name: `roles (${interaction.guild.roles.cache.size})`,
            value: `\`\`\`${roleNames}\`\`\``,
          },
          {
            name: `channels (${interaction.guild.channels.cache.size})`,
            value: `\`\`\`Text channels - ${textChannels}, Voice channels - ${voiceChannels}, categories - ${categories}, Announcement channels - ${announcementChannels}, stage channels - ${stageChannels}, threads - ${threads}, forums - ${forums}\`\`\``,
          },
          {
            name: "total boosts",
            value: `\`\`\`${interaction.guild.premiumSubscriptionCount}\`\`\``,
            inline: true,
          },
          {
            name: "boost level",
            value: `\`\`\`${interaction.guild.premiumTier}\`\`\``,
            inline: true,
          }
        );

      return await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
    }
  },
};
console.log("server.js run");
