const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ignore-channel")
    .setDescription(
      "ignores this channel for log updates, note: this does not ignore msg updates from this channel"
    )
    .addChannelOption((option) =>
      option.setName("channel").setDescription("the channel to be ignored")
    ),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
    )
      return await interaction.reply({
        content: "You dont have the permissions to set ignore a channel. You need the \"ManageGuild\" permission!",
      });
    const channel = interaction.options.getChannel("channel");

    await interaction.deferReply();
    const data = await client.F.getData("ignore-channels", channel.guildId);
    if (!data) {
      await client.F.addData("ignore-channels", channel.guildId, {
        channels: [channel.id],
      });
    } else {
      await data.channels.push(channel.id);
      const channels = [...new Set(data.channels)];

      await client.F.addData("ignore-channels", channel.guildId, {
        channels,
      });
    }

    return await interaction.editReply({
      content: `#${channel.name} will now be ignored for channel update logs!`,
    });
  },
};

console.log("setIgnored.js run");
