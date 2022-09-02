const {
  GuildEmoji,
  Client,
  WebhookClient,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "emojiDelete",
  async execute(emoji, client) {
    const data = await client.F.getData("logging", emoji.guild.id)
    if(!data) return

    const embed = new EmbedBuilder()
      .setTitle("Emoji Deletion")
      .setDescription(`A emoji was deleted:\nemoji: :${emoji.name}:`)
      .setColor("Purple")
      .setTimestamp()
      .setFooter({
        text: "Emoji Deletion • AlienBot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

      const channel = client.channels.cache.find(
        (channel) => channel.name === "alien-logs"
      );
  
      if (!channel) return;
      
      channel.send({ embeds: [embed] });
  },
};
