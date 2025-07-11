// const { useMasterPlayer } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");
const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Gives the current volume or changes the current volume.")
    .addIntegerOption((option) =>
      option
        .setName("volume")
        .setDescription("The volume to set")
        .setRequired(false)
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
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

    const volume = parseInt(await interaction.options.getInteger("volume"));

    if (!volume) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: interaction.user.tag })
        .setColor("Green")
        .setTitle("Music volume")
        .setDescription(`The current volume is **${queue.node.volume}**%!`)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({
          text: "Music System • AlienBot",
          iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
        });

      return await interaction.editReply({ embeds: [embed] });
    }

    if (volume < 0 || volume > 100)
      return await interaction.editReply({ content: "Invalid volume!" });

    const changed = queue.node.setVolume(volume);

    const successEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music volume")
      .setDescription(`Changed the volume to **${volume}**%!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    const errorEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Green")
      .setTitle("Music pause")
      .setDescription(`Couldn't change the volume to **${volume}**!`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Music System • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.editReply({
      embeds: changed ? [successEmbed] : [errorEmbed],
    });
  },
};

//consoleMessage("music-volume.js run", "botInit");
