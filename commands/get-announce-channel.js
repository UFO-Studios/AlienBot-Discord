const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("easy-db-json");

db.setFile("../dac.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("update-channel")
    .setDescription("Sets the channel to publish the bot update/fixes messages.")
    .addChannelOption((option) => {
      option
        .setName("channel")
        .setDescription(
          "The channel you want updates posted to."
        )
        .setRequired(true);
      return option;
    }),
  global: true,
  async execute(interaction) { 
    const serverId = await interaction.guildId 
    const channel = await interaction.options.getChannel("channel")
    console.log(channel) 
    const channelId = channel.id 
    db.setFile("../dac.json");
    db.set("z", "2")

    await interaction.reply(`server id set to ${serverId}, & channelId set to ${channelId}`);
  },
};
console.log("get-announce-channel.js run"); 