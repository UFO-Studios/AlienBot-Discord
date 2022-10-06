const {
  ModalSubmitInteraction,
  Client,
  WebhookClient,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "ufoApply",
  /**
   *
   * @param {ModalSubmitInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    try {
      const subToAlien = await interaction.fields.getTextInputValue(
        "subToAlien"
      );
      const breakRules = await interaction.fields.getTextInputValue(
        "breakRules"
      );
      const age = await interaction.fields.getTextInputValue("age");
      const bedrockUsername = await interaction.fields.getTextInputValue(
        "bedrockUsername"
      );
      let javaUsername = await interaction.fields.getTextInputValue(
        "javaUsername"
      );

      if (!bedrockUsername && !javaUsername)
        return await interaction.reply({
          content: "Please enter a username!",
          ephemeral: true,
        });

      const webhook = new WebhookClient({
        url: client.C.WEBHOOK_URL,
      });

      const embed = new EmbedBuilder()
        .setTitle("New UFO SMP Application")
        .setDescription("A member has applied to join UFO SMP")
        .setColor("Purple")
        .addFields(
          {
            name: "How long have you been subbed to Alien?",
            value: `\`\`\`${subToAlien}\`\`\``,
          },
          {
            name: "do you promise not to break any rules? (y/n)",
            value: `\`\`\`${breakRules}\`\`\``,
          },
          {
            name: "Are you over the age of 13? (y/n)",
            value: `\`\`\`${age}\`\`\``,
          },
          {
            name: "Minecraft Bedrock Username",
            value: `\`\`\`${
              bedrockUsername || "No bedrock username given"
            }\`\`\``,
          },
          {
            name: "Minecraft Java Username",
            value: `\`\`\`${javaUsername || "No java username given"}\`\`\``,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "UFO SMP • AlienBot",
          iconURL:
            "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
        });

      await webhook.send({ embeds: [embed] });

      return await interaction.reply(
        "Your form has been submitted! It takes around 1 day for Alien to check your form and reply. you can do /ufosmp to get info about the UFOSMP!"
      );
    } catch (error) {
      console.error(error);
      return await interaction.reply(`There was an error: ${error}`);
    }
  },
};

console.log("modals/ufoApply.js run");
