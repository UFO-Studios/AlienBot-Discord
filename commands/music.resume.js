const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Interaction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume the current playing stream."),
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

    const resumed = queue.setPaused(false);
    return await interaction.editReply({
      content: resumed ? "Song resumed!" : "Couldnt resume the song.",
    });
  },
};

console.log("music-resume.js run");
