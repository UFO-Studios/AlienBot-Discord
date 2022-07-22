const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Says the given text")
    .addStringOption((option) =>
      option
        .setName("string")
        .setDescription("the words to repeat")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const string = await interaction.options.getString("string");

    const array = await string.split(" ");
    await array.map((word) => {
      if (word.startsWith("@"))
        interaction.reply({
          content: "You cannot mention a member through this!",
          ephemeral: true,
        });
    });

    await interaction.reply({
      content: `I am going to say these words: ${string}`,
      ephemeral: true,
    });

    return await interaction.channel.send(string);
  },
};

console.log("say.js run");
