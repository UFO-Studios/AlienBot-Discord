const {
  InteractionType,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  once: false,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.type === InteractionType.ModalSubmit) {
      console.log("stage 2 modal run");
      const modal = client.modals.get(interaction.customId);

      if (!modal) return console.log("error debug");
      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error!",
          ephemeral: true,
        });
      }
    } else {
      console.log("stage 2 command run");
      if (!interaction.isChatInputCommand()) return;

      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        if (!interaction.replied) {
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        } else {
          await interaction.editReply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    }
  },
};
