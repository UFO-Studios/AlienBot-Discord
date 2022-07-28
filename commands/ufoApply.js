const { SlashCommandBuilder } = require("discord.js");
const {
  Interaction,
  Client,
  TextInputStyle,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ufosmp-apply")
    .setDescription(
      "apply to join the ufo smp! note: you need to be level 5 or higher to apply."
    ),
  global: false,
  /**
   *
   * @param {Interaction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("ufoApply")
      .setTitle("Apply to join UFO SMP!");

    const subToAlien = new TextInputBuilder()
      .setCustomId("subToAlien")
      .setLabel("How long have you been subscribed to alien?")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const breakRules = new TextInputBuilder()
      .setCustomId("breakRules")
      .setLabel("do you promise not to break any rules? (y/n)")
      .setPlaceholder("yes")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const age = new TextInputBuilder()
      .setCustomId("age")
      .setLabel("Are you over the age of 13? (y/n)")
      .setRequired(true)
      .setPlaceholder("yes")
      .setStyle(TextInputStyle.Short);

    const BedrockUsername = new TextInputBuilder()
      .setCustomId("bedrockUsername")
      .setLabel("Minecraft Bedrock Username")
      .setRequired(true)
      .setPlaceholder("Kingerious")
      .setStyle(TextInputStyle.Short);

    const JavaUsername = new TextInputBuilder()
      .setCustomId("javaUsername")
      .setLabel("Minecraft Java Username")
      .setPlaceholder("TheAlienDoctor")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(subToAlien);
    const secondActionRow = new ActionRowBuilder().addComponents(breakRules);
    const thirdActionRow = new ActionRowBuilder().addComponents(age);

    const fourthActionRow = new ActionRowBuilder().addComponents(
      BedrockUsername
    );

    const fifthActionRow = new ActionRowBuilder().addComponents(JavaUsername);

    modal.addComponents(
      firstActionRow,
      secondActionRow,
      thirdActionRow,
      fourthActionRow,
      fifthActionRow
    );

    await interaction.showModal(modal);
  },
};

console.log("ufoApply .js run");
