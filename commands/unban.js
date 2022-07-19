const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user by giving their id.")
    .addStringOption((option) => {
      option
        .setName("id")
        .setDescription("The ID of a banned member to be unbanned.")
        .setRequired(true);
      return option;
    }),
  async execute(interaction, client) {
    const ID = interaction.options.getString("id");

    try {
      const guild = await client.guilds.cache.get(interaction.guild.id);
      guild.members
        .unban(ID)
        .then((user) => {
          interaction.reply(`Unbanned ${user.username} from ${guild.name}`);
          console.log(`Unbanned ${user.username} from ${guild.name}`);
        })
        .catch((e) => {
          if (e) console.log(e);
        });
    } catch (e) {
      if (e) {
        console.log(e);
        return interaction.reply({ content: "Invalid ID", ephemeral: true });
      }
    }
  },
};
