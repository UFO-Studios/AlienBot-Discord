const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ufosmp")
    .setDescription("Info about the UFO SMP"),
  global: false,
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Blue")
      .setTitle("UFO SMP")
      .setDescription(
        "UFO SMP is a server run by Alien for members of The Alien Empire community! Want to join us? But you're  on bedrock? FEAR NOT! It runs GeyserMC for crossplay. Still want to join? Get to level 5 (`/rank`) and apply on the form in the info channel! :D"
      )
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "/ufosmp • Alienbot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });
    return await interaction.reply({ embeds: [embed] });
  },
};

console.log("ufosmp.js run");
