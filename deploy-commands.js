const Config = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");
const { Routes, REST } = require("discord.js");

const rest = new REST({ version: "9" }).setToken(Config.TOKEN);

async function registerCommands() {
  console.log("Registering commands");
  const commands = [];
  const globalCommands = [];
  const localCommands = [];
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    try {
      const filePath = path.join(commandsPath, file);
      const command = await import(filePath); // Changed from require() to import()
      if (command.global) {
        globalCommands.push(command.data.toJSON());
        commands.push(command.data.toJSON());
      } else {
        localCommands.push(command.data.toJSON());
        commands.push(command.data.toJSON());
      }
    } catch (e) {}
  }

  const contextCommands = [];
  const contextPath = path.join(__dirname, "contextMenu");
  const contextFiles = fs.readdirSync(contextPath).filter((f) => f.endsWith(".js"));

  for (const file of contextFiles) {
    const filePath = path.join(contextPath, file);
    const command = require(filePath);
    contextCommands.push(command.data.toJSON());
  }

  const commandsAllGlobal = [...contextCommands, ...globalCommands];
  const commandsAllLocal = [...contextCommands, ...localCommands];
  const commandsAllDEV = [...contextCommands, ...globalCommands, ...localCommands];

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
    return true;
  } else {
    // local commands
    rest.put(Routes.applicationGuildCommands(Config.APP_ID, Config.GUILD_ID), {
      body: commandsAllDEV,
    });
    console.log("Successfully registered commands locally");
    return true;
  }
}

const deleteOld = () => {
  rest
    .put(Routes.applicationCommands(Config.CLIENT_ID), { body: [] })
    .then(() => {
      console.log("Successfully deleted all application commands.");
    })
    .catch(console.error);
};

export default {
  registerCommands,
  deleteOld,
};
