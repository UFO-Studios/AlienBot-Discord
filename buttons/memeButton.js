// const { getMeme } = require("memes-api");
const {
  MessageComponentInteraction,
  Client,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");
const fetch = require("node-fetch");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
  name: "memeButton",
  /**
   *
   * @param {MessageComponentInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {

    if (interaction.user.id !== interaction.message.interaction.user.id) {
      return interaction.reply({ content: 'Uh-Oh! You didn`t request this message. Run /meme!', ephemeral: true });
    }
    
    let meme;

    do {
      meme = await fetch(`https://meme-api.com/gimme`).then((res) =>
        res.json()
      );
    } while (meme.nsfw);

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
    
    //consoleMessage("Meme Button Clicked", "memeUpdate");
    return await interaction.update({ embeds: [embed], components: [row] });
  },
};

//consoleMessage("memeButton.js run", "botInit");
