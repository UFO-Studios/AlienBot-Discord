const { Client, ActivityType } = require("discord.js");
const Config = require("../config.json");


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
        client.user.setPresence({
          activities: [
            {
              name: "Sub 2 Alien",
              type: ActivityType.Streaming,
              url: "https://www.youtube.com/c/TheAlienDoctor",
            },
          ],
          status: "online",
        });
      },
      () => {
        client.user.setPresence({
          activities: [
            {
              name: "https://thealiendoctor.com is cool",
              type: ActivityType.Playing,
              url: "https://thealiendoctor.com",
            },
          ],
          status: "dnd",
        });
      },
      () => {
        client.user.setPresence({
          activities: [
            {
              name: `${client.guilds.cache.size} servers`,
              type: ActivityType.Watching,
            },
          ],
          status: "idle",
        });
      },
      () => {
        client.user.setPresence({
          activities: [
            {
              name: "The only bot from outer space!",
              type: ActivityType.Playing,
            },
          ],
          status: "idle",
        });
      },
      () => {
        client.user.setPresence({
          activities: [
            {
              name: "https://github.com/UFO-Studios",
              type: ActivityType.Watching,
            },
          ],
          status: "online",
        });
      },
      () => {
        client.user.setPresence({
          activities: [
            {
              name: "Now running on DJS v14!",
              type: ActivityType.Playing,
            },
          ],
          status: "online",
        });
      },
      () => {
        client.user.setPresence({
          activities: [
            {
              name: "tbh ngl pls bruh dont brake my bard uwu",
              type: ActivityType.Watching,
            },
          ],
          status: "online",
        });
      },
      () => {
        client.user.setPresence({
          activities: [
            {
              name: "*ooo! Quartz*",
              type: ActivityType.Watching,
            },
          ],
          status: "online",
        });
      },
      () => {
        client.user.setPresence({
          activities: [
            {
              name: "What? you expected a funny joke? lol no",
              type: ActivityType.Watching,
            },
          ],
          status: "online",
        });
      },
      () => {
        client.user.setPresence({
          activities: [
            {
              name: '"Great Minds Think Alike."',
              type: ActivityType.Playing,
            },
          ],
          status: "idle",
        });
      },
      () => {
        client.user.setPresence({
          activities: [
            {
              name: '"The more pages a website has, the cooler it is" - TheAlienDoctor',
              type: ActivityType.Watching,
            },
          ],
          status: "dnd",
        });
      },
    ];

    setInterval(() => {
      const randomNum = Math.floor(Math.random() * 8);
      //console.log(randomNum);
      array[randomNum]();
    }, 20 * 1000); // 20 seconds

    const testENV = "dev";
    const githubENV = "GHA";
    const prodENV = "prod"

    await client.channels.cache
      .get(client.C.CHANNEL_ID)
      if (Config.ENV = githubENV){
        client.channels.cache
        .get(client.C.CHANNEL_ID)
        .send("Bot is running tests!");
        console.log("ready!")
      } else if (Config.ENV = "dev") {
          client.channels.cache
          .get(client.C.CHANNEL_ID)
          .send("Bot is running in dev mode!");
          console.log("ready!")
        } else {
          client.channels.cache
          .get(client.C.CHANNEL_ID)
          .send("Bot is running in prod mode!");
          console.log("ready!")
        }
      }
}

