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

    await channel.guild.channels.fetch();
    const logChannel = channel.guild.channels.cache.find(
      (FChannel) => FChannel.name === "alien-logs"
    );

    if (!logChannel) return;

    await logChannel.send({ embeds: [embed] });
  },
};
