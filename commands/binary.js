const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const { default: fetch } = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("binary")
    .setDescription("Encode or decode text")
    .addSubcommand((sc) =>
      sc
        .setName("encode")
        .setDescription("Encodes/Converts the given text to binary")
        .addStringOption((option) =>
          option
            .setName("text")
            .setDescription("The text to encode.convert to binary")
            .setRequired(true)
        )
    )
    .addSubcommand((sc) =>
      sc
        .setName("decode")
        .setDescription("Decodes/Converts binary text to human-readable text")
        .addStringOption((option) =>
          option
            .setName("text")
            .setDescription(
              "Binary text to decode/convert to human readable text"
            )
            .setRequired(true)
        )
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() == "encode") {
      // encode to binary text
      const text = interaction.options.getString("text");
      const data = await fetch(
        `https://poopoo-api.vercel.app/api/encode?text=${text}`
      ).then((d) => d.json());

      const embed = new EmbedBuilder()
        .setTitle("Convert text to binary")
        .setDescription(`Heres the binary result of your given text.`)
        .addFields(
          {
            name: "your text",
            value: `\`\`\`${text}\`\`\``,
          },
          {
            name: "binary text",
            value: `\`\`\`${data.binary}\`\`\``,
          }
        )
        .setAuthor({
          name: interaction.user.tag,
        })
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setColor("Blue")
        .setFooter({
          text: "/binary encode • AlienBot",
          iconURL:
            "https://thealiendoctor.com/img/alienbot/face-64x64.png",
        });

      return await interaction.reply({
        embeds: [embed],
      });
    } else {
      // decode to human-readable text
      const binary = interaction.options.getString("text");
      const data = await fetch(
        `https://poopoo-api.vercel.app/api/decode?binary=${binary}`
      ).then((d) => d.json());

      const embed = new EmbedBuilder()
        .setTitle("Convert binary to text")
        .setDescription(`Heres the human-readable result of your given text.`)
        .addFields(
          {
            name: "binary text",
            value: `\`\`\`${binary}\`\`\``,
          },
          {
            name: "human-readable text",
            value: `\`\`\`${data.text}\`\`\``,
          }
        )
        .setAuthor({
          name: interaction.user.tag,
        })
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setColor("Blue")
        .setFooter({
          text: "/binary decode • AlienBot",
          iconURL:
            "https://thealiendoctor.com/img/alienbot/face-64x64.png",
        });

      return await interaction.reply({
        embeds: [embed],
      });
    }
  },
};

console.log("binary.js run");
