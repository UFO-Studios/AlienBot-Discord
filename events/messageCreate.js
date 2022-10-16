// const db = require("easy-db-json");
// db.setFile("./db.json");
const { ChannelType, Message, Client } = require("discord.js");
const convertor = require("number-to-words");
const emojiFromText = require("emoji-from-text");
const edb = require("easy-db-json");
edb.setFile("./db/level.json");

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
  try {
    const data = await client.F.getData("level", message.guild.id);
    let level = data.level[message.author.id] || 0;

    const gain = Math.floor(Math.random() * 10) + 1;
    data.level[message.author.id] = level + gain;

    client.F.addData("level", message.guild.id, { level: data.level });
  } catch (e) {
    console.error(e);
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

    // leveling
    await levelingSystem(message, client);
  },
};
