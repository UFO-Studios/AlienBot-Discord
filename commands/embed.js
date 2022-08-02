const {
  SlashCommandBuilder,
  Client,
  Interaction,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("send an embed to the given channel!")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("the channel to send the embed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("the title to be displayed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("the description to be displayed. use \\n for newlines")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription(
          "The color of the embed, hex code or text, if text First char needs to be uppercase"
        )
    )
    .addStringOption((option) =>
      option
        .setName("author")
        .setDescription("the author's name to display, defaults to none.")
    )
    .addStringOption((option) =>
      option
        .setName("thumbnail-url")
        .setDescription("thumbnail image url for the embed")
    )
    .addStringOption((option) =>
      option
        .setName("image-url")
        .setDescription("main image url for the embed, defaults to none")
    )
    .addStringOption((option) =>
      option
        .setName("footer-text")
        .setDescription(
          "the text to be displayed as the footer of the embed, defaults to none"
        )
    )
    .addStringOption((option) =>
      option
        .setName("footer-icon")
        .setDescription(
          "the footer icon url to be displayed besides the footer text, defaults to none"
        )
    ),
  global: true,
  /**
   *
   * @param {Interaction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const title = await interaction.options.getString("title");
    const description = await interaction.options.getString("description");
    const color = await interaction.options.getString("color");
    const channel = await interaction.options.getChannel("channel");
    const author = await interaction.options.getString("author");
    const thumbnailUrl = await interaction.options.getString("thumbnail-url");
    const imageUrl = await interaction.options.getString("image-url");
    const footerText = await interaction.options.getString("footer-text");
    const footerIcon = await interaction.options.getString("footer-icon");

    try {
      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setAuthor({ name: author })
        .setThumbnail(thumbnailUrl)
        .setImage(imageUrl)
        .setFooter({ text: footerText, iconURL: footerIcon });

      await channel.send({ embeds: [embed] });
      return await interaction.reply({
        content: "embed sent!",
        ephemeral: true,
      });
    } catch (e) {
      if (e) {
        console.error(e);
        return await interaction.reply({
          content:
            "There was an error with this command! make sure you gave the right args to the command!",
        });
      }
    }
  },
};

console.log("embed.js run");
