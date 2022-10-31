const mongo = require("../mongodb") 
const { ChannelType, Message, Client } = require("discord.js");
const convertor = require("number-to-words");
const emojiFromText = require("emoji-from-text");
const io = require('@pm2/io')

const cmdsRun = io.metric({
  name: 'Commands',
});

const deleteBannedWords = async (message, client) => {
  try {
    const data = client.F.getData("banned-words", message.guildId);
    if (!data) return;
    if (!data.toggleValue == "on") return;

    const array = message.content.split(" ");

    for (const word of array) {
      if (client.BANNED_WORDS.includes(word.toLowerCase())) {
        message.reply({
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

const levelingSystem = async (message, client) => {
  const oldXP = await mongo.getXP(message.author.id)
  if (oldXP == "NaN"){
    mongo.saveXP(message.author.id, "1");
  } else if (oldXP == "null") {
    mongo.saveXP(message.author.id, "1");
  } else {
  const newXP = Math.trunc(Math.random * 10) + oldXP;
  console.log(newXP)
  };

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

    // leveling
    await levelingSystem(message, client);

    //PM2
    if (oldCmdCount == !data) {
      cmdsRun.set(1);
    } else {
      const newCmdCount = newCmdCount + 1
      cmdsRun.set(newCmdCount)
    }
  },
};
console.log("events/messageCreate.js run")