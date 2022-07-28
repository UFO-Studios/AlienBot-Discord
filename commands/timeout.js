const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
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
  async execute(interaction, client) {
    const target = await interaction.options.getMember("target");
    const reason =
      (await interaction.options.getString("reason")) || "No reason given.";
    const duration = await interaction.options.getNumber("duration");
    // const member = await interaction.guild.members.fetch(target.id);

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
          "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
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

    // try {
    //   if (
    //     await interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS) ||
    //     await interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    //   ) {
    //     if (target) {
    //       await target.timeout(duration, reason);
    //       const successEmbed = new EmbedBuilder()
    //         .setColor("0099ff")
    //         .setTitle(`Timed out ${target.user.tag}.`)
    //         .setDescription(
    //           `${target.user.tag} was timed out by ${interaction.user.tag}. Reason: ${reason}`
    //         )
    //         .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    //         .setTimestamp()
    //         .setFooter({
    //           text: "/help for a list of all the commands. - Alienbot",
    //           iconURL:
    //             "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
    //         });
    //       interaction.reply({ embeds: [successEmbed] });
    //       console.log(
    //         `${target.user.tag} was timed out by ${interaction.user.tag}. Reason: ${reason}`
    //       );
    //     } else {
    //       return interaction.reply({
    //         content: "Invalid member.",
    //         ephemeral: true,
    //       });
    //     }
    //   } else {
    //     return interaction.reply({
    //       content: "You dont have the permissions to time out a member!",
    //       ephemeral: true,
    //     });
    //   }
    // } catch (e) {
    //   if (e.code == 50013) {
    //     return interaction.reply({
    //       content: `I dont have the permissions to timeout ${target.user.tag}`,
    //       ephemeral: true,
    //     });
    //   }
    //   if (e) {
    //     console.log(e);
    //     return interaction.reply({
    //       content: "An unknown error has occurred. Please try again later.",
    //       ephemeral: true,
    //     });
    //   }
    // }
  },
};

console.log("timeout.js run");
