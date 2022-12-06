const {
  EmbedBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  Client,
  SlashCommandBuilder,
} = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

const durations = [
  { name: "60 seconds", value: 60 * 1000 },
  { name: "5 mins", value: 5 * 60 * 1000 },
  { name: "10 mins", value: 10 * 60 * 1000 },
  { name: "30 mins", value: 30 * 60 * 1000 },
  { name: "1 hr", value: 60 * 60 * 1000 },
  { name: "1 day", value: 24 * 60 * 60 * 1000 },
  { name: "1 week", value: 7 * 24 * 60 * 60 * 1000 },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("This command times out a member!")
    .addUserOption((option) => {
      option
        .setName("target")
        .setDescription("The member to timeout.")
        .setRequired(true);
      return option;
    })
    .addNumberOption((option) => {
      option
        .setName("duration")
        .setDescription("duration of the timeout")
        .addChoices(
          { name: "60 seconds", value: 60 * 1000 },
          { name: "5 mins", value: 5 * 60 * 1000 },
          { name: "10 mins", value: 10 * 60 * 1000 },
          { name: "30 mins", value: 30 * 60 * 1000 },
          { name: "1 hr", value: 60 * 60 * 1000 },
          { name: "1 day", value: 24 * 60 * 60 * 1000 },
          { name: "1 week", value: 7 * 24 * 60 * 60 * 1000 }
        )
        .setRequired(true);
      return option;
    })
    .addStringOption((option) => {
      option
        .setName("reason")
        .setDescription("The reason to timeout the member.")
        .setRequired(false);
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
    const target = await interaction.options.getMember("target");
    const reason =
      (await interaction.options.getString("reason")) || "No reason given.";
    const duration = await interaction.options.getNumber("duration");
    // const member = await interaction.guild.members.fetch(target.id);

    if (!interaction.guild.features.includes("COMMUNITY"))
      return await interaction.reply({
        content:
          "You need community enabled in this server to timeout a member!",
      });

    if (!target)
      return interaction.reply({ content: "Invalid member.", ephemeral: true });

    if (
      !interaction.member.permissions.has(
        PermissionFlagsBits.ModerateMembers
      ) ||
      !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    )
      return interaction.reply({
        content: `You dont have the permissions to timeout ${target.user.tag}!`,
        ephemeral: true,
      });

    if (target.id == interaction.member.id)
      return interaction.reply({
        content: "You cannot timeout yourself!",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setTitle("Timeout")
      .setDescription(
        `${target.user.tag} has been timed out for ${prettyMilliseconds(
          duration
        )}. Reason: ${reason}`
      )
      .setColor("f5700a")
      .setAuthor({ name: interaction.user.tag })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "/timeout • AlienBot",
        iconURL:
          "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    try {
      await target.timeout(duration, reason);
      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      if (e) {
        console.log(e);
        return interaction.reply({
          content: `Error while executing this command: ${e}`,
          ephemeral: true,
        });
      }
    }
  },
};

console.log("timeout.js run");
