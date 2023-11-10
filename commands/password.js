const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  ChatInputCommandInteraction,
} = require("discord.js");
const { default: fetch } = require("node-fetch");
const { consoleMessage } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("password")
    .setDescription("Generates a random password for you."),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const data = await fetch("https://poopoo-api.vercel.app/api/password").then(
      (d) => d.json()
    );

    return await interaction.reply({
      content: `Your custom generated password is: \`${data.password}\`. Keep it secret, keep it safe.`,
      ephemeral: true,
    });
  },
};

consoleMessage("password.js run", "botInit");
