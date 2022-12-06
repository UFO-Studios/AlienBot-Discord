const {
  EmbedBuilder,
  GuildChannel,
  Client
} = require("discord.js");
const mongo = require("../mongodb.js")

module.exports = {
  name: "channelCreate",

  /**
   *
   * @param {GuildChannel} channel
   * @param {Client} client
   */
  async execute(channel, client) {
      const data = await mongo.checkIgnoredChannel(channel.guild.id, channel.id);
    if (data == false) return;

    const embed = new EmbedBuilder()
      .setTitle("Channel Creation")
      .setDescription(`A new channel was created.\nChannel: #${channel.name}`)
      .setColor("Purple")
      .setTimestamp()
      .setFooter({
        text: "Channel Created • AlienBot",
        iconURL:
          "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    await channel.guild.channels.fetch();
    const logChannel = channel.guild.channels.cache.find(
      (FChannel) => FChannel.name === "alien-logs"
    );

    if (!logChannel) return;

    await logChannel.send({ embeds: [embed] });
  },
};
