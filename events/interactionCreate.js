const {
  InteractionType,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const ms = require("ms");

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
    } else if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        if (client.CD.get(`${interaction.commandName}-${interaction.user.id}`))
          return interaction.reply({
            content: `You are on a cooldown! You need to wait ${ms(
              client.Timeout.get(
                `${interaction.commandName}-${interaction.user.id}`
              ) - Date.now(),
              { long: true }
            )} more!`,
            ephemeral: true,
          });

        await command.execute(interaction, client);

        client.CD.set(
          `${interaction.commandName}-${interaction.user.id}`,
          Date.now() + 5000
        );

        setInterval(() => {
          client.CD.delete(`${interaction.commandName}-${interaction.user.id}`);
        }, 4000);
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
    } else if (interaction.isContextMenuCommand()) {
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
