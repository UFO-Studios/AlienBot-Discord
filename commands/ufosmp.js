const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ufosmp")
    .setDescription("Info about the UFO SMP"),
  global: true,
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setAuthor(interaction.user.tag)
      .setColor("RANDOM")
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
