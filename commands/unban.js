const {
  SlashCommandBuilder,
  PermissionsBitField,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const { consoleMessage } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user by giving their id.")
    .addStringOption((option) => {
      option
        .setName("user-id")
        .setDescription("The ID of a banned member to be unbanned.")
        .setRequired(true);
      return option;
    }),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @returns
   */
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return await interaction.reply({
        content:
          'You dont have the perms to unban a member. You need the "BanMembers" permission!',
      });

    const ID = interaction.options.getString("user-id");

    try {
      const guild = await client.guilds.fetch(interaction.guildId);

      const user = await guild.members.unban(ID);

      await interaction.reply({
        content: `${user.tag} has been unbanned from ${guild.name}!`,
      });
    } catch (e) {
      if (e) {
        if (e.code == 50013)
          return await interaction.reply({
            content:
              'I dont have the permissions to unban a member. I need the "BanMembers" permission!',
          });
        console.log(e);
        return interaction.reply({ content: "Invalid ID", ephemeral: true });
      }
    }
  },
};

consoleMessage("unban.js run", "botInit")