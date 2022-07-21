const Config = require("../config.json");
const db = require("easy-db-json");
db.setFile("./b-w.json");
//ive gtg but the plan is to make a seperate local bannedwords db so users can remove/add it easier (w/ a command) ill work on this later but if anyone wants to try then feel free :D


module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    try {
      const array = await message.content.split(" ");

      array.map((word) => {
        if (Config["BANNED-WORDS"].includes(word)) {
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
