const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction, Client } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Gives the current volume or changes the current volume.")
    .addIntegerOption((option) =>
      option
        .setName("volume")
        .setDescription("The volume to set")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    await interaction.deferReply();

    const queue = client.P.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return await interaction.editReply({
        content: "Music is not being played!",
      });

    const volume = await interaction.options.get("volume").value;
    if (!vol)
      return await interaction.editReply({
        content: `The current volume is ${queue.volume}%!`,
      });
    if (vol < 0 || vol > 100)
      return await interaction.editReply({ content: "Invalid volume!" });

    const changed = queue.setVolume(volume);

    return await interaction.editReply({
      content: changed
        ? `Changed the volume to ${volume}%!`
        : "Couldnt change the volume!",
    });
  },
};

console.log("music-volume.js run");
