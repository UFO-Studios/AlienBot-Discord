const { SlashCommandBuilder } = require("discord.js");
const { consoleMessage } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("woof")
    .setDescription("The bot goes woof."),
  global: true,
  async execute(interaction) {
    await interaction.reply("WOOF. WOOF WOOF WOOF. WOOFWOOFWOOFBARK");
  },
};
consoleMessage("woof.js run", "botInit");
