const db = require("easy-db-json");

db.setFile("./db.json");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    if (message.author.bot) return;
    try {
      const array = await message.content.split(" ");

      array.map((word) => {
        if (client.C.BANNED_WORDS.includes(word)) {
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
    try {
      const counts = db.get(message.channel.id);
      const channelId = db.get(`${message.channel.id}-id`);
      if (!counts) return;

      if (!channelId == message.channel.id) return;

      if (/\d/.test(message.content)) {
        if (message.content == counts) {
          if (
            !db.get(`currentCounter-${message.channel.id}`) == message.author.id
          ) {
            db.set(`currentCounter-${message.channel.id}`, message.author.id);
            db.set(message.channel.id, counts + 1);
            return message.react("☑️");
          } else {
            db.set(`currentCounter-${message.channel.id}`, "1");
            db.set(message.channel.id, 1);
            message.react("❎");
            return message.reply({
              content: "You cannot send 2 numbers in a row! Start from 1.",
            });
          }
        } else {
          db.set(`currentCounter-${message.channel.id}`, "1");
          db.set(message.channel.id, 1);
          message.react("❎");
          return message.reply({
            content: "Wrong number! Start from 1.",
            reply: true,
          });
        }
      } else {
        db.set(`currentCounter-${message.channel.id}`, "1");
        db.set(message.channel.id, 1);
        return message.reply({
          content: "You cannot talk here! Start from 1",
          reply: true,
        });
      }
    } catch (e) {
      if (e) {
        console.log(e);
        return interaction.reply({ content: `Error: ${e}`, ephemeral: true });
      }
    }
  },
};
