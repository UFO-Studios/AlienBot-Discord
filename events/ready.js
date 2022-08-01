const { Client, ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    await client.guilds.fetch();

    // `github.com/UFO-Studios`, {
    //   type: "WATCHING",
    // }
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
              name: `${client.users.cache.size} members`,
              type: ActivityType.Watching,
            },
          ],
          status: "dnd",
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
// () => {
//   client.user.setPresence({
//     activities: [
//       {
//         name: "activity name",
//         type: ActivityType.Streaming,
//       },
//     ],
//     status: "online",
//   });
// };
//  },
