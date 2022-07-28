const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("woof")
    .setDescription("The bot goes woof."),
  global: true,
  async execute(interaction) {
    await interaction.reply("WOOF. WOOF WOOF WOOF. WOOFWOOFWOOFBARK");
  },
};
console.log("woof.js run");
