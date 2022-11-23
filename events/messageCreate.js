const mongo = require("../mongodb") 
const { ChannelType, Message, Client } = require("discord.js");
const convertor = require("number-to-words");
const emojiFromText = require("emoji-from-text");


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
  console.log("XP system loaded")
  const oldXP = await mongo.getXP(messageID)
  const oldXPValue = await mongo.getJsonValue(oldXP, "xp")
  const oldXpID = await mongo.getJsonValue(oldXP, "_id");
  console.log(oldXPValue + " is oldXPValue")
  if (oldXPValue == null){
    await mongo.saveXP(messageID, "1");
    console.log("User has been added to leveling DB.")
    return true //we could change this so we could dm a new user stuff but thats a later me problem
  } else {
      if (oldXpID = "1044067382022373500") {
          console.log("WE HAVE A GHOST USER EVERYONE PANIC!!!!")
          return false;
      }
    const newXP = Math.trunc(Math.random() * 10) + oldXPValue;
    await mongo.saveXP(messageID, newXP, oldXpID);
    console.log(newXP + " is newXP")
    return true
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
    const MSGID = message.author.id;
    levelingSystem(MSGID, client);

  },
};
console.log("events/messageCreate.js run")