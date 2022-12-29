const { SlashCommandBuilder } = require("discord.js");
const { sentence, paragraph, article } = require("txtgen/dist/cjs/txtgen.js");
const { EmbedBuilder } = require("discord.js");

const Lucky = async (randomNum) => {
  if (randomNum == 69) {
    const randomN = Math.floor(Math.random() * 4);
    if (randomN == 1) {
      return "https://thealiendoctor.com is cool";
    } else if (randomN == 2) {
      return "Sub 2 Alien";
    } else if (randomN == 3) {
      return "Join the discord! https://discord.gg/dKaptM4Pgm";
    } else if (randomN == 4) {
      return "cool beanz™️";
    }
  } else {
    return "";
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-text-generator")
    .setDescription("Generate random text.")
    .addStringOption((option) => {
      option
        .setName("size")
        .setDescription("Text to generate")
        .addChoices(
          { name: "sentence", value: "sentence" },
          { name: "paragraph", value: "paragraph" },
          { name: "article", value: "article" }
        )
        .setRequired(true);
      return option;
    }),
  global: true,
  async execute(interaction, client) {
    try {
      const value = interaction.options.getString("size");

      const fns = {
        sentence,
        paragraph,
        article,
      };

      const Text = await fns[value]();
      let texT = Text;
      if (Text.length > 4096) {
        texT = Text.slice(0, 4090) + "...";
      }

      const randomNum = Math.floor(Math.random() * 100);
      const random = await Lucky(randomNum);

      const embed = new EmbedBuilder()
        .setTitle("Random generated text.")
        .setDescription(`${random} \n` + texT)
        .setColor("Blue")
        .setAuthor({ name: interaction.user.tag })
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({
          text: "/random-text-generator • AlienBot",
          iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
        });

      return interaction.reply({ embeds: [embed] });
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
