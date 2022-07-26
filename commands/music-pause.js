const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Interaction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the current playing stream"),
  /**
   *
   * @param {Interaction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();

    const queue = client.P.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return await interaction.editReply({
        content: "Music is not being played!",
      });

    const paused = queue.setPaused(true);
    return await interaction.editReply({
      content: paused ? "Song paused!" : "Couldnt pause the song.",
    });
  },
};

console.log("music-pause.js run");
