const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bread")
    .setDescription("bread...?!?"),
  global: true,
  async execute(interaction, client) {
    // const random = Math.random();
    // if (random >= 0.5) {

    // } else {
    //   return interaction.reply("Bread :thumbsdown:");
    // }
    return interaction.reply("Bread :thumbsup:");
  },
};

console.log("Bread.js run");
