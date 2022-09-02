const {
  EmbedBuilder,
  WebhookClient,
  Channel,
  ChannelType,
} = require("discord.js");

module.exports = {
  name: "channelDelete",
  /**
   *
   * @param {Channel} channel
   */
  async execute(channel, client) {
    if (channel.type === ChannelType.DM || channel.type === ChannelType.GroupDM)
      return;

    const data = await client.F.getData("logging", channel.guildId);
    if (!data) return;

    const embed = new EmbedBuilder()
      .setTitle("Channel deletion")
      .setDescription(`A channel was deleted.\nchannel: #${channel.name}`)
      .setColor("Purple")
      .setTimestamp()
      .setFooter({
        text: "Channel Deletion • AlienBot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

      const logChannel = client.channels.cache.find(
        (channel) => channel.name === "alien-logs"
      );
  
      if (!channel) return;
      
      logChannel.send({ embeds: [embed] });
  },
};
