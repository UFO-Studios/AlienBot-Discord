const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("update-channel")
    .setDescription(
      "Sets the channel to publish the bot update/fixes messages."
    )
    .addChannelOption((option) => {
      option
        .setName("channel")
        .setDescription("The channel you want updates posted to.")
        .setRequired(true);
      return option;
    }),
  global: true,

  async execute(interaction, client) {
    const channel = await interaction.options.getChannel("channel");

    channel
      .createWebhook({
        name: "AlienBot",
        avatar:
          "https://cdn.discordapp.com/avatars/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.webps",
      })
      .then(async (webhook) => {
        await client.F.addData("Update-channels", serverId, {
          webhookUrl: webhook.url,
        });

        await interaction.reply(
          `When there are any new updates/announcements about AlienBot you will get notified in ${channel}!`
        );
      });
  },
};
console.log("get-announce-channel.js run");

//client.F.addData("collectionName", "docName", { js: "object" })
