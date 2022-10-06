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
    await interaction.deferReply();
    let data = await fetch("https://meme-api.herokuapp.com/gimme/memes").then(
      (res) => res.json()
    );
    
    if (!interaction.channel.nsfw && data.nsfw) {
      console.log(data.nsfw);
      while (data.nsfw) {
        console.log("while loop run");
        data = await fetch("https://meme-api.herokuapp.com/gimme/memes").then(
          (res) => res.json()
        );
      }
    }

    const embed = new EmbedBuilder()
      .setTitle(data.title)
      .setURL(data.postLink)
      .setAuthor({ name: data.author })
      .setImage(data.url)
      .setTimestamp()
      .setColor("Blue")
      .setFooter({
        text: `/meme • AlienBot`,
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    return await interaction.editReply({ embeds: [embed] });
  },
};

console.log("memes.js run");
