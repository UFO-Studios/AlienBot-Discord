const { SlashCommandBuilder } = require("@discordjs/builders");

 module.exports = {
   data: new SlashCommandBuilder()
     .setName("ufosmp")
    .setDescription("Info about the UFO SMP"),
   async execute(interaction) {
     await interaction.reply("UFO SMP is a server ru by Alien for members of The Alien Empire community! Want to join us? But you're  on bedrock? FEAR NOT! It runs GeyserMC for crossplay. Still want to join? Get to level 5 (`/rank`) and apply on the form in the info channel! :D"
     );
   },
};

//module.exports = {
//	data: new SlashCommandBuilder()
//		.setName('woofwoof')
//		.setDescription('The bot goes woof.'),
//	async execute(interaction) {
//		await interaction.reply('WOOF. WOOF WOOF WOOF. WOOFWOOFWOOFBARK');
//	},
//};

console.log("ufosmp.js run");
