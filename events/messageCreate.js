// const db = require("easy-db-json");
// db.setFile("./db.json");
const Firebase = require("./firebase.js");
const { ChannelType, Message, Client } = require("discord.js");
const convertor = require("number-to-words");
const emojiFromText = require("emoji-from-text");
const edb = require("easy-db-json");
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
edb.setFile("./db/level.json")

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

      
    // banned words
    const data = client.F.getData("banned-words", message.guild.id);
    if (!data) return;
    if (data.toggleValue == "off") return;
    // levling code

    const levelServer = message.guild.id
    const dataLvl = await client.F.getData();
    const msgAuthor = message.author.id
    //const lvlOld = client.F.getData("level", msgAuthor);
    console.log(msgAuthor)

    sleep(1).then(async () => {
      const msgAuthor = "test_ID";
      const lvlOld = await Firebase.getData("level", "test");
      console.log(lvlOld + "is lvlOld");
      const lvlGain = Math.trunc(Math.random() * 10);
      const lvlNew = lvlOld + lvlGain;
      await Firebase.addData("level", "test", {"tessa": lvlNew});
      console.log("User with ID " + msgAuthor + " has had " + lvlGain + " added to their score")
    });


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
