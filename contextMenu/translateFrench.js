const {
  MessageContextMenuCommandInteraction,
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  Client,
  EmbedBuilder,
} = require("discord.js");
const translate = require("@vitalets/google-translate-api");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("translate-to-french")
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

    const inFrench = await translate(msg, { to: "french" })
      .then((res) => res.text)
      .catch((e) => console.log(e));

    const embed = new EmbedBuilder()
      .setTitle("Translate")
      .setDescription("Translate text to French.")
      .addFields(
        {
          name: "Original Text",
          value: `\`\`\`${msg}\`\`\``,
        },
        { name: "Translated to French", value: `\`\`\`${inFrench}\`\`\`` }
      )
      .setColor("Blue")
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setAuthor({ name: interaction.user.tag })
      .setTimestamp()
      .setFooter({
        text: "Translate to French • Alienbot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

console.log("translateFrench.js run");
