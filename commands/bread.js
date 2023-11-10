const { SlashCommandBuilder } = require("discord.js");
const { consoleMessage } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bread")
    .setDescription("bread...?!?"),
  global: true,
  async execute(interaction, client) {
    var likeBread = math.random();
    if (likeBread < 0.5) {
      return await interaction.reply("Bread :thumbsdown:");
    } else {
      return await interaction.reply("Bread :thumbsup:");
    }
  },
};

consoleMessage("bread.js run", "botInit");
