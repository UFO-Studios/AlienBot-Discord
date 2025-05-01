const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const mongo = require("../database/mongodb");const { consoleMessage } = require("../log");

export default {
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
      content: `You have ${xpObj} XP!`/*, and are at rank ${rank}!`*/, //to be implemented
    });
  }
  },
};
consoleMessage("rank.js run", "botInit");
