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
import consoleModule from "../log"; const { consoleMessage } = consoleModule;
// const { getMeme } = require("memes-api");

export default {
  data: new SlashCommandBuilder().setName("meme").setDescription("get memes!"),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();

    let meme;

    do {
      meme = await fetch(`https://meme-api.com/gimme`).then((res) =>
        res.json()
      );
    } while (meme.nsfw);

    // const meme = await getMeme({ sfw: true });

    const embed = new EmbedBuilder()
      .setTitle(meme.title)
      .setURL(meme.postLink)
      .setAuthor({ name: meme.author })
      .setImage(meme.url)
      .setTimestamp()
      .setColor("Blue")
      .setFooter({
        text: `⬆ ${meme.ups} • /meme • AlienBot`,
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

//consoleMessage("meme.js run", "botInit");
