const { Client } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    await client.guilds.fetch();

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
      () => {
        client.user.setActivity(`The only bot from outer space!`, {
          type: "PLAYING",
        });
      },
      () => {
        client.user.setActivity(`github.com/UFO-Studios`, {
          type: "WATCHING",
        });
      },
    ];
    setInterval(() => {
      const randomNum = Math.floor(Math.random() * 5);
      //console.log(randomNum);
      array[randomNum]();
    }, 10000);
    console.log("Ready!");
    await client.channels.cache
      .get(client.C.CHANNEL_ID)
      .send("Bot is online! Running in dev mode :D");
  },
};

// template
//  () => {
//    client.user.setActivity(`Activity Here`, {
//      type: "WATCHING or PLAYING or STREAMING",
//    });
//  },
