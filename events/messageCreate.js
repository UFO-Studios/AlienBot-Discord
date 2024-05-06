const { consoleMessage } = require("../log");
const mongo = require("../mongodb");
const { ChannelType, Message, Client } = require("discord.js");

/**
 * @param {Message} message
 * @param {Client} client
 */
const deleteBannedWords = async (message, client) => {
	try {
		const data = await mongo.getBannedWordToggle(message.guild.id);
		if (!data) return;
		const msg = message.content.toLowerCase();
		const words = msg.split(/ |_|-/);

		for (const word of words) {
			if (await mongo.checkBW(word)) {
				await message.reply({
					content: "You cannot use that word!",
					reply: true,
				});

				setTimeout(() => {
					message.delete();
				}, 1000);
			}
		}
	} catch (e) {
		if (e) {
			console.log(e);
		}
	}
};

function genRan(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 *
 * @param {Message} message
 * @param {Client} client
 */
const checkLevel = async (message, client) => {
	if (client.LCD.has(message.author.id)) return;

	const oldXpObj = (await mongo.getXP(message.author.id)) || {
		xp: 0,
		level: 0,
		userId: message.author.id,
	};
	var newXp = oldXpObj + genRan(1, 2);
  await mongo.saveXP(message.author.id, newXp, 0);
	setTimeout(() => {
		client.LCD.delete(message.author.id);
	}, client.C.LEVEL_COOLDOWN);

};

module.exports = {
	name: "messageCreate",
	once: false,
	/**
	 * @param {Message} message
	 * @param {Client} client
	 */
	async execute(message, client) {
		if (message.author.bot || !message.guild || !message.channel) return;

		// banned words
		await deleteBannedWords(message, client);

		// adding xp
		// await checkLevel(message, client);
	},
};

consoleMessage("events/messageCreate.js run", "botInit");
