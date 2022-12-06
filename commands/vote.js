const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Vote for us!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Voting")
      .setDescription(
        "Please vote for us on the following platforms to support us."
      )
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("Blue")
      .setFooter({
        text: "/vote • AlienBot",
        iconURL:
          "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      })
      .addFields(
        {
          name: "top.gg",
          value: "```https://top.gg/bot/800089810525356072```",
        },
        {
          name: "discordbotlist.com",
          value: "```https://discordbotlist.com/bots/AlienBot```",
        }
      );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("top.gg")
        .setStyle(ButtonStyle.Link)
        .setURL("https://top.gg/bot/800089810525356072"),
      new ButtonBuilder()
        .setLabel("discordbotlist.com")
        .setStyle(ButtonStyle.Link)
        .setURL("https://discordbotlist.com/bots/AlienBot")
    );

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
