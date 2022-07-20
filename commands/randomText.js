const { SlashCommandBuilder } = require("@discordjs/builders");
const { sentence, paragraph, article } = require("txtgen/dist/cjs/txtgen.js");
const { splitMessage } = require("discord.js/Utils");

const getTextArray = async (Text) => {
  if (Text.length > 2000) {
    return Text.split("/(?<=^(?:.{2000})+)(?!$)/g");
  }
};

const Lucky = (randomNum) => {
  if (randomNum == 69) {
    const randomN = Math.floor(Math.random() * 4);
    switch (randomN) {
      case 1:
        return "https://thealiendoctor.com/ is cool";
      case 2:
        return "Sub 2 Alien";
      case 3:
        return "join the discord! https://discord.gg/dKaptM4Pgm";
      case 4:
        return "cool beanz™️";
    }
  } else {
    return "";
  }
};

// const articles = async (Text, interaction) => {
//   const randomNum = Math.floor(Math.random() * 100);
//   if (Text.length > 2000) {
//     const array = await Text.match("/.{1,3}/g");
//     console.log(array);
//     await interaction.channel.send(
//       `Heres the generated text: \n ${Lucky(randomNum)} \n`
//     );
//     await array.map((text) => {
//       interaction.channel.send(text);
//     });
//     return;
//   } else {
//     interaction.reply(
//       `Heres the generated text: \n ${Lucky(randomNum)} \n ${Text}`
//     );
//   }
// };

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-text-generator")
    .setDescription("Generate random text.")
    .addStringOption((option) => {
      option
        .setName("text")
        .setDescription("Text to generate")
        .addChoices(
          { name: "sentence", value: "sentence" },
          { name: "paragraph", value: "paragraph" },
          { name: "article", value: "article" }
        )
        .setRequired(true);
      return option;
    }),
  async execute(interaction, client) {
    try {
      const value = await interaction.options.getString("text");

      const fn = {
        sentence,
        paragraph,
        article,
      };
      const Text = await fn[value]();

      const randomNum = Math.floor(Math.random() * 100);
      const random = Lucky(randomNum);

      return interaction.channel.send(
        `Heres the generated text: \n  ${random} \n ${Text}`,
        { split: true }
      );
    } catch (e) {
      if (e) {
        console.log(e);
        return interaction.reply({
          content: `Error while executing this command: ${e.code}`,
          ephemeral: true,
        });
      }
    }
  },
};
