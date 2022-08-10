// const db = require("easy-db-json");
// db.setFile("./db.json");
const { ChannelType, Message, Client, EmbedBuilder } = require("discord.js");
const convertor = require("number-to-words");
const emojiFromText = require("emoji-from-text");

/**
 *
 * @param {Message} msg
 * @param {Number} times
 */
const react = async (msg, times) => {
  let num = 0;
  while (times + 1 > num) {
    num += 1;
    const numWord = convertor.toWords(num);
    console.log(numWord);
    const emoji = emojiFromText(numWord)[0].match.emoji.char;
    console.log(emoji);
    await msg.react(emoji);
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
    const pointGain = Math.random();
    if (message.author.bot) return;
    const data = client.F.getData("banned-words", message.guild.id);
    if (!data) return;
    if (data.toggleValue == "off") return;
    // levling code
   // const messageSender = message.author.username
   // const currentLevel = client.F.getData("level", messageSender)
    //const NewLevel = currentLevel + pointGain
    //client.F.addData("level", messageSender, NewLevel)
    // collec name, doc name, data
    try {
      const data = client.F.getData("banned-woreds", message.guildId);
      if (!data) return;
      if (data.toggleValue == "on") {
        const array = message.content.split(" ");

        array.map((word) => {
          if (client.BANNED_WORDS.includes(word.toLowerCase())) {
            message.reply({
              content: "You cannot use that word!",
              reply: true,
            });
            setTimeout(() => {
              message.delete();
            }, 1000);
          }
        });
      } else {
        return;
      }
    } catch (e) {
      if (e) {
        console.log(e);
      }
    }
  },
};
