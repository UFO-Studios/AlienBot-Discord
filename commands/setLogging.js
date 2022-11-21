const { SlashCommandBuilder } = require("discord.js");
const mongo = require("../mongodb.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logging")
    .setDescription("Change your settings for logging.")
    .addSubcommand((sc) =>
      sc
        .setName("setenabled")
        .setDescription("Set logging to enabled or disabled")
        .addChoices(
            { name: 'true', value: 'true' },
            { name: 'false', value: 'false' }
        ),
        ),
  global: true,
  async execute(interaction) {
      if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({
              content: "You need to be an admin to use this command.",
              ephemeral: true,
          });
      }
      const loggingBool = interaction.options.getBoolean("setenabled");
      if (loggingBool = true) {
          await mongo.updateURL(interaction.guild.id, true);
          return interaction.reply({
              content: "Updated! Logging is now enabled",
              ephemeral: false,
          });
      }
  },
};
console.log("woof.js run");
