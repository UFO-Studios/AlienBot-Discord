const {
  GuildMember,
  Client,
  WebhookClient,
  AttachmentBuilder,
} = require("discord.js");
const Canvas = require("@napi-rs/canvas");

module.exports = {
  name: "guildMemberAdd",
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
    const canvas = Canvas.createCanvas(2560, 1440);
    const context = canvas.getContext("2d");
    const randomNum = Math.floor(Math.random() * client.images.length);
    const background = await Canvas.loadImage(client.images[randomNum]);
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ dynamic: true, size: 1024 })
    );

    context.drawImage(background, 0, 0);
    context.drawImage(avatar, 935, 100, 690, 690);

    context.font = "160px Verdana Bold";
    context.fillStyle = "yellow";
    context.textAlign = "center";
    context.fillText("Welcome", 1200, canvas.height / 1.5);

    context.fillStyle = "white";
    context.fillText(member.user.tag, 1024, canvas.height / 1.3);

    context.font = "140px Verdana Bold";
    context.fillStyle = "yellow";

    context.fillText(
      `Member #${member.guild.memberCount}`,
      1675,
      canvas.height / 1.1
    );

    const attachment = new AttachmentBuilder(await canvas.encode("png"), {
      name: "welcomePicture.png",
    });
    const webhook = new WebhookClient({
      url: "https://discord.com/api/webhooks/1006496263094681682/8fV25KtxnyfO2-U3tM38Mcx3-Fb04NbKnEBIfytxYzpSWm1Qrd0dkcZda3ABig6KoXHc",
    });
    webhook.send({ content: data.message, files: [attachment] });
  },
};
