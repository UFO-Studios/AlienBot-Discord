const {
  EmbedBuilder,
  Channel,
  WebhookClient,
  Client,
  ChannelType,
} = require("discord.js");

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

    const { channels } = await client.F.getData(
      "ignore-channels",
      oldChannel.guildId
    );

    if (!channels.length > 1) {
      if (channels[0] == oldChannel.id) return;
    } else {
      // TODO: work on a better system to do this
      const array = channels.map((id) => {
        if (id == oldChannel.id) {
          return "true";
        } else {
          return "false";
        }
      });

      if (array.includes("true")) {
        return;
      }
    }

    const data = await client.F.getData("logging", oldChannel.guildId);
    if (!data) return;

    const webhook = new WebhookClient({ url: data.url });

    if (oldChannel.name !== NewChannel.name) {
      const embed = new EmbedBuilder()
        .setTitle("Channel Name Update")
        .setDescription(
          `Channel name update:\nBefore: \`\`\`${oldChannel.name}\`\`\`\nAfter: \`\`\`${NewChannel.name}\`\`\``
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
      if (
        oldChannel.id == 853344187378434068 ||
        oldChannel.id == 853344307015581726
      )
        return;

      const embed = new EmbedBuilder()
        .setTitle("Channel Topic Update")
        .setDescription(
          `Channel topic update:\nBefore: \`\`\`${oldChannel.topic}\`\`\`\nAfter: \`\`\`${NewChannel.topic}\`\`\``
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
