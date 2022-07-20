const { SlashCommandBuilder } = require("@discordjs/builders");
const mcapi = require("minecraft-lookup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("namemc")
    .setDescription("Lookup a minecraft player with their names.")
    .addStringOption((option) => {
      option
        .setName("username")
        .setDescription(
          "The username of the minecraft player you want to lookup."
        )
        .setRequired(true);
      return option;
    }),
  async execute(interaction, client) {
    const username = await interaction.options.getString("username");
    try {
      const skin = await mcapi.skin(username);
      const userInfo = await mcapi.user(username);
      const userHead = await mcapi.head(username);
      const history = await mcapi.nameHistory("username", username);
      const cape = await mcapi.ofCape(username);

      const starting = "Heres " + username + "'s info:  ";
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
      return interaction.reply(
        `${starting} \n ${usernameString} \n ${skinString} \n ${headString} \n ${capeString} \n ${usernameHistory}`
      );
    } catch (e) {
      if (e) {
        console.log(e);
        return interaction.reply({
          content: `There was an error with the command: ${e}`,
          ephemeral: true,
        });
      }
    }
  },
};
