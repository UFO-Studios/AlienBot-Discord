const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your bank balance!"),

  async execute(interaction, client) {
    const economy = await client.M.getEconomy(interaction.user.id);
    const balance = economy ? economy.balance : 0;

    const embed = new EmbedBuilder()
      .setTitle("Bank Balance")
      .setDescription(`You have $${balance}.\nuse \`/fly\` to earn some more!`)
      .setColor("Black")
      .setAuthor({ name: interaction.user.tag })
      .setFooter({
        text: `/balance • AlienBot`,
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.reply({
      embeds: [embed],
    });
  },
};

console.log("economy-balance.js run");
