const {
  EmbedBuilder,
  GuildChannel,
  Client,
  WebhookClient,
} = require("discord.js");

module.exports = {
  name: "channelCreate",

  /**
   *
   * @param {GuildChannel} channel
   * @param {Client} client
   */
  async execute(channel, client) {
    const data = await client.F.getData("logging", channel.guildId);
    if (!data) return;

    const embed = new EmbedBuilder()
      .setTitle("Channel Creation")
      .setDescription(`A new channel was created.\nChannel: #${channel.name}`)
      .setColor("Purple")
      .setTimestamp()
      .setFooter({
        text: "Channel Created • AlienBot",
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
