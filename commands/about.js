const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Alien`s links!'),
	async execute(interaction) {
		await interaction.reply('I am made by the UFO-Studios team! We definetly know what we are doing :D. Find this bots code at https://github.com/UFO-Studios/AlienBot-2.0');
	},
};
console.log("about.js run")