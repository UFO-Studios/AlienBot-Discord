const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("make-meme")
    .setDescription("Generate Popular Memes")
    .addSubcommand((sc) =>
      sc
        .setName("ad")
        .setDescription("Generate an ad meme.")
        .addAttachmentOption((option) =>
          option
            .setName("image")
            .setDescription("image to generate the meme with.")
            .setRequired(true)
        )
    )
    .addSubcommand((sc) =>
      sc
        .setName("beautiful")
        .setDescription("Generate a beautiful meme.")
        .addAttachmentOption((option) =>
          option
            .setName("image")
            .setDescription("image to generate the meme with.")
            .setRequired(true)
        )
    )
    .addSubcommand((sc) =>
      sc
        .setName("bobross")
        .setDescription("Generate a bobross meme.")
        .addAttachmentOption((option) =>
          option
            .setName("image")
            .setDescription("image to generate the meme with.")
            .setRequired(true)
        )
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() == "ad") {
      // ad.js
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
    } else if (interaction.options.getSubcommand() == "beautiful") {
      // beautiful.js
      const file = interaction.options.getAttachment("image");
      // file.attachment
      const embed = new EmbedBuilder()
        .setTitle("Beautiful meme")
        .setDescription(`Beautiful meme generated with your given file.`)
        .setImage(
          `https://poopoo-api.vercel.app/api/image/beautiful?url=${file.attachment}`
        )
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setColor("Blue")
        .setFooter({
          text: "/beautiful • AlienBot",
          iconURL:
            "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
        });
      await interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() == "bobross") {
      // bobross.js
      const file = interaction.options.getAttachment("image");
      // file.attachment
      const embed = new EmbedBuilder()
        .setTitle("Bobross meme")
        .setDescription(`Bobross meme generated with your given file.`)
        .setImage(
          `https://poopoo-api.vercel.app/api/image/bobross?url=${file.attachment}`
        )
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setColor("Blue")
        .setFooter({
          text: "/bobross • AlienBot",
          iconURL:
            "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
        });
      await interaction.reply({ embeds: [embed] });
    }
  },
};
