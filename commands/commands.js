const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dnu')
		.setDescription('DO NOT USE.'),
	async execute(interaction) {
		await interaction.reply('Work in preogress!');
	},
};
console.log("commands.js run")