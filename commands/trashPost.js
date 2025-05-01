const {
  SlashCommandBuilder,
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const fetch = require("node-fetch");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
  data: new SlashCommandBuilder()
    .setName("trashpost")
    .setDescription("Get a random shitpost."),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const data = await fetch("https://api.thedailyshitpost.net/random").then(
      (r) => r.json()
    );

    // console.log(data);
    if (data.error != "False") {
      console.error(data.error);
      return await interaction.reply({
        content: "There was an error fetching a post!",
      });
    }

    return await interaction.reply({
      content: `Heres the trashpost: ${data.url}`,
    });
  },
};

consoleMessage("trashPost.js run", "botInit");
