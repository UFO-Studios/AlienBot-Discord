const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bread")
    .setDescription("bread...?!?"),
  global: true,
  async execute(interaction, client) {
    return await interaction.reply("Bread :thumbsup:");
  },
};

console.log("Bread.js run");
