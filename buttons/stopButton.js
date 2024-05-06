// const { useMasterPlayer } = require("discord-player");
const {
  MessageComponentInteraction,
  Client,
  EmbedBuilder
} = require("discord.js");
const { consoleMessage } = require("../log");

module.exports = {
  name: "stopButton",
  /**
   * @param {MessageComponentInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const player = useMasterPlayer();

    const queue = player.nodes.get(interaction.guildId);

    if (!queue || !queue.isPlaying()) {
      return await interaction.reply({
        content: "Music is currently not being played!",
      });
    }

    await player.nodes.delete(interaction.guildId);

    const embed = new EmbedBuilder()
      .setTitle("Stop Music")
      .setDescription(`Music stopped.`)
      .setAuthor({ name: interaction.user.tag })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setColor("Green")
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.followUp({ embeds: [embed] });
  },
};

consoleMessage("stopButton.js run", "botInit");
