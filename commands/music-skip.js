const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Interaction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the song and move towards the next one!"),
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

    const currentSong = queue.current;

    const skipped = queue.skip();

    return await interaction.editReply({
      content: skipped
        ? `Skipped **${currentSong}**`
        : "Couldnt skip the song",
    });
  },
};

console.log("music-skip.js run");
