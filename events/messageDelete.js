const { Message, EmbedBuilder, WebhookClient } = require("discord.js");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
  name: "messageDelete",
  once: false,
  // intelliSense
  /**
   * @param {Message} message
   */
  async execute(message, client) {
    //checks
    if (message.author.bot) return;

    const embed = new EmbedBuilder()
      .setTitle(`${message.author.tag} deleted a message in #${message.channel.name}`)
      .setDescription(`Message Content: \`\`\`${message.content}\`\`\``)
      .setAuthor({ name: message.author.tag })
      .setColor("Purple")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Message Edited • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    await message.guild.channels.fetch();
    if (message == undefined) return;
    try {
      return await message.guild.channels.cache.find((channel) => channel.name == "alien-logs").send({ embeds: [embed] });
    } catch (error) {
      // console.log(error);
    }
  },
};

//consoleMessage("events/MessageDelete.js run", "botInit");
