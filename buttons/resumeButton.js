// const { useMasterPlayer } = require("discord-player");
const {
  MessageComponentInteraction,
  Client,
  EmbedBuilder
} = require("discord.js");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
  name: "resumeButton",
  /**
   * @param {MessageComponentInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.reply("Temporarily disabled! Sorry")
    return;
    await interaction.deferReply();
    const player = useMasterPlayer();

    const queue = player.nodes.get(interaction.guildId);
    if (!queue || !queue.isPlaying())
      return await interaction.editReply({
        content: "Music is currently not being played!",
      });

    const currentSong = queue.currentTrack;
    const resumed = queue.node.setPaused(false);

    const successEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music resume")
      .setDescription(`Resumed **${currentSong}**!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    const errorEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music resume")
      .setDescription(`Couldn't resume **${queue.current}**!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.editReply({
      embeds: resumed ? [successEmbed] : [errorEmbed],
    });
  },
};

consoleMessage("resumeButton.js run", "botInit");
