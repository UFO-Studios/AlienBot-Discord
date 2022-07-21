const Config = require("../config.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log("Ready!");

    client.channels.cache
      .get(Config.CHANNEL_ID)
      .send("Bot is online! Running in dev mode :D");
    const array = [
      () => {
        client.user.setActivity("Sub 2 Alien", {
          type: "STREAMING",
          url: "https://www.youtube.com/c/TheAlienDoctor",
        });
      },
      () => {
        client.user.setActivity("thealiendoctor.com is cool", {
          type: "PLAYING",
        });
      },
      () => {
        client.user.setActivity(`${client.guilds.cache.size} servers`, {
          type: "WATCHING",
        });
      },
      () => {
        client.user.setActivity(`${client.users.cache.size} users`, {
          type: "WATCHING",
        });
      },
    ];
    setInterval(() => {
      const randomNum = Math.floor(Math.random() * 3);
      console.log(randomNum);
      array[randomNum]();
    }, 10000);
  },
};
