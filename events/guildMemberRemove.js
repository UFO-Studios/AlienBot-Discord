const {
  GuildMember,
  Client,
  WebhookClient,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");
const Canvas = require("@napi-rs/canvas");

module.exports = {
  name: "guildMemberRemove",
  /**
   *
   * @param {GuildMember} member
   * @param {Client} client
   */
  async execute(member, client) {
    // Logs
    const embed = new EmbedBuilder()
      .setTitle("Member Leave")
      .setDescription(`Member left: ${member.displayName}`)
      .setAuthor({ name: member.user.tag })
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor("Purple")
      .setTimestamp()
      .setFooter({
        text: "Member leave • AlienBot",
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    await member.guild.channels.fetch();

    const channel = member.guild.channels.cache.find(
      (channel) => channel.name == "alien-logs"
    );

    if (channel) {
      await channel.send({ embeds: [embed] });
    }

    // Welcome image
    const data = await client.F.getData("welcome", member.guild.id);
    if (!data) {
      return;
    }

    const leaveRE = new RegExp("{username}", "g");
    const leaveRE2 = new RegExp("{memberCount}", "g");

    const str = data.leaveMessage.replace(leaveRE, member.displayName);
    const strULTIMATE = str.replace(leaveRE2, member.guild.memberCount);

    const applyText = (canvas, text, fontSize, font) => {
      const context = canvas.getContext("2d");

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

    context.font = applyText(canvas, "Goodbye!", 160, "open sans");
    context.fillStyle = "yellow";
    context.textAlign = "center";
    context.fillText("Goodbye!", 1275, canvas.height / 1.5);

    context.font = applyText(canvas, member.user.tag, 170, "open sans");
    context.fillStyle = "white";
    context.fillText(member.user.tag, 1275, canvas.height / 1.265);

    context.font = applyText(
      canvas,
      `Members left: ${member.guild.memberCount}`,
      140,
      "open sans"
    );
    context.fillStyle = "yellow";
    context.fillText(
      `Members left: ${member.guild.memberCount}`,
      1275,
      canvas.height / 1.1
    );

    context.drawImage(avatar, 935, 100, 690, 690);

    const attachment = new AttachmentBuilder(await canvas.encode("png"), {
      name: "leavePicture.png",
    });

    const webhook = new WebhookClient({ url: data.webhookUrl });
    await webhook.send({ content: strULTIMATE, files: [attachment] });
  },
};
