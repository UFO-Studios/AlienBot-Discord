const { convertSVGTextToPath } = require("@napi-rs/canvas");
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const mongo = require("../mongodb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Get your XP!")
    .addUserOption((o) =>
      o.setName("target").setDescription("User to check rank of")
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const target = interaction.options.getUser("target") || interaction.user;
    if (target.bot)
      return await interaction.reply("You cannot check XP of a bot!");

      const authorID = interaction.member.id
      const data = await mongo.getXP(authorID)
    console.log(authorID + " is the id of the user, the data is " + data);

    if (!data.level[target.id])
      return await interaction.reply({ content: "You dont have any XP!" });

    const embed = new EmbedBuilder()
      .setAuthor({ name: target.tag })
      .setThumbnail(target.displayAvatarURL({ dynamic: true }))
      .setTitle("Rank")
      .setDescription(`${target.tag}'s XP is: ${data.level[target.id]}`)
      .setColor("Blue")
      .setTimestamp()
      .setFooter({
        text: "/rank • AlienBot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });

    return await interaction.reply({ embeds: [embed] });
  },
};

console.log("rank.js run");
