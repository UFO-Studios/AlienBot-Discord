const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-logging-channel")
    .setDescription("Sets the channel where logs are sent")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("channel where the logs will be sent")
        .setRequired(true)
    ),
  global: true,
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)
    ) {
      return await interaction.reply({
        content: "You dont have the permissions to set a logging channel. You need the \"ManageGuild\" permission!",
        ephemeral: true,
      });
    }

    const channel = await interaction.options.getChannel("channel");

    const webhookURL = await client.F.getData("logging", interaction.guildId);

    await interaction.deferReply();
    if (!webhookURL) {
      channel
        .createWebhook({
          name: "AlienBot",
          avatar:
            "https://cdn.discordapp.com/avatars/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.webp",
        })
        .then(async (webhook) => {
          console.log(`New webhook created ${webhook.name}`);

          await client.F.addData("logging", interaction.guildId, {
            url: webhook.url,
          });

          return await interaction.editReply({
            content: "Logging channel set!",
          });
        })
        .catch((e) => {
          if (e) {
            console.error(`error: ${e}`);
            return interaction.editReply({
              content: `Error: ${e}`,
              ephemeral: true,
            });
          }
        });
    } else {
      return await interaction.editReply({
        content: "Logging channel already set!",
      });
    }
  },
};

console.log("setLoggingChannel.js run");
