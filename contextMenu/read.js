const {
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  Client,
  ApplicationCommandType,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("read")
    .setType(ApplicationCommandType.Message),
  global: true,
  /**
   *
   * @param {ContextMenuCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const msg = interaction.targetMessage.content;

    return await interaction.reply({
      content: msg,
      tts: true,
      ephemeral: true,
    });
  },
};

console.log("read.js run");
