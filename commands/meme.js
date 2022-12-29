const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder().setName("meme").setDescription("get memes!"),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();

    const data = await fetch(`https://meme-api.com/gimme`).then((res) =>
      res.json()
    );

    const embed = new EmbedBuilder()
      .setTitle(data.title)
      .setURL(data.postLink)
      .setAuthor({ name: data.author })
      .setImage(data.url)
      .setTimestamp()
      .setColor("Blue")
      .setFooter({
        text: `⬆ ${data.ups} • /meme • AlienBot`,
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("memeButton")
        .setLabel("Next Meme")
        .setStyle(ButtonStyle.Primary)
    );

    return await interaction.editReply({ embeds: [embed], components: [row] });
  },
};

console.log("meme.js run");
