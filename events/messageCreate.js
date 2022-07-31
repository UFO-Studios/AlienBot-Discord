// const db = require("easy-db-json");
// db.setFile("./db.json");
const { ChannelType, Message, Client, EmbedBuilder } = require("discord.js");
const convertor = require("number-to-words");
const emojiFromText = require("emoji-from-text");

/**
 *
 * @param {Message} msg
 * @param {Number} times
 */
const react = async (msg, times) => {
  let num = 0;
  while (times + 1 > num) {
    num += 1;
    const numWord = convertor.toWords(num);
    console.log(numWord);
    const emoji = emojiFromText(numWord)[0].match.emoji.char;
    console.log(emoji);
    await msg.react(emoji);
  }
};

module.exports = {
  name: "messageCreate",
  once: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    if (message.author.bot) return;
    // if (message.channel.type === ChannelType.DM) {
    //   await client.guilds.fetch();
    //   const guildsIn = [];
    //   for (let guild of [...client.guilds.cache.values()]) {
    //     try {
    //       await guild.members.fetch(message.author.id);
    //       guildsIn.push(guild);
    //     } catch (error) {
    //       if (error) {
    //         console.log(error);
    //         return message.author.send({ content: `Error! ${error}` });
    //       }
    //     }
    //   }

    //   if (guildsIn.length == 0) {
    //     await message.author("You are not in any server that have me in them!");
    //   } else if (guildsIn.length == 1) {
    //     const data = client.F.getData("mail", message.guildId);
    //     if (!data)
    //       return await message.author.send({
    //         content: `The modmail feature isnt turned on in ${guildsIn[0].name}`,
    //       });
    //     message.author.send({ content: "you are in 1 server that have me" });
    //     // client.StartSupport(
    //     //   message.content,
    //     //   message.author,
    //     //   guildsIn[0],
    //     //   data.url,
    //     //   client
    //     // );
    //   } else {
    //     const embedFields = guildsIn.map((g) => {
    //       return { name: g.name, value: `ID: ${g.id}`, inline: true };
    //     });

    //     const embed = new EmbedBuilder()
    //       .setTitle("servers")
    //       .setDescription("Select a server you want to contact mods of.")
    //       .addFields(embedFields)
    //       .setTimestamp()
    //       .setFooter({ text: "Select a server!" });

    //     const msg = await message.author
    //       .send({ embeds: [embed] })
    //       .then((m) => m);
    //     react(msg, guildsIn.length - 1);
    //   }
    // } else {
    // banned words
    try {
      const data = client.F.getData("banned-woreds", message.guildId);
      if (!data) return;
      if (data.toggleValue == "off") return;

      const array = message.content.split(" ");

      array.map((word) => {
        if (client.BANNED_WORDS.includes(word.toLowerCase())) {
          message.reply({
            content: "You cannot use that word!",
            reply: true,
          });
          setTimeout(() => {
            message.delete();
          }, 1000);
        }
      });
    } catch (e) {
      if (e) {
        console.log(e);
      }
    }

    // counting
    // try {
    //   const counts = db.get(message.channel.id);
    //   const channelId = db.get(`${message.channel.id}-id`);
    //   if (!counts) return;

    //   if (!channelId == message.channel.id) return;
    //   const currentCounter = db.get(`currentCounter-${message.channel.id}`);

    //   if (!currentCounter) {
    //     db.set(`currentCounter-${message.channel.id}`, message.author.id);
    //   } else if (
    //     currentCounter == message.author.id &&
    //     message.channel.id == channelId
    //   ) {
    //     return interaction.reply("You cannot send 2 messages in a row!")
    //   }

    //   if (/\d/.test(message.content)) {
    //     if (message.content == counts) {
    //       db.set(message.channel.id, counts + 1);
    //       return message.react("☑️");
    //     } else {
    //       db.set(`currentCounter-${message.channel.id}`, "1");
    //       db.set(message.channel.id, 1);
    //       message.react("❎");
    //       return message.reply({
    //         content: "Wrong number! Start from 1.",
    //         reply: true,
    //       });
    //     }
    //   } else {
    //     db.set(`currentCounter-${message.channel.id}`, "1");
    //     db.set(message.channel.id, 1);
    //     return message.reply({
    //       content: "You cannot talk here! Start from 1",
    //       reply: true,
    //     });
    //   }
    // } catch (e) {
    //   if (e) {
    //     console.log(e);
    //     return interaction.reply({ content: `Error: ${e}`, ephemeral: true });
    //   }
    // }
    // }
  },
};
