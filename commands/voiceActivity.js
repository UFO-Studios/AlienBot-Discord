const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("voice-activity")
    .setDescription("Play Games, Watch youtube All together with your friends!")
    .addSubcommand((sc) =>
      sc.setName("youtube").setDescription("Plays youtube")
    )
    .addSubcommand((sc) => sc.setName("poker").setDescription("Plays poker"))
    .addSubcommand((sc) =>
      sc.setName("fishing").setDescription("Plays fishing")
    )
    .addSubcommand((sc) => sc.setName("chess").setDescription("Plays chess"))
    .addSubcommand((sc) =>
      sc.setName("lettertile").setDescription("Plays lettertile")
    )
    .addSubcommand((sc) =>
      sc.setName("wordsnack").setDescription("Plays wordsnack")
    )
    .addSubcommand((sc) =>
      sc.setName("awkword").setDescription("Plays awkword")
    )
    .addSubcommand((sc) =>
      sc.setName("doodlecrew").setDescription("Plays doodlecrew")
    )
    .addSubcommand((sc) =>
      sc.setName("spellcast").setDescription("Plays spellcast")
    )
    .addSubcommand((sc) =>
      sc.setName("checkers").setDescription("Plays checkers")
    )
    .addSubcommand((sc) =>
      sc.setName("puttparty").setDescription("Plays puttparty")
    )
    .addSubcommand((sc) =>
      sc.setName("sketchheads").setDescription("Plays sketchheads")
    )
    .addSubcommand((sc) => sc.setName("ocho").setDescription("Plays ocho"))
    .addSubcommand((sc) =>
      sc.setName("puttpartyqa").setDescription("Plays puttpartyqa")
    )
    .addSubcommand((sc) =>
      sc.setName("sketchyartist").setDescription("Plays sketchyartist")
    )
    .addSubcommand((sc) => sc.setName("land").setDescription("Plays land"))
    .addSubcommand((sc) => sc.setName("meme").setDescription("Plays meme"))
    .addSubcommand((sc) =>
      sc.setName("askaway").setDescription("Plays askaway")
    )
    .addSubcommand((sc) => sc.setName("bobble").setDescription("Plays bobble"))
    .addSubcommand((sc) =>
      sc.setName("youtubedev").setDescription("Plays youtubedev")
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    if (!interaction.member.voice.channelId) {
      return await interaction.editReply({
        content: "You are not in a voice channel",
      });
    }

    client.discordTogether
      .createTogetherCode(
        interaction.member.voice.channelId,
        interaction.options.getSubcommand()
      )
      .then(async (invite) => {
        return await interaction.editReply({ content: `${invite.code}` });
      });
  },
};

console.log("voiceActivity.js run");
