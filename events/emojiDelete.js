const {
  GuildEmoji,
  Client,
  WebhookClient,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "emojiDelete",
  /**
   *
   * @param {GuildEmoji} emoji
   * @param {Client} client
   */
  async execute(emoji, client) {
    const embed = new EmbedBuilder()
      .setTitle("Emoji Deletion")
      .setDescription(`A emoji was deleted:\nemoji: :${emoji.name}:`)
      .setColor("Purple")
      .setTimestamp()
      .setFooter({
        text: "Emoji Deletion • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    await emoji.guild.channels.fetch();
    const channel = emoji.guild.channels.cache.find(
      (channel) => channel.name == "alien-logs"
    );

    if (!channel) return;

    channel.send({ embeds: [embed] });
  },
};
