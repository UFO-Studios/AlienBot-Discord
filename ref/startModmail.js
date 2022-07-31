const {
  SlashCommandBuilder,
  Interaction,
  Client,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mod-mail")
    .setDescription("enables modmail system for your server"),
  /**
   *
   * @param {Interaction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const role = await interaction.guild.roles.create({
      name: "mailAdmin",
      color: "Blue",
    });

    await interaction.member.roles.add(role);

    const category = await interaction.guild.channels
      .create({
        name: "AlienBot",
        type: ChannelType.GuildCategory,
        permissionOverwrites: [
          {
            id: role.id,
            allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"],
          },
        ],
      })
      .then((c) => c);

    const channel = await interaction.guild.channels
      .create({
        name: "mails",
        type: ChannelType.GuildText,
      })
      .then((c) => c);

    await channel.setParent(category, {
      lockPermissions: true,
    });

    const webhook = await channel
      .createWebhook({
        name: "AlienBot",
        avatar:
          "https://cdn.discordapp.com/avatars/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.webp",
      })
      .then((w) => w);

    await client.F.addData("mail", interaction.guildId, {
      url: webhook.url,
    });

    await channel.send({ content: "hello from Kingerious" });
    await interaction.reply({ content: `created a new channel ${channel}` });
  },
};
