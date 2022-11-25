const { SlashCommandBuilder } = require("discord.js");
const mongo = require("../mongodb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("togglelogs")
    .setDescription("Toggles logging. Only use in the logging channel!"),
  global: true,
  async execute(interaction, client, channel) {
      const data = await mongo.getLogToggle(interaction.guildid);
      if (data == false) {
          await mongo.saveLogToggle(interaction.guildId, true);
          channel.createWebhook({
              name: 'AlienBot Logs',
              avatar: 'https://raw.githubusercontent.com/UFO-Studios/TheAlienDoctor.com/main/img/alienbot/face-1080x1080.png',
          })
              .then(webhook => console.log(`Created webhook ${webhook}`))
              .catch(console.error);
          interaction.reply("Logging has been turned on for the first time! Ive set everything up for you. If this is not the channel you want to use for logging, go to channel settings > webhooks and delete it. Then run this command again in the channel you want to use for logging.");
      } else {
          if (data.toggleValue == true) {
              await mongo.saveLogToggle(interaction.guildId, false);
              interaction.reply("Logging has been turned off!");
          } else {
              await mongo.saveLogToggle(interaction.guildId, "on");
              console.log("Logging has been turned on for " + interaction.guildId);
              interaction.reply("Logging has been turned on!");
          }
      }
  },
};
console.log("toggleLogs.js run");
