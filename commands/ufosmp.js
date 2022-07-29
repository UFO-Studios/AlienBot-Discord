const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder, Interaction, Client } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ufosmp")
    .setDescription("Info about the UFO SMP"),
  global: false,
  /**
   *
   * @param {Interaction} interaction
   * @param {Client} client
   * @returns
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag })
      .setColor("Blue")
      .setTitle("UFO SMP")
      .setDescription(
        "UFO SMP Season 1 Information\nJava edition IP: ufosmp.TheAlienDoctor.com:26061\nBedrock IP: ufosmp.TheAlienDoctor.com\nBedrock Port: 26061\nBedrock players will automatically have a . at the start of there name, so you know its a bedrock player and so we don't get Bedrock and Java players having the same username\n\nRequirements to join and play on the server\n1) Be 13 or over\n2) Be on this Discord server, so you can get announcements and be able to 🎫open-a-ticket for support. Being able to VC is not a requirement.\n3) Be level 5 or over, to gain levels simply chat in the Discord server!\nFor applying run `/ufosmp-apply` command or fill out the form here: https://thealiendoctor.com/UFO-SMP/apply - Please remember UFO SMP is a fan server, for people intersted in the content I make. If you are only here to be able to play on the server, then its probably not the right server for you.\n\nGraves\nThe server has a graves plugin, so when you die your stuff will be placed safely inside a grave. It will also save all of your levels. You can also teleport to your grave (if you don't like this then don't use it...) by using the command /graves. After 30 minutes your grave can be opened by anyone, and after an hour the grave will despawn. Graves will also spawn a zombie once you loot them.\n\nPlugins and Datapacks\nList of plugins: https://thealiendoctor.com/UFO-SMP/plugins\nDatapacks: Vanilla tweaks: https://vanillatweaks.net/share#b33KRn\nVanilla tweaks crafting tweaks: https://vanillatweaks.net/share#KidAbk\nBlaze and Cave's advancement pack: https://www.planetminecraft.com/data-pack/blazeandcave-s-advancements-pack-1-12/"
      )
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "/ufosmp • Alienbot",
        iconURL:
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
      });
    return await interaction.reply({ embeds: [embed] });
  },
};

console.log("ufosmp.js run");
