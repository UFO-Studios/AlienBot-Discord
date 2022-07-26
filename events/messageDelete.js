const { Message, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
  name: "messageDelete",
  once: false,
  // intelliSense
  /**
   * @param {Message} message
   */
  async execute(message, client) {
    const data = await client.F.getData("logging", message.guildId);

    if (!data) return;

    //checks
    if (message.author.bot) return;

    const embed = new MessageEmbed()
      .setTitle(
        `${message.author.tag} deleted a message in #${message.channel.name}`
      )
      .setDescription(
        `Message Content: \`\`\`${message.content}\`\`\``
      )
      .setAuthor({ name: message.author.tag })
      .setColor("fcdf03")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
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
