const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction, Client, Util, Permissions } = require("discord.js");

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
  /**
   *
   * @param {Interaction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(
        Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS
      )
    )
      return await interaction.reply({
        content:
          "You dont have the permissions to add an emoji to this server!",
        ephemeral: true,
      });

    const rawEmoji = await interaction.options.getString("emoji");
    try {
      const parsedEmoji = Util.parseEmoji(rawEmoji);

      const extension = parsedEmoji.animated ? ".gif" : ".png";
      const url = `https://cdn.discordapp.com/emojis/${
        parsedEmoji.id + extension
      }`;

      interaction.guild.emojis.create(url, parsedEmoji.name).then((emoji) => {
        return interaction.reply({ content: `New Emoji added: ${emoji.url}` });
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
