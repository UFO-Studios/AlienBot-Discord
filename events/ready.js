const Config = require("../config.json")

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("Ready!");

    client.user.setActivity("Sub 2 Alien", {
      type: "STREAMING",
      url: "https://www.youtube.com/c/TheAlienDoctor",
    });

    client.channels.cache
      .get(Config.CHANNEL_ID)
      .send("Bot is online! Bot is running in dev mode :D");
  },
};