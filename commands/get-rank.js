const { SlashCommandBuilder } = require("discord.js");
const mongo = require("../mongodb.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-rank")
    .setDescription("See your rank in the discord server!"),
  global: true,
  async execute(interaction) {
    const xp = await mongo.getXP(interaction.user.id);
    const rank = Math.trunc(Math.sqrt(xp))

    await interaction.reply("Your rank is:" + rank);
  },
};
console.log("get-rank.js run");
