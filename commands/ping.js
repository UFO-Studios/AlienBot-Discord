const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  global: true,
  async execute(interaction, client) {
    await interaction.reply(`🏓 | Ping is \`${client.ws.ping}\` ms.`);
  },
};
console.log("ping.js run");
