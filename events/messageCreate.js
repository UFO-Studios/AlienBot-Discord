const { Message, Client } = require("discord.js");
const db = require("easy-db-json");

db.setFile("./db.json");

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
    const data = client.F.getData("banned-words", message.guildId);
    if (!data) return;
    if (data.toggleValue == "off") return;
    try {
      const array = await message.content.split(" ");

      array.map((word) => {
        if (client.BANNED_WORDS.includes(word.toLowerCase())) {
          message.reply({ content: "You cannot use that word!", reply: true });
          setTimeout(() => {
            message.delete();
          }, 1000);
        }
      });
    } catch (e) {
      if (e) {
        console.log(e);
      }
    }

    // counting
    // try {
    //   const counts = db.get(message.channel.id);
    //   const channelId = db.get(`${message.channel.id}-id`);
    //   if (!counts) return;

    //   if (!channelId == message.channel.id) return;
    //   const currentCounter = db.get(`currentCounter-${message.channel.id}`);

    //   if (!currentCounter) {
    //     db.set(`currentCounter-${message.channel.id}`, message.author.id);
    //   } else if (
    //     currentCounter == message.author.id &&
    //     message.channel.id == channelId
    //   ) {
    //     return interaction.reply("You cannot send 2 messages in a row!")
    //   }

    //   if (/\d/.test(message.content)) {
    //     if (message.content == counts) {
    //       db.set(message.channel.id, counts + 1);
    //       return message.react("☑️");
    //     } else {
    //       db.set(`currentCounter-${message.channel.id}`, "1");
    //       db.set(message.channel.id, 1);
    //       message.react("❎");
    //       return message.reply({
    //         content: "Wrong number! Start from 1.",
    //         reply: true,
    //       });
    //     }
    //   } else {
    //     db.set(`currentCounter-${message.channel.id}`, "1");
    //     db.set(message.channel.id, 1);
    //     return message.reply({
    //       content: "You cannot talk here! Start from 1",
    //       reply: true,
    //     });
    //   }
    // } catch (e) {
    //   if (e) {
    //     console.log(e);
    //     return interaction.reply({ content: `Error: ${e}`, ephemeral: true });
    //   }
    // }
  },
};
