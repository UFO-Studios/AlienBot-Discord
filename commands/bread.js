const { SlashCommandBuilder } = require("@discordjs/builders");

// good or bad...?!?
const random = Math.random()


module.exports = {
  data: new SlashCommandBuilder()
    .setName("bread")
    .setDescription("bread...?!?"),
  async execute(interaction, client) {
    if (random > 0.5){
    return interaction.reply("Bread :thumbsup:");
    } else {
      return interaction.reply("Bread :thumbsdown:");
      }
    },
};

console.log("Bread.js run")