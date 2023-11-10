const { SlashCommandBuilder } = require("discord.js");
const { consoleMessage } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ufosmp-issue")
    .setDescription(
      "This command is for when there are issues with the UFO SMP."
    ),
  global: true,
  async execute(interaction) {
    await interaction.reply(
      "hey <@716942444096127026> we need help over here!"
    );
  },
};

consoleMessage("ufo-issue.js run", "botInit");
