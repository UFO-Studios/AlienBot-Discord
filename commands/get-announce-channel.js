const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("easy-db-json");

db.setFile("./dbs/dac.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set update channel")
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
    const channelId = await interaction.options.getChannel("channel-id").id

    db.set(serverId, channelId) 

    await interaction.reply(`server id set to ${serverId}, & channelId set to ${channelId}`);
  },
};
console.log("get-announce-channel.js run"); 