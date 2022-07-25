const { SlashCommandBuilder } = require("@discordjs/builders");
const Firebase = require("../firebase.js");
//const db = require("easy-db-json");

//db.setFile("../dac.json");

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
    client.F.addData(guildId, channelId, { js: "object" })
    await interaction.reply(`server id set to ${serverId}, & channelId set to ${channelId}. When there are any new updates/announcements about AlienBot you will get notified!`);
  },
};
console.log("get-announce-channel.js run"); 

//client.F.addData("collectionName", "docName", { js: "object" })