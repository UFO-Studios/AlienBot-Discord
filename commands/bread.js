const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bread")
    .setDescription("bread :thumbsup:"),
  async execute(interaction, client) {
    return interaction.reply("Bread :thumbsup:");
  },
};

console.log("Bread.js run")