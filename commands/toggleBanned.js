const { SlashCommandBuilder } = require("discord.js");
const mongo = require("../mongodb");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("toggle-banned-words")
        .setDescription("Toggles weather the bot is deleting banned words"),
    global: true,
    async execute(interaction, client, channel) {
        const data = await mongo.getLogToggle(interaction.guildid);
        if (data == false) {
            await mongo.saveBannedWordToggle(interaction.guildId, true);
            interaction.reply("Banned words are now banned!");
        } else {
            if (data.toggleValue == true) {
                await mongo.saveLogToggle(interaction.guildId, false);
                interaction.reply("Banned words have been allowed! ");
            }
        }
    },
};
console.log("toggleBanned.js run")
