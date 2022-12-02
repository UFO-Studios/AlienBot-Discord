const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Start a poll for voting!")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription(
          "The message to display with the poll embed. use the keyword `newline` for new lines."
        )
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const message = interaction.options.getString("message");
    const finalMessage = message.replace(/newline/gim, "\n");

    const embed = new EmbedBuilder()
      .setTitle("Vote now!")
      .setAuthor({ name: interaction.user.tag })
      .setDescription(finalMessage)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("Blue")
      .setFooter({
        text: `/poll • AlienBot`,
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    const reply = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });
    await reply.react("✅");
    return await reply.react("❎");
  },
};
