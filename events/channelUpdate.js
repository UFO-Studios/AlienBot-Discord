const { Channel, WebhookClient, Client, ChannelType } = require("discord.js");

module.exports = {
  name: "channelUpdate",
  /**
   *
   * @param {Channel} oldChannel
   * @param {Channel} NewChannel
   * @param {Client} client
   */
  async execute(oldChannel, NewChannel, client) {
    if (
      oldChannel.type === ChannelType.GroupDM ||
      oldChannel.type === ChannelType.DM
    )
      return;

    const data = await client.F.getData("logging", oldChannel.guildId);
    if (!data) return;

    const webhook = new WebhookClient({ url: data.url });

    if (oldChannel.name !== NewChannel.name) {
      const embed = new EmbedBuilder()
        .setTitle("Channel Name Update")
        .setDescription(
          `Channel name update:\nBefore: \`${oldChannel.name}\`\nAfter: \`${NewChannel.name}\``
        )
        .setColor("Purple")
        .setTimestamp()
        .setFooter({
          text: "Channel Update • AlienBot",
          iconURL:
            "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
        });
      webhook.send({ embeds: [embed] });
    } else if (oldChannel.topic !== NewChannel.topic) {
      const embed = new EmbedBuilder()
        .setTitle("Channel Topic Update")
        .setDescription(
          `Channel topic update:\nBefore: \`${oldChannel.topic}\`\nAfter: \`${NewChannel.topic}\``
        )
        .setColor("Purple")
        .setTimestamp()
        .setFooter({
          text: "Channel Update • AlienBot",
          iconURL:
            "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
        });
      webhook.send({ embeds: [embed] });
    }
  },
};
