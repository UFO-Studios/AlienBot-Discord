const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-welcome")
    .setDescription("Set a welcome channel for your server.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to send the welcome msg to.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("welcome-message")
        .setDescription(
          "The message to send with the welcome image. special words: {username} {memberCount}"
        )
    )
    .addStringOption((option) =>
      option
        .setName("leave-message")
        .setDescription(
          "The message to send with the leave image. special words: {username} {memberCount}"
        )
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
    )
      return await interaction.reply({
        content: "You dont have the permissions to set the welcome channel!",
        ephemeral: true,
      });

    const channel = interaction.options.getChannel("channel");
    const welcomeMessage =
      interaction.options.getString("welcome-message") ||
      "Welcome {username} to the server! you are member #{memberCount}. Dont forget to read and follow the rules!";

    const leaveMessage =
      interaction.options.getString("leave-message") ||
      "Goodbye {username}! you will be missed!";

    const webhook = await channel
      .createWebhook({
        name: "AlienBot",
        avatar:
          "https://cdn.discordapp.com/avatars/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.webp",
      })
      .then((w) => w);

    console.log(`New webhook created: ${webhook.name}`);
    await client.F.addData("welcome", interaction.guildId, {
      welcomeMessage,
      leaveMessage,
      webhookUrl: webhook.url,
    });
    return await interaction.reply({
      content: `Welcome channel set to #${channel.name}!`,
    });
  },
};

console.log("setWelcome.js run");
