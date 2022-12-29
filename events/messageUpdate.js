const { Message, EmbedBuilder, Client } = require("discord.js");

module.exports = {
  name: "messageUpdate",
  once: false,
  // intelliSense
  /**
   * @param {Message} oldMessage
   * @param {Message} newMessage
   * @param {Client} client
   */
  async execute(oldMessage, newMessage, client) {
    const data = await client.F.getData("logging", oldMessage.guildId);

    if (!data) return;
    //checks
    if (oldMessage.author.bot) return;
    if (oldMessage.content == newMessage.content) return;
    if (oldMessage.channelId == 853344307015581726) return;

    const count = 1950; // because of embed description size

    const original =
      oldMessage.content.slice(0, count) +
      (oldMessage.content.length > count ? " ..." : "");

    const edited =
      newMessage.content.slice(0, count) +
      (newMessage.content.length > count ? " ..." : "");

    const embed = new EmbedBuilder()
      .setTitle(
        `${oldMessage.author.tag} edited a message in #${oldMessage.channel.name}`
      )
      .setDescription(
        `Before: \`\`\`${original}\`\`\` \nAfter: \`\`\`${edited}\`\`\``
      )
      .setAuthor({ name: oldMessage.author.tag })
      .setColor("Purple")
      .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Message Edited • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    await oldMessage.guild.channels.fetch();
    const channel = oldMessage.guild.channels.cache.find(
      (channel) => channel.name == "alien-logs"
    );

    if (!channel) return;

    await channel.send({ embeds: [embed] });
  },
};
