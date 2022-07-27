const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Interaction, Client } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  global: true,
  /**
   *
   * @param {Interaction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const embed = new MessageEmbed()
      .setAuthor({ name: interaction.user.tag })
      .setColor("BLUE")
      .setTitle("Ping.")
      .setDescription(`🏓 | Ping is \`${client.ws.ping}\` ms.`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "/ping • Alienbot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });
    return await interaction.reply({ embeds: [embed] });
  },
};
console.log("ping.js run");
