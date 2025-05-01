const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
let getEmojis = require("get-emojis-from-string");
const { consoleMessage } = require("../log");

export default {
  data: new SlashCommandBuilder()
    .setName("emoji-info")
    .setDescription("get info about an emoji.")
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription(
          "the emoji to give info about, note: should be an emoji"
        )
        .setRequired(true)
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const emoji = interaction.options.getString("emoji");

    const array = getEmojis(emoji);

    // TODO: change this
    if (array.length > 1) {
      return await interaction.reply({
        content: "you cannot get info of more than 1 emoji",
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("Emoji Info")
      .setDescription("Info about the emoji")
      .addFields(
        {
          name: "name",
          value: `\`\`\`${array[0].name}\`\`\``,
          inline: true,
        },
        {
          name: "ID",
          value: `\`\`\`${
            array[0].type == "Discord Emoji"
              ? array[0].id
              : "Default Emoji (no ID)"
          }\`\`\``,
          inline: true,
        },
        {
          name: "Animated",
          value: `\`\`\`${array[0].animated}\`\`\``,
          inline: true,
        },
        { name: "URL", value: `\`\`\`${array[0].image}\`\`\``, inline: true },
        { name: "type", value: `\`\`\`${array[0].type}\`\`\``, inline: true }
      )
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(array[0].image)
      .setColor("Blue");

    return await interaction.reply({ embeds: [embed] });
  },
};

consoleMessage("emojiInfo.js run", "botInit");
