const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits, parseEmoji } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("steal-emoji")
    .setDescription("Adds the given emoji to the server")
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription("Emoji to add from another server")
        .setRequired(true)
    ),
  global: true,
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionFlagsBits.ManageEmojisAndStickers
      )
    ) {
      return await interaction.reply({
        content:
          "You dont have the permissions to add an emoji to this server!",
        ephemeral: true,
      });
    }

    const rawEmoji = await interaction.options.getString("emoji");
    try {
      const parsedEmoji = parseEmoji(rawEmoji);

      const extension = parsedEmoji.animated ? ".gif" : ".png";
      const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id}${extension}`;

      await interaction.guild.emojis
        .create({ attachment: url, name: parsedEmoji.name })
        .then((emoji) => {
          return interaction.reply({
            content: `New Emoji added: \`${emoji.url}\``,
          });
        });
    } catch (e) {
      if (e) {
        return await interaction.reply({
          content: "Invalid Emoji",
          ephemeral: true,
        });
      }
    }
  },
};
