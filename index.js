const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Intents } = require("discord.js");
const Config = require("./config.json");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://<bot>:<TheDBWith1Diamond>@tadbot.09guv.mongodb.net/?retryWrites=true&w=majority"; //this is ip locked so dw abt securty
const clientmongo = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object (smart mongo thing)
//   client.close();
// });

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

client.login(Config.TOKEN);
