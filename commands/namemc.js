const { SlashCommandBuilder } = require("@discordjs/builders");
const mcapi = require("minecraft-lookup");
const { MessageEmbed } = require("discord.js");

  module.exports = {
  data: new SlashCommandBuilder()
    .setName("namemc")
    .setDescription("Lookup a minecraft player with their names.")
    .addStringOption((option) => {
      option
        .setName("username")
        .setDescription(
          "The username of the minecraft player you want to lookup. note: This DOES NOT support bedrock."
        )
        .setRequired(true);
      return option;
    }),
  global: true,
  async execute(interaction, client) {
    await interaction.deferReply();
    const username = await interaction.options.getString("username");
    try {
      const skin = await mcapi.skin(username);
      const userInfo = await mcapi.user(username);
      const userHead = await mcapi.head(username);
      const history = await mcapi.nameHistory("username", username);
      const cape = await mcapi.ofCape(username);

      const starting = "Heres " + userInfo.name + "'s info:  ";
      const usernameString = "username: " + userInfo.name + ", ";
      let skinString;
      if (skin) {
        skinString = "skin: " + skin.view + ",";
      } else {
        skinString = "";
      }
      const headString = "head: " + userHead.helmavatar + ",";
      const capeString = "cape: " + cape + ",";
      const getNames = () => {
        return history.map((object) => object.name);
      };
      let usernameHistory;
      if (history.length > 1) {
        usernameHistory = "username history: " + getNames();
      } else {
        usernameHistory = "username history: " + history[0].name;
      }

      const embed = new MessageEmbed()
        .setTitle(starting)
        .setDescription(
          `${usernameString} \n ${skinString} \n ${headString} \n ${capeString} \n ${usernameHistory}`
        )
        .setColor("RANDOM")
        .setThumbnail(userHead.helmavatar)
        .setAuthor(interaction.user.tag)
        .setTimestamp()
        .setFooter({
          text: "/namemc • AlienBot",
          iconURL: 
            "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
        });

      console.log(
        starting,
        "\n",
        usernameString,
        "\n",
        skinString,
        "\n",
        headString,
        "\n",
        capeString,
        "\n",
        usernameHistory
      );
      return interaction.editReply({ embeds: [embed] });
    } catch (e) {
      if (e) {
        console.log(e);
        return interaction.editReply({
          content: `You cannot search info of bedrock players!`,
          ephemeral: true,
        });
      }
    }
  },
};
