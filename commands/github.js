const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const { default: fetch } = require("node-fetch");
const { consoleMessage } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("github-info")
    .setDescription("get a person's github account info")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("github username of the person to get info of")
        .setRequired(true)
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const username = interaction.options.getString("username");

    const data = await fetch(
      `https://poopoo-api.vercel.app/api/github?name=${username}`
    ).then((d) => d.json());

    const createdAtDate = data.created_at.split("T")[0];
    const createdAtTime = data.created_at.split("T")[1].slice(0, -1);

    const updatedAtDate = data.updated_at.split("T")[0];
    const updatedAtTime = data.updated_at.split("T")[1].slice(0, -1);

    const embed = new EmbedBuilder()
      .setTitle("Github Info")
      .setDescription(`Heres the github info of \`${username}\``)
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("Blue")
      .setThumbnail(data.avatar)
      .addFields(
        {
          name: "name",
          value: `\`\`\`${data.name}\`\`\``,
          inline: true,
        },
        {
          name: "url",
          value: `\`\`\`https://github.com/${username}\`\`\``,
          inline: true,
        },
        {
          name: "bio",
          value: `\`\`\`${data.bio}\`\`\``,
        },
        {
          name: "twitter",
          value: `\`\`\`${data.twitter}\`\`\``,
          inline: true,
        },
        {
          name: "company",
          value: `\`\`\`${data.company}\`\`\``,
          inline: true,
        },
        {
          name: "email",
          value: `\`\`\`${data.email}\`\`\``,
        },
        {
          name: "followers",
          value: `\`\`\`${data.followers}\`\`\``,
          inline: true,
        },
        {
          name: "following",
          value: `\`\`\`${data.following}\`\`\``,
          inline: true,
        },
        {
          name: "blog",
          value: `\`\`\`${data.blog == "" ? "Not set" : data.blog}\`\`\``,
        },
        {
          name: "public repos",
          value: `\`\`\`${data.public_repos}\`\`\``,
          inline: true,
        },
        {
          name: "public gists",
          value: `\`\`\`${data.public_gists}\`\`\``,
          inline: true,
        },
        {
          name: "\u200b",
          value: "\u200b",
        },
        {
          name: "created at",
          value: `\`\`\`${createdAtDate + " " + createdAtTime}\`\`\``,
          inline: true,
        },
        {
          name: "updated at",
          value: `\`\`\`${updatedAtDate + " " + updatedAtTime}\`\`\``,
          inline: true,
        }
      )
      .setFooter({
        text: "/github-info • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.reply({ embeds: [embed] });
  },
};

consoleMessage("github.js run", "botInit");
