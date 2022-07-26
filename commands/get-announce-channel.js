const { SlashCommandBuilder } = require("@discordjs/builders");
const Firebase = require("../firebase.js");

//hi hallo?

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
  async execute(interaction, client) { 
    const serverId = await interaction.guildId 
    const channel = await interaction.options.getChannel("channel")
    console.log(channel) 
    const channelId = channel.id 
    client.F.getData("Upadate-channels", "varval", "varval")
    const varvalnew = varval + 1
    client.F.addData("Upadate-channels", varvalnew , { channelId, serverId })
    await interaction.reply(`server id set to ${serverId}, & channelId set to ${channelId}. When there are any new updates/announcements about AlienBot you will get notified!`);
  },
};
console.log("get-announce-channel.js run"); 

//client.F.addData("collectionName", "docName", { js: "object" })