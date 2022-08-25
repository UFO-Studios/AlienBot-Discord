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
          { name: "sentence", value: "0" },
          { name: "paragraph", value: "1" }
        )
        .setRequired(true);
      return option;
    }),
  global: true,
  async execute(interaction, client) {
    try {
      const value = parseInt(interaction.options.getString("text"))

      const fns = [
        sentence,
        paragraph,
        article,
      ];
      const Text = await fns[value]();

      const randomNum = Math.floor(Math.random() * 100);
      const random = await Lucky(randomNum);

      const embed = new EmbedBuilder()
        .setTitle("Random generated text.")
        .setDescription(`${random} \n` + Text)
        .setColor("Blue")
        .setAuthor({name: interaction.user.tag})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({
          text: "/random-text-generator • AlienBot",
          iconURL:
            "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
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
