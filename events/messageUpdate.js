const { Message, EmbedBuilder, WebhookClient } = require("discord.js");

module.exports = {
  name: "messageUpdate",
  once: false,
  // intelliSense
  /**
   * @param {Message} oldMessage
   *  @param {Message} newMessage
   */
  async execute(oldMessage, newMessage, client) {
    const data = await client.F.getData("logging", oldMessage.guildId);

    if (!data) return;
    //checks
    if (oldMessage.author.bot) return;
    if (oldMessage.content == newMessage.content) return;

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
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    const webHook = new WebhookClient({ id: data.id, token: data.token });

    webHook.send({ embeds: [embed] });
  },
};
