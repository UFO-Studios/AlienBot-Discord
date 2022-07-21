const BW = require("./b-w.json");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    try {
      const array = await message.content.split(" ");

      array.map((word) => {
        if (BW["BANNED-WORDS"].includes()) {
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
  },
};
