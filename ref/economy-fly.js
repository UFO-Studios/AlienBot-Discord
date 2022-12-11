const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const color = "Black";

/**
 * @param {Number} num1
 * @param {Number} num2
 */
const generateRandom = async (min, max) => {
  return (await Math.floor(Math.random() * (max - Number(min)))) + Number(min);
};

/**
 * @param {Number} num
 * @returns {String}
 */
const earnMessage = async (num) => {
  const randomArray = [
    "so cool!",
    "so awesome!",
    "so nice!",
    "a spaceship!",
    "bravely",
    "skillfully",
  ];
  const randomNum = await Math.floor(Math.random() * randomArray.length);
  return `You earned $${num} for flying ${randomArray[randomNum]}.`;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fly")
    .setDescription("Fly to the outer space and maybe even earn money!"),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const num = await generateRandom(1, 10000);

    const id = interaction.user.id;
    const previousEconomy = await client.M.getEconomy(id);

    const previousBalance = previousEconomy ? previousEconomy.balance : 0;
    const newBalance = num + previousBalance;

    await client.M.saveEconomy(id, newBalance);

    const embed = new EmbedBuilder()
      .setTitle("Fly")
      .setDescription(`${await earnMessage(num)}\nYou now have $${newBalance}!`)
      .setColor(color)
      .setAuthor({ name: interaction.user.tag })
      .setFooter({
        text: `/fly • AlienBot`,
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.reply({
      embeds: [embed],
    });
  },
};

console.log("economy-fly.js run");
