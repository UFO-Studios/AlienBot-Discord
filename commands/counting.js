const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const db = require("easy-db-json");

db.setFile("./db.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-counting")
    .setDescription("set counting channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("channel where the counting will start")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has([
        Permissions.FLAGS.MANAGE_GUILD,
        Permissions.FLAGS.MANAGE_CHANNELS,
      ])
    )
      return interaction.reply({
        content: "You dont have the permissions to do this!",
        ephemeral: true,
      });

    const channelOption = await interaction.options.getChannel("channel");

    db.set(channelOption.id, 1);
    db.set(`${channelOption.id}-id`, channelOption.id);

    return interaction.reply({ content: "Counting channel set!" });
  },
};

console.log("counting.js run");
