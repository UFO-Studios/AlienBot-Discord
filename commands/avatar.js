const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pfp")
    .setDescription("Get the profile picture of a member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The target to show the pfp of")
        .setRequired(true)
    ),
  global: true,
  async execute(interaction) {
    const user = await interaction.options.getUser("target");

    const embed = new EmbedBuilder()
      .setAuthor({name: interaction.user.tag})
      .setColor("Blue")
      .setTitle("Profile Picture")
      .setDescription(`Heres the profile picture of the \`${user.tag}\`:`)
      .setImage(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({ text: "/pfp • AlienBot" });

    return await interaction.reply({ embeds: [embed] });
  },
};
console.log("avatar.js run");
