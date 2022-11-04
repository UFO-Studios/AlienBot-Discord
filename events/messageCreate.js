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

const levelingSystem = async (messageID, client) => {
  const oldXP = await mongo.getXP(messageID)
  const oldXpJSON = JSON.parse(oldXP);
  return oldXpJSON["xp"]; //work out why it is grey and check its returning the right data tommorow nicey!
  console.log(oldXP)
  if (oldXP == "null"){
    //mongo.saveXP(message.author.id, "1");
    console.log("aaaa")
  } else {
  const newXP = Math.trunc(Math.random * 10) + oldXP;
  //await mongo.saveXP(messageID, newXP);
  console.log(newXP + "is newXP")
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
    await levelingSystem(message.author.id, client);

  },
};
console.log("events/messageCreate.js run")