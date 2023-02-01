const { deleteOld, registerCommands } = require("./deploy-commands.js");
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  EmbedBuilder,
  Partials,
  IntentsBitField,
} = require("discord.js");
const Mongodb = require("./mongodb.js");
const { Player } = require("discord-player");
const Config = require("./config.json");
const { DiscordTogether } = require("discord-together");
const express = require("express");
const { config } = require("dotenv");

//express server for uptime robot
const app = express();
const port = 3333;

app.get("/", (req, res) => {
  res.send("Bot is online!");
  console.log("status page visited");
});

app.listen(port, () => {
  console.log(`Status server is running on port ${port}`);
});
//end

if (Config.DELETE_OLD == true) {
  deleteOld();
}
registerCommands();

const Intents = new IntentsBitField([
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildVoiceStates,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.GuildMessageReactions,
  IntentsBitField.Flags.GuildEmojisAndStickers,
  IntentsBitField.Flags.GuildBans,
  IntentsBitField.Flags.GuildWebhooks,
  IntentsBitField.Flags.MessageContent,
  IntentsBitField.Flags.DirectMessages,
  IntentsBitField.Flags.DirectMessageReactions,
]);

const client = new Client({
  intents: Intents,
  partials: [Partials.Channel],
});

const player = new Player(client, { ytdlOptions: { quality: "highestaudio" } });

player.on("trackStart", (queue, track) => {
  const embed = new EmbedBuilder()
    .setTitle("Play song")
    .setDescription(`Now playing **${track.title}**!`)
    .setColor("Green")
    .setAuthor({ name: client.user.tag })
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter({
      text: "Music System • Alienbot",
      iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
    });
  queue.metadata.channel.send({ embeds: [embed] });
});

client.discordTogether = new DiscordTogether(client);
client.P = player;
client.C = Config;
client.M = Mongodb;
client.CD = new Collection();

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

client.buttons = new Collection();
const buttonsPath = path.join(__dirname, "buttons");
const buttonFiles = fs
  .readdirSync(buttonsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of buttonFiles) {
  const filePath = path.join(buttonsPath, file);
  const button = require(filePath);
  client.buttons.set(button.name, button);
}

const contextPath = path.join(__dirname, "contextMenu");
const contextFiles = fs
  .readdirSync(contextPath)
  .filter((f) => f.endsWith(".js"));

for (const file of contextFiles) {
  const filePath = path.join(contextPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const imagesPath = path.join(__dirname, "./images/welcomeImages");
const imagesFiles = fs
  .readdirSync(imagesPath)
  .filter((f) => f.endsWith(".png"));
client.images = [];

for (const file of imagesFiles) {
  client.images.push(path.join(imagesPath, file));
}

const eventPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventPath).filter((f) => f.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, () => {
      event.execute(client);
      console.log(`Event ${event.name} loaded!`);
    });
  } else {
    client.on(event.name, (...args) => {
      event.execute(...args, client);
    });
  }
}

client.modals = new Collection();
const modalsPath = path.join(__dirname, "modals");
const modalFiles = fs
  .readdirSync(modalsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of modalFiles) {
  const filePath = path.join(modalsPath, file);
  const modal = require(filePath);
  client.modals.set(modal.name, modal);
}

client.login(client.C.TOKEN);
