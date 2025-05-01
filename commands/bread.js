const { SlashCommandBuilder } = require("discord.js");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
  data: new SlashCommandBuilder()
    .setName("bread")
    .setDescription("bread...?!?"),
  global: true,
  async execute(interaction, client) {
    var likeBread = Math.random();
    if (likeBread < 0.5) {
      return await interaction.reply("Bread :thumbsdown:");
    } else {
      return await interaction.reply("Bread :thumbsup:");
    }
  },
};

//consoleMessage("bread.js run", "botInit");
