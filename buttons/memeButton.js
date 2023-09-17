const { getMeme } = require("memes-api");


const {
  MessageComponentInteraction,
  Client,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "memeButton",
  /**
   *
   * @param {MessageComponentInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const meme = await getMeme({ sfw: true });

    const embed = new EmbedBuilder()
      .setTitle(meme.title)
      .setURL(meme.postLink)
      .setAuthor({ name: meme.author })
      .setImage(meme.url)
      .setTimestamp()
      .setColor("Blue")
      .setFooter({
        text: `⬆ ${meme.upvotes} • /meme • AlienBot`,
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("memeButton")
        .setLabel("Next Meme")
        .setStyle(ButtonStyle.Primary)
    );

    return await interaction.update({ embeds: [embed], components: [row] });
  },
};

console.log("memeButton.js run");
