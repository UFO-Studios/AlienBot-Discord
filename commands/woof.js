const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('woof')
		.setDescription('The bot goes woof.'),
	async execute(interaction) {
		await interaction.reply('WOOF. WOOF WOOF WOOF. WOOFWOOFWOOFBARK');
        await interaction.reply({ content: 'Nell is the best!', ephemeral: true });
        console.log("woof");
	},
};
console.log("woof online")