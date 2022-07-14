let Discord = require("discord.js")
//const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const client = new Discord.Client({ intents: [ 'DIRECT_MESSAGES', 'GUILD_MESSAGES' ] });
const { prefix, botToken } = require('./config.json')

console.log("Stage:1 Sucsessful!")

client.login(botToken);
console.log("Stage 2: Sucsessfull!")

client.on("ready", async () => {
  console.log("Running!")
});

client.on("message", async message => {
    message.channel.send('Pong!')
})

console.log("Commands loaded")

//command(client, ['ping'], (message) => {
//   message.channel.send('Pong!')
// })


