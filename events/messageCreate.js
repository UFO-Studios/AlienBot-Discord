const mongo = require("../mongodb");
const { ChannelType, Message, Client } = require("discord.js");

const deleteBannedWords = async (message, client) => {
  try {
    const data = await mongo.getBannedWordToggle(message.guild.id);
    if (!data) return;
    const msg = message.content.toLowerCase();
    const words = msg.split(" ");

    for (const word of words) {
      if ((await mongo.checkBW(word)) == true) {
        await message.reply({
          content: "You cannot use that word!",
          reply: true,
        });

        setTimeout(() => {
          message.delete(); // this seems to not be working
        }, 1000);
      }
    }
  } catch (e) {
    if (e) {
      console.log(e);
    }
  }
};

const checkLevel = async (xp) => {};

/**
 * @param {Message} message
 * @param {Client} client
 */
const addXp = async (message, client) => {
  const oldXP = await mongo.getXP(message.author.id);
  const oldXPValue = await mongo.getJsonValue(oldXP, "xp");
  const oldLevelValue = await mongo.getJsonValue(oldXP, "xp");
  const oldXpID = await mongo.getJsonValue(oldXP, "_id");

  if (oldXPValue == null) {
    await mongo.saveXP(message.author.id, "1");
    console.log("New user xp saved");
    return true;
  } else {
    const newXP = Math.floor(Math.random() * 10) + oldXPValue;
    await mongo.saveXP(message.author.id, newXP, oldXpID);
    console.log("User xp updated, was " + oldXPValue + " now " + newXP);

    return true;
  }
};

/**
 * @param {Message} message
 * @param {Client} client
 */
const addLevels = async (message, client) => {
  const { xp, level } = await mongo.getXP(message.user.id);

  if (xp > (level > 0 ? level : 1) * 100) {
    console.log("new level");
  } else {
    console.log("no new level.");
  }
};

module.exports = {
  name: "messageCreate",
  once: false,
  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    if (message.author.bot) return;

    // banned words
    await deleteBannedWords(message, client);

    // adding xp
    await addXp(message, client);

    // adding levels
    await addLevels(message, client);
  },
};
console.log("events/messageCreate.js run");
