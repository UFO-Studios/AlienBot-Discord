// const db = require("easy-db-json");
// db.setFile("./db.json");
const { ChannelType, Message, Client } = require("discord.js");
const convertor = require("number-to-words");
const emojiFromText = require("emoji-from-text");
const edb = require("easy-db-json");
edb.setFile("./db/level.json")

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
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    const pointGain = Math.random();
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
    const data = client.F.getData("banned-words", message.guild.id);
    if (!data) return;
    if (data.toggleValue == "off") return;
    // levling code

    const levelServer = message.guild.id
    const msgAuthor = message.author.id
       const lvlOld =  client.F.getData("level", msgAuthor);  //edb.get(msgAuthor)
       console.log(lvlOld, "old");
       const lvlGain = Math.trunc(Math.random() * 10);
       const lvlNew = lvlOld + lvlGain;
       console.log(lvlNew)
       client.F.addData("level", msgAuthor, {"lvl": lvlNew}) //edb.set(msgAuthor, lvlNew)
        //client.F.addData("level", levelServer, {messageSender: lvlNew})
    try {
      const data = client.F.getData("banned-woreds", message.guildId);
      if (!data) return;
      if (data.toggleValue == "on") {
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
      } else {
        return;
      }
    } catch (e) {
      if (e) {
        console.log(e);
      }
    }
  },
};
