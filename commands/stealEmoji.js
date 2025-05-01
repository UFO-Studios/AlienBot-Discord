const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits, parseEmoji } = require("discord.js");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
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
          'You dont have the permissions to add an emoji to this server. You need the "ManageEmojisAndStickers" permission!',
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
            content: `New Emoji added: \`${url}\`, :${parsedEmoji.name}:`,
          });
        });
    } catch (e) {
      if (e) {
        if (e.code == 50013)
          return await interaction.reply({
            content: `I dont have the permissions to add an emoji to this guild. I need the "ManageEmojisAndSticker" permission!`,
          });

        return await interaction.reply({
          content: "Invalid Emoji",
          ephemeral: true,
        });
      }
    }
  },
};

consoleMessage("steamEmoji.js run", "botInit")
