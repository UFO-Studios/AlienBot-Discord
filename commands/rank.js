const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const mongo = require("../mongodb");
const { consoleMessage } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Get your rank!"),
  global: true,
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const xpObj = await mongo.getXP(interaction.user.id);
    if (xpObj == undefined || !xpObj) {
      await mongo.setRank(interaction.user.id, 1);
      return await interaction.reply({
        content: "You have no XP! Or its broken! Probably broken... :/",
      });
    } else {
      let rank = Math.trunc(xpObj / 100);
    return await interaction.reply({
      content: `You have ${xpObj} XP, and are at rank ${rank}!`,
    });
  }
  },
};
consoleMessage("rank.js run", "botInit");
