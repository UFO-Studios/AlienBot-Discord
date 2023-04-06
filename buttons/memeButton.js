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
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
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
