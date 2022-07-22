const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("bread")
    .setDescription("bread...?!?"),
  async execute(interaction, client) {
<<<<<<< HEAD
    const array = [":thumbsup:", "thumbsdown:"];
    const randomNum = Math.floor(Math.random() * 1);
    return interaction.reply(`Bread${array[randomNum]}`);
  },
=======
    const random = Math.random()
    if (random > 0.5){
    return interaction.reply("Bread :thumbsup:");
    } else {
      return interaction.reply("Bread :thumbsdown:");
      }
    },
>>>>>>> 03283481dcfc0cf7cef0873f035f6d83b10e6f9d
};

console.log("Bread.js run");
