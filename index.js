const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Intents, Interaction } = require("discord.js");
const Config = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const eventPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventPath).filter((f) => f.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, () => {
      event.execute(client);
    });
  } else {
    client.on(event.name, (...args) => {
      event.execute(...args, client);
    });
  }
}

// test emmet
// client.on("interactionCreate", interaction => {
    
// })

console.log("stage 1 run");

client.login(Config.TOKEN);
