const { Message, EmbedBuilder, Client } = require("discord.js");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
  name: "messageUpdate",
  once: false,
  /**
   * Handles the message update event.
   * @param {Message} oldMessage The original message before the update.
   * @param {Message} newMessage The updated message.
   * @param {Client} client The Discord client.
   */
  async execute(oldMessage, newMessage, client) {
    // Ignore bot messages, unchanged content, and messages from a specific channel
    if (oldMessage.author.bot || oldMessage.content === newMessage.content || oldMessage.channelId === "853344307015581726") {
      return;
    }

    // Truncate content to fit within embed limits
    const maxContentLength = 1950;
    const truncateContent = (content) => content.slice(0, maxContentLength) + (content.length > maxContentLength ? " ..." : "");

    const originalContent = truncateContent(oldMessage.content);
    const editedContent = truncateContent(newMessage.content);

    // Construct the embed message
    const embed = new EmbedBuilder()
      .setTitle(`${oldMessage.author.tag} edited a message in #${oldMessage.channel.name}`)
      .setDescription(`Before: \`\`\`${originalContent}\`\`\` \nAfter: \`\`\`${editedContent}\`\`\``)
      .setAuthor({ name: oldMessage.author.tag, iconURL: oldMessage.author.displayAvatarURL({ dynamic: true }) })
      .setColor("Purple")
      .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({ text: "Message Edited • AlienBot", iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png" });

    // Ensure both messages and the guild are defined
    if (!oldMessage || !newMessage || !oldMessage.guild) {
      //consoleMessage("A message or the guild is undefined.", "error");
      return;
    }

    // Attempt to send the embed to the "alien-logs" channel
    try {
      const logChannel = oldMessage.guild.channels.cache.find(channel => channel.name === "alien-logs");
      if (!logChannel) {
        console.log("Log channel not found.");
        return;
      }
      await logChannel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  },
};