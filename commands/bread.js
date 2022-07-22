const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("bread")
    .setDescription("bread...?!?"),
  async execute(interaction, client) {
    const random = Math.random()
    if (random > 0.5){
    return interaction.reply("Bread :thumbsup:");
    } else {
      return interaction.reply("Bread :thumbsdown:");
      }
    },
};

console.log("Bread.js run")