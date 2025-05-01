const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  PermissionsBitField,
} = require("discord.js");
const mongo = await require("../database/mongodb");import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default  {
  data: new SlashCommandBuilder()
    .setName("ignore-channel")
    .setDescription(
      "ignores this channel for log updates, note: this does not ignore msg updates from this channel"
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("the channel to be ignored")
        .setRequired(true)
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
        content:
          'You dont have the permissions to set ignore a channel. You need the "ManageGuild" permission!',
      });
    const channel = interaction.options.getChannel("channel");

    await interaction.deferReply();
    const data = await mongo.checkIgnoredChannel(
      interaction.guildId,
      channel.id
    );

    if (!data) {
      await mongo.addIgnoredChannel(interaction.guildId, channel.id);
      return await interaction.editReply({
        content: `#${channel.name} will now be ignored for channel update logs!`,
      });
    } else {
      return await interaction.editReply({
        content: "This channel is already ignored!",
      });
    }
  },
};

consoleMessage("setIgnored.js run", "botInit");
