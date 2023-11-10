const {
  MessageContextMenuCommandInteraction,
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  Client,
  EmbedBuilder,
} = require("discord.js");
const translate = require("@vitalets/google-translate-api");
const { consoleMessage } = require("../log");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("translate-to-english")
    .setType(ApplicationCommandType.Message),
  /**
   *
   * @param {MessageContextMenuCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const msg = interaction.targetMessage.content;

    if (!msg)
      return await interaction.reply({
        content: "Cant translate embeds!",
        ephemeral: true,
      });

    const inEnglish = await translate(msg, { to: "en" })
      .then((res) => res.text)
      .catch((e) => console.log(e));

    const embed = new EmbedBuilder()
      .setTitle("Translate")
      .setDescription("Translate text to English.")
      .addFields(
        {
          name: "Original Text",
          value: `\`\`\`${msg}\`\`\``,
        },
        { name: "Translated to English", value: `\`\`\`${inEnglish}\`\`\`` }
      )
      .setColor("Blue")
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setAuthor({ name: interaction.user.tag })
      .setTimestamp()
      .setFooter({
        text: "Translate to English • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

consoleMessage("translateEnglish.js run", "botInit");
