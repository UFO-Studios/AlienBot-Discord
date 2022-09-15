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
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      })
      .addFields(
        {
          name: "top.gg",
          value: "```https://top.gg/bot/800089810525356072```",
        },
        {
          name: "discordbotlist.com",
          value: "```https://discordbotlist.com/bots/alienbot```",
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
        .setURL("https://discordbotlist.com/bots/alienbot")
    );

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
