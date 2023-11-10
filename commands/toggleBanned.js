const { SlashCommandBuilder } = require("discord.js");
const mongo = require("../mongodb");
const { consoleMessage } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("toggle-banned-words")
    .setDescription("Toggles weather the bot is deleting banned words"),
  global: true,
  async execute(interaction, client) {
    const data = await mongo.getBannedWordToggle(interaction.guildId);
    console.log(data);
    if (!data) {
      await mongo.saveBannedWordToggle(interaction.guildId, true);
      return await interaction.reply("Banned words are now banned!");
    } else {
      await mongo.saveBannedWordToggle(interaction.guildId, false);
      interaction.reply("Banned words have been allowed! ");
    }
  },
};

consoleMessage("toggleBanned.js run", "botInit");
