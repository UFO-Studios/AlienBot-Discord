const {
  EmbedBuilder,
  Channel,
  WebhookClient,
  Client,
  ChannelType,
} = require("discord.js");
const mongo = require("../mongodb.js");

module.exports = {
  name: "channelUpdate",
  /**
   * @param {Channel} oldChannel
   * @param {Channel} NewChannel
   * @param {Client} client
   */
  async execute(oldChannel, NewChannel, client) {
    if (
      oldChannel.type === ChannelType.GroupDM ||
      oldChannel.type === ChannelType.DM
    ) {
      return;
    }

    if (
      !(await mongo.checkIgnoredChannel(oldChannel.guild.id, oldChannel.id))
    ) {
      return;
    }

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
          iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
        });
      const channel = client.channels.cache.find(
        (channel) => channel.name === "alien-logs"
      );

      if (!channel) return;

      channel.send({ embeds: [embed] });
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
          iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
        });

      await oldChannel.guild.channels.fetch();
      const channel = oldChannel.guild.channels.cache.find(
        (channel) => channel.name === "alien-logs"
        );

        await mongo.addLoggingChannel(oldChannel.guild.id, channel.id);
        console.log(oldChannel.guild.id, channel.id + "for test")

      if (!channel) return;

      channel.send({ embeds: [embed] });
    }
  },
};
