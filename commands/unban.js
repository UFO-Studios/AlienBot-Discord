const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

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
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return await interaction.reply({
        content:
          'You dont have the perms to unban a member. You need the "BanMembers" permission!',
      });

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
        if (e.code == 50013)
          return await interaction.reply({
            content:
              'I dont have th permissions to unban a member. I need the "BanMembers" permission!',
          });
        console.log(e);
        return interaction.reply({ content: "Invalid ID", ephemeral: true });
      }
    }
  },
};
