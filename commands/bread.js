const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bread")
    .setDescription("bread :thumbsup:"),
  async execute(interaction, client) {
    const array = [":thumbsup:", "thumbsdown:"];
    const randomNum = Math.floor(Math.random() * 1);
    return interaction.reply(`Bread${array[randomNum]}`);
  },
};

console.log("Bread.js run");
