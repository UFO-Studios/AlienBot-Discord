const mongo = require("../mongodb");
const { ChannelType, Message, Client } = require("discord.js");
const { randomInRange } = require("make-random");

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

const checkLevel = async (xp) => {};

/**
 * @param {Message} message
 * @param {Client} client
 */
const addXp = async (message, client) => {
  const oldXpObject = await mongo.getXP(message.author.id);
  const oldXpObjectId = oldXpObject._id;
  const oldXp = oldXpObject.xp;
  const oldLevel = oldXpObject.level;

  const newXp = oldXp + (await randomInRange(15, 50));
  const newLevel = newXp > oldLevel * 500 ? oldLevel + 1 : oldLevel;

  if (newLevel > oldLevel) {
    message.channel.send({
      content: `@${message.author.tag} you just leveled up to ${newLevel}!`,
    });
  }

  console.log(newLevel, newXp);

  await mongo.saveXP(message.author.id, newXp, newLevel, oldXpObjectId);
  return true;
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
  },
};

console.log("events/messageCreate.js run");
