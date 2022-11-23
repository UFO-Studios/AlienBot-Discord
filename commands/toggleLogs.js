const { SlashCommandBuilder } = require("discord.js");
const mongo = require("../mongodb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("togglelogs")
    .setDescription("Toggle logging in your discord server."),
  global: true,
  async execute(interaction) {
      const data = await mongo.getLogs(interaction.guildId);
      if (!data) {
          await mongo.saveLogs(interaction.guildId, "on");
          interaction.reply("Logging has been turned on!");
      } else {
          if (data.toggleValue == "on") {
              await mongo.saveLogs(interaction.guildId, "off");
              interaction.reply("Logging has been turned off!");
          } else {
              await mongo.saveLogs(interaction.guildId, "on");
              interaction.reply("Logging has been turned on!");
          }
      }
  },
};
console.log("toggleLogs.js run");
