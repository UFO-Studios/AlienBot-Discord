const { SlashCommandBuilder } = require("discord.js");
const mcapi = require("minecraft-lookup");
const { EmbedBuilder } = require("discord.js");

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

      const starting = userInfo ? "Heres " + userInfo.name + "'s info:  " : "";
      const usernameString = userInfo
        ? "username: " + userInfo.name + ", "
        : "";
      const skinString = skin ? "skin: " + skin.view + "," : "";
      // pro refactoring
      // if (skin) {
      //   skinString = "skin: " + skin.view + ",";
      // } else {
      //   skinString = "";
      // }
      const headString = userHead ? "head: " + userHead.helmavatar + "," : "";
      const capeString = cape ? "cape: " + cape + "," : "";

      const getNames = () => {
        return history.map((object) => object.name);
      };

      const usernameHistory =
        history.length > 1
          ? "username history: " + getNames()
          : "username history: " + history[0].name;

      const embed = new EmbedBuilder()
        .setTitle(starting)
        .setDescription(
          `${usernameString} \n ${skinString} \n ${headString} \n ${capeString} \n ${usernameHistory}`
        )
        .setColor("Blue")
        .setThumbnail(userHead.helmavatar)
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
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
