const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction, Permissions } = require("discord.js");

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
   * @param {Interaction} interaction
   */
  async execute(interaction, client) {
    await interaction.deferReply();

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return await interaction.editReply({
        content: "You dont have the permissions to set logs!",
        ephemeral: true,
      });

    const channel = await interaction.options.getChannel("channel");

    const webhookURL = await client.F.getData("logging", interaction.guildId);

    if (!webhookURL) {
      channel
        .createWebhook("AlienBot", {
          avatar:
            "https://cdn.discordapp.com/avatars/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.webp",
        })
        .then(async (webhook) => {
          console.log(`New webhook created ${webhook.name}`);

          await client.F.addData("logging", interaction.guildId, {
            id: webhook.id,
            token: webhook.token,
          });

          return await interaction.editReply("Logging channel set!");
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
      return await interaction.editReply("Logging channel already set!");
    }
  },
};

console.log("setLoggingChannel.js run");
