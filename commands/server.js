const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Display info about this server."),
  global: true,
  async execute(interaction) {
    return interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  },
};
console.log("server.js run");
