const {
  GuildMember,
  Client,
  WebhookClient,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const mongo = require("../mongodb");
const { consoleMessage } = require("../log");

module.exports = {
  name: "guildMemberAdd",
  /**
   *
   * @param {GuildMember} member
   * @param {Client} client
   */
  async execute(member, client) {
    // Logs
    const embed = new EmbedBuilder()
      .setTitle("Member Join")
      .setDescription(`New member joined: ${member.displayName}`)
      .setAuthor({ name: member.displayName })
      .setThumbnail(member.avatarURL({ dynamic: true }))
      .setColor("Purple")
      .setTimestamp()
      .setFooter({
        text: "Member join • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    await member.guild.channels.fetch();

    const channel = member.guild.channels.cache.find(
      (channel) => channel.name == "alien-logs"
    );

    if (channel) {
      channel.send({ embeds: [embed] });
    }

    // Welcome image
    const data = await mongo.getWelcomeToggle(member.guild.id);

    console.log(data);
    if (!data.toggle) return;
    const welcomeRE = new RegExp("{username}", "gi");
    const welcomeRE2 = new RegExp("{memberCount}", "gi");

    const str = data.welcomeMsg.replace(welcomeRE, member.displayName);
    const strULTIMATE = str.replace(welcomeRE2, member.guild.memberCount);

    const applyText = (canvas, text, fontSize, font) => {
      const context = canvas.getContext("2d");

      fontSize += 10;

      do {
        context.font = `${(fontSize -= 10)}px ${font}`;
      } while (context.measureText(text).width > canvas.width - 300);

      return context.font;
    };

    const canvas = Canvas.createCanvas(2560, 1440);
    const context = canvas.getContext("2d");
    const randomNum = Math.floor(Math.random() * client.images.length);
    const background = await Canvas.loadImage(client.images[randomNum]);
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ dynamic: true, size: 1024 })
    );

    context.drawImage(background, 0, 0);

    context.font = applyText(canvas, "Welcome!", 160, "open sans");
    context.fillStyle = "yellow";
    context.textAlign = "center";
    context.fillText("Welcome!", 1275, canvas.height / 1.5);

    context.font = applyText(canvas, member.user.tag, 170, "open sans");
    context.fillStyle = "white";
    context.fillText(member.user.tag, 1275, canvas.height / 1.265);

    context.font = applyText(
      canvas,
      `Member #${member.guild.memberCount}`,
      140,
      "open sans"
    );
    context.fillStyle = "yellow";
    context.fillText(
      `Member #${member.guild.memberCount}`,
      1275,
      canvas.height / 1.1
    );

    context.drawImage(avatar, 935, 100, 690, 690);

    //webhook
    const attachment = new AttachmentBuilder(await canvas.encode("png"), {
      name: "welcomePicture.png",
    });

    const webhook = new WebhookClient({
      url: data.webhookUrl,
    });

    webhook.send({ content: strULTIMATE, files: [attachment] });
  },
};

consoleMessage("events/guildMemberAdd.js run", "botInit")