const { consoleMessage } = require("../log");
const mongo = require("../database/mongodb");
const { ChannelType, Message, Client } = require("discord.js");

/**
 * @param {Message} message
 * @param {Client} client
 */
const deleteBannedWords = async (message, client) => {
  try {
    const data = await mongo.getBannedWordToggle(message.guild.id);
    if (!data) return;
    const msg = message.content.toLowerCase();
    const words = msg.split(/ |_|-/);

    for (const word of words) {
      if (await mongo.checkBW(word)) {
        await message.reply({
          content: "You cannot use that word!",
          reply: true,
        });

        setTimeout(() => {
          message.delete();
        }, 1000);
      }
    }
  } catch (e) {
    if (e) {
      console.log(e);
    }
  }
};

/**
 * Random number generator
 * @param {number} min max of range
 * @param {number} max min of range
 * @returns
 */
function genRan(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 *
 * @param {Message} message
 * @param {Client} client
 */
const checkLevel = async (message, client) => {
  if (client.LCD.has(message.author.id)) {
    // console.log("test");
    return;
  }

  const oldXP = (await mongo.getXP(message.author.id)) || 0;
  var newXP = oldXP + genRan(1, 2);

  // console.log(newXP + "(was: " + oldXP + ")");

  await mongo.saveXP(message.author.id, newXP, 0);

  setTimeout(() => {
    client.LCD.delete(message.author.id);
  }, client.C.LEVEL_COOLDOWN);
};

export default {
  name: "messageCreate",
  once: false,
  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    if (
      message.content ==
      "https://tenor.com/view/crazy-eyes-kid-pork-and-beans-beans-gif-19099849"
    ) {
      beans_message = "BEAN"
      if (genRan(0, 100) == 2) {
        beans_message = "BAKED BEAN"
      }
      beans_length = Math.floor(Math.random() * 10) + 1;
      for (let index = 0; index < beans_length; index++) {
                beans_message = `${beans_message}S`
      }
      await message.reply({
        content: beans_message,
        reply: false,
      });
    }

    if (message.author.bot || !message.guild || !message.channel) return;

    // banned words
    await deleteBannedWords(message, client);

    // adding xp
    await checkLevel(message, client);
  },
};

consoleMessage("events/messageCreate.js run", "botInit");
