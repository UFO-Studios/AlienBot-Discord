const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sub2alium')
		.setDescription('Alien`s links!'),
	async execute(interaction) {
		await interaction.reply('Find Alien on all the good (and some bad...) sites @TheAlienDoctor. But ill save you the trouble and link his YouTube (https://www.youtube.com/c/TheAlienDoctor ), Twitter (https://twitter.com/thealiendoctor ), Twitch (https://twitch.tv/thealiendoctor_ ) and his AWESOME Website (https://thealiendoctor.com )!');
	},
};
console.log("sub2alium.js run")