const {
  GuildEmoji,
  Client,
  WebhookClient,
  EmbedBuilder,
} = require("discord.js");
const { consoleMessage } = require("../log");

export default {
  name: "emojiCreate",
  /**
   *
   * @param {GuildEmoji} emoji
   * @param {Client} client
   */
  async execute(emoji, client) {
    const embed = new EmbedBuilder()
      .setTitle("Emoji Creation")
      .setDescription(`A new emoji was created: :${emoji.name}:`)
      .setColor("Purple")
      .setTimestamp()
      .setFooter({
        text: "Emoji Creation • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });
    await emoji.guild.channels.fetch();
    const channel = emoji.guild.channels.cache.find(
      (channel) => channel.name === "alien-logs"
    );

    if (!channel) return;

    channel.send({ embeds: [embed] });
  },
};

consoleMessage("events/emojiCreate.js run", "botInit")