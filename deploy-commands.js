require("dotenv").config();
const Config = process.env
const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");

const commands = [];
const globalCommands = [];
const localCommands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if (command.global) {
    globalCommands.push(command.data.toJSON());
    commands.push(command.data.toJSON());
  } else {
    localCommands.push(command.data.toJSON());
    commands.push(command.data.toJSON());
  }
}

const contextCommands = [];
const contextPath = path.join(__dirname, "contextMenu");
const contextFiles = fs
  .readdirSync(contextPath)
  .filter((f) => f.endsWith(".js"));

for (const file of contextFiles) {
  const filePath = path.join(contextPath, file);
  const command = require(filePath);
  contextCommands.push(command.data.toJSON());
}

const commandsAllGlobal = [...contextCommands, ...globalCommands];
const commandsAllLocal = [...contextCommands, ...localCommands];
const commandsAllDEV = [
  ...contextCommands,
  ...globalCommands,
  ...localCommands,
];

const rest = new REST({ version: "9" }).setToken(Config.TOKEN);

if (Config.ENV == "prod") {
  // global commands
  rest.put(Routes.applicationCommands(Config.APP_ID), {
    body: commandsAllGlobal,
  });

  // local commands
  rest.put(Routes.applicationGuildCommands(Config.APP_ID, Config.GUILD_ID), {
    body: commandsAllLocal,
  });

  console.log("Successfully registered global and local commands");
} else {
  // local commands
  rest.put(Routes.applicationGuildCommands(Config.APP_ID, Config.GUILD_ID), {
    body: commandsAllDEV,
  });
  console.log("Successfully registered commands locally");
}

console.log("banUser.js run");
