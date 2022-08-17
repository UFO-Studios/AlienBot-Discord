const {
  SlashCommandBuilder,
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
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
        .setName("footer-image-url")
        .setDescription(
          "the footer icon url to be displayed besides the footer text, defaults to none"
        )
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageGuild
      ) ||
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return await interaction.reply({
        content:
          "You dont have the permissions to send an embed in the server!",
      });
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const color = interaction.options.getString("color");
    const channel = interaction.options.getChannel("channel");
    const author = interaction.options.getString("author");
    const thumbnailUrl = interaction.options.getString("thumbnail-url");
    const imageUrl = interaction.options.getString("image-url");
    const footerText = interaction.options.getString("footer-text");
    const footerIcon = interaction.options.getString("footer-icon");

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
