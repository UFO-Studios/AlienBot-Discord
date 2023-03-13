const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-rank")
    .setDescription("See your rank in the discord server!"),
  global: true,
  async execute(interaction) {
    await interaction.reply("WOOF. WOOF WOOF WOOF. WOOFWOOFWOOFBARK");
  },
};
console.log("woof.js run");
