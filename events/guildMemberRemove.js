const {
  GuildMember,
  Client,
  WebhookClient,
  AttachmentBuilder,
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
    const data = await client.F.getData("welcome", member.guild.id);
    if (!data) {
      return;
    }

    await data.leaveMessage.replace(/{username}/g, member.user.tag);
    await data.leaveMessage.replace(/{memberCount}/g, member.guild.memberCount);

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

    context.font = applyText(canvas, "Bye!", 160, "sans-serif");
    context.fillStyle = "yellow";
    context.textAlign = "center";
    context.fillText("Welcome!", 1275, canvas.height / 1.5);

    context.font = applyText(canvas, member.user.tag, 170, "sans-serif");
    context.fillStyle = "white";
    context.fillText(member.user.tag, 1275, canvas.height / 1.25);

    context.font = applyText(
      canvas,
      `Member #${member.guild.memberCount}`,
      140,
      "sans-serif"
    );
    context.fillStyle = "yellow";
    context.fillText(
      `Member #${member.guild.memberCount}`,
      1275,
      canvas.height / 1.1
    );

    context.drawImage(avatar, 935, 100, 690, 690);

    const attachment = new AttachmentBuilder(await canvas.encode("png"), {
      name: "leavePicture.png",
    });

    const webhook = new WebhookClient({
      url: data.webhookUrl,
    });

    webhook.send({ content: data.message, files: [attachment] });
  },
};
