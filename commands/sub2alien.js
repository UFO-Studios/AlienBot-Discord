const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder, Interaction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sub2alien")
    .setDescription("Alien`s links!"),
  global: false,
  /**
   * @param {Interaction} interaction
   */
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Blue")
      .setTitle("The Alien Doctor")
      .setDescription(
        "Find Alien on all the good sites @TheAlienDoctor, Here's the main ones:"
      )
      .addFields(
        {
          name: "Youtube",
          value: "```https://www.youtube.com/c/TheAlienDoctor```",
          inline: true,
        },
        {
          name: "Twitter",
          value: "```https://twitter.com/thealiendoctor```",
          inline: true,
        },
        {
          name: "Twitch",
          value: "```https://twitch.tv/thealiendoctor_```",
          inline: true,
        },
        {
          name: "Instagram",
          value: "```https://www.instagram.com/thealiendoctor_/```",
          inline: true,
        },
        {
          name: "and his AWESOME website",
          value: "```https://thealiendcotor.com```",
          inline: true,
        }
      )
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "/sub2alien • Alienbot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    await interaction.reply({ embeds: [embed] });
  },
};
console.log("sub2alien.js run");
