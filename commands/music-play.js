const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  ChatInputCommandInteraction,
} = require("discord.js");
const { useMasterPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song with its name!")
    .addStringOption((option) =>
      option
        .setName("song-name")
        .setDescription("The name of the song you want to play")
        .setRequired(true)
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const player = useMasterPlayer();
    const songName = interaction.options.getString("song-name", true);

    if (!interaction.member.voice.channelId) {
      return await interaction.editReply({
        content: "You are not in a voice channel!",
        ephemeral: true,
      });
    }

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.members.me.voice.channelId
    )
      return await interaction.editReply({
        content: "You are not in my current voice channel!",
        ephemeral: true,
      });

    try {
      const { track } = await player.play(
        interaction.member.voice.channel,
        songName,
        {
          nodeOptions: {
            metadata: interaction,
          },
        }
      );

      const embed = new EmbedBuilder()
        .setTitle("Added to the queue!")
        .setDescription(
          `**${
            track.title
          }** has been added to the queue by **${interaction.user.toString()}**!`
        )
        .setColor("Green")
        .setAuthor({ name: interaction.user.tag })
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({
          text: "Music System • Alienbot",
          iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
        });

      await interaction.editReply({
        embeds: [embed],
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply(`Something went wrong: ${error}`);
    }
  },
};

console.log("music-play.js run");
