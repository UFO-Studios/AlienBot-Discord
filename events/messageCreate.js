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

const checkLevel = async () => {
const oldXpNum = await mongo.getXP(message.author.id);
const OldRankNum = Math.trunc(Math.sqrt(oldXpNum));
const XPGain = await randomInRange(2, 10);
const newXpNum = oldXpNum + XPGain;
const NewRankNum = Math.trunc(Math.sqrt(newXpNum));
if (Number.isIntege(Math.sqrt(newXpNum)) == True) {
  var rankAlert = "You have leveled up to " + Math.sqrt(newXpNum) + "!";
  await message.reply({
    content: rankAlert,
    reply: true,
  });
  };
  await mongo.saveXP(message.author.id, newXpNum);
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
    //await mongo.saveXP(message.author.id, newXpNum);
  },
};

console.log("events/messageCreate.js run");
