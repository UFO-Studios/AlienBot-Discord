const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
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
    await interaction.deferReply()

    const data = await fetch(
      `https://api.humorapi.com/memes/random?api-key=${client.C.MEME_API_KEY}`
    ).then((res) => res.json());

    const embed = new EmbedBuilder()
      .setTitle("Memes")
      .setURL(data.url)
      .setAuthor({ name: interaction.user.tag })
      .setImage(data.url)
      .setTimestamp()
      .setColor("Blue")
      .setFooter({
        text: `/meme • AlienBot`,
        iconURL:
          "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.editReply({ embeds: [embed] });
  },
};

console.log("meme.js run");
