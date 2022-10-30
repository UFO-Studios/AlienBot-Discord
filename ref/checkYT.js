const { Client } = require("discord.js");
const Parser = require("rss-parser");
const parser = new Parser();
var isChannel = require("is-youtube-channel");

module.exports = {
  name: "checkYT",
  /**
   * @param {String} guildId
   * @param {String} channel Discord Channel ID
   * @param {String} channelId youtube channel ID
   * @param {boolean} ft
   * @param {Client} client
   */
  async execute(guildId, channel, channelId, ft, client) {
    isChannel("UCMIh8iKkrWVhV_YSgHejvoA", async (err, valid) => {
      if (!valid) {
        return "Invalid Channel.";
      } else {
        const data = await parser.parseURL(
          `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
        );
        
        const checkData = client.F.getData()

        if(!checkData) {}-

        await client.F.addData("youtubeNotification", guildId, {
          channelId,
          latestVideoId: data.items[0].id.split(":")[2],
          channel,
          guildId,
        });

        const msgChannel = await client.channels.fetch(channel).then((c) => c);

        const channelData = client.F.getData("youtubeMessage", guildId);
        const re = new RegExp("{link}", "gi");
        const re2 = new RegExp("{pingRole}", "gi");

        const msg = channelData.replace(re, data.items[0].link);
        const msgUltra = msg.replace(re2, channelData.pingRole);

        msgChannel.send({ content: msgUltra });
      }
    });

    // data.items[0].id.split(":")[2]
  },
};
console.log("ref/checkYT.js run!")