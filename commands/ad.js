const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ad")
    .setDescription("Generate an ad meme.")
    .addAttachmentOption((option) =>
      option
        .setName("image")
        .setDescription("image to generate the meme with.")
        .setRequired(true)
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const file = interaction.options.getAttachment("image");
    // file.attachment
    const embed = new EmbedBuilder()
      .setTitle("AD meme")
      .setDescription(`AD meme generated with your given file.`)
      .setImage(
        `https://poopoo-api.vercel.app/api/image/ad?url=${file.attachment}`
      )
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("Blue")
      .setFooter({
        text: "/ad • AlienBot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });
    await interaction.reply({ embeds: [embed] });
  },
};

console.log("ad.js run");
