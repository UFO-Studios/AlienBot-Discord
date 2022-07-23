const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("woof")
    .setDescription("The bot goes woof."),
  global: false,
  async execute(interaction) {
    await interaction.reply("WOOF. WOOF WOOF WOOF. WOOFWOOFWOOFBARK");
  },
};
console.log("woof.js run");
