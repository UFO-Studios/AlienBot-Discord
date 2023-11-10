const {
  EmbedBuilder,
  WebhookClient,
  Channel,
  ChannelType,
} = require("discord.js");
const mongo = require("../mongodb");
const { consoleMessage } = require("../log");

module.exports = {
  name: "channelDelete",
  /**
   *
   * @param {Channel} channel
   */
  async execute(channel, client) {
    if (channel.type === ChannelType.DM || channel.type === ChannelType.GroupDM)
      return;

    const data = await mongo.checkIgnoredChannel(channel.guild.id, channel.id);
    if (data == false) return;

    const embed = new EmbedBuilder()
      .setTitle("Channel deletion")
      .setDescription(`A channel was deleted.\nchannel: #${channel.name}`)
      .setColor("Purple")
      .setTimestamp()
      .setFooter({
        text: "Channel Deletion • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    await channel.guild.channels.fetch();
    const logChannel = channel.guild.channels.cache.find(
      (FChannel) => FChannel.name === "alien-logs"
    );

    if (!logChannel) return;

    await logChannel.send({ embeds: [embed] });
  },
};

consoleMessage("events/channelDelete.js run", "botInit")