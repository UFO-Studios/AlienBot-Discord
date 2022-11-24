const { SlashCommandBuilder } = require("discord.js");
const mongo = require("../mongodb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("togglelogs")
    .setDescription("Toggle logging in your discord server."),
  global: true,
  async execute(interaction, client) {
      const data = await mongo.getLogToggle(interaction.guildid);
      if (data == false) {
          await mongo.saveLogToggle(interaction.guildId, true);
          interaction.reply("Logging has been turned on!");
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
