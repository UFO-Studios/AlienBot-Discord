const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  PermissionsBitField,
} = require("discord.js");
const mongoose = require("mongoose");
const mongo = require("../mongodb");

//DB Stuffs

const setBannedSchema = new mongoose.Schema({
  active: Boolean,
  guildId: String
});

const setBannedModel = new mongoose.model("setBanned", setBannedSchema);
const setBannedEnforced = async (guildId, boolean) => {
    
  if(!connected || !db) {
    await mongo.connectToDB() 
  }
  
  const SB = setBannedModel({ boolean, guildId })
  
  //we need to delete the old one here
  await SB.save(err => {
    if (err) {
      console.error(err)
      return false;
    }
  })
  
  console.log("Added to DB")
  return true
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("toggle-banned-words")
    .setDescription(
      "Toggle wether you want to turn on banned words for your server or not!"
    )
    .addStringOption((option) =>
      option
        .setName("toggle-value")
        .setDescription("wether to turn on or off")
        .addChoices({ name: "on", value: "on" }, { name: "off", value: "off" })
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
          'You dont have the permissions to toggle banned words. You need the "ManageGuild" permission!',
        ephemeral: true,
      });

    const toggle = await interaction.options.getString("toggle-value");


    await SB(toggle, guildId);
    

    return await interaction.reply({
      content: `Toggled banned words to ${toggle}!`,
    });
  },
};

console.log("set-banned.js run");
