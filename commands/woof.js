const { SlashCommandBuilder } = require("discord.js");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
  data: new SlashCommandBuilder()
    .setName("woof")
    .setDescription("The bot goes woof."),
  global: true,
  async execute(interaction) {
    await interaction.reply("WOOF. WOOF WOOF WOOF. WOOFWOOFWOOFBARK");
  },
};
consoleMessage("woof.js run", "botInit");
