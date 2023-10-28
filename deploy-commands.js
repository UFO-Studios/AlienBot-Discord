// // const Config = require("./config.json");
// // const fs = require("node:fs");
// // const path = require("node:path");
// // const { Routes, REST } = require("discord.js");

// // const rest = new REST({ version: "9" }).setToken(Config.TOKEN);

// // const registerCommands = () => {
// //   const commands = [];
// //   const globalCommands = [];
// //   const localCommands = [];
// //   const commandsPath = path.join(__dirname, "commands");
// //   const commandFiles = fs
// //     .readdirSync(commandsPath)
// //     .filter((file) => file.endsWith(".js"));

// //   for (const file of commandFiles) {
// //     const filePath = path.join(commandsPath, file);
// //     const command = require(filePath);
// //     if (command.data == undefined) { return }
// //     if (command.global) {
// //       globalCommands.push(JSON.parse(JSON.stringify(command.data)));
// //       commands.push(JSON.parse(JSON.stringify(command.data)));
// //     } else {
// //       console.log("test "+command.data)
// //       localCommands.push(JSON.parse(JSON.stringify(command.data)));
// //       commands.push(JSON.parse(JSON.stringify(command.data)));
// //     }
// //   }

// //   const contextCommands = [];
// //   const contextPath = path.join(__dirname, "contextMenu");
// //   const contextFiles = fs
// //     .readdirSync(contextPath)
// //     .filter((f) => f.endsWith(".js"));

// //   for (const file of contextFiles) {
// //     const filePath = path.join(contextPath, file);
// //     const command = require(filePath);
// //     contextCommands.pushJSON.parse(JSON.stringify(command.data));;
// //   }

// //   const commandsAllGlobal = [...contextCommands, ...globalCommands];
// //   const commandsAllLocal = [...contextCommands, ...localCommands];
// //   const commandsAllDEV = [
// //     ...contextCommands,
// //     ...globalCommands,
// //     ...localCommands,
// //   ];

// //   if (Config.ENV == "prod") {
// //     // global commands
// //     rest.put(Routes.applicationCommands(Config.APP_ID), {
// //       body: commandsAllGlobal,
// //     }).catch(console.error);

// //     // local commands
// //     rest.put(Routes.applicationGuildCommands(Config.APP_ID, Config.GUILD_ID), {
// //       body: commandsAllLocal,
// //     }).catch(console.error);

// //     console.log("Successfully registered global and local commands");
// //     return true;
// //   } else {
// //     // local commands
// //     rest.put(Routes.applicationGuildCommands(Config.APP_ID, Config.GUILD_ID), {
// //       body: commandsAllDEV,
// //     }).catch(console.error);
// //     console.log("Successfully registered commands locally");
// //     return true;
// //   }
// // };

// // const deleteOld = () => {
// //   rest
// //     .put(Routes.applicationCommands(Config.CLIENT_ID), { body: [] })
// //     .then(() => {
// //       console.log("Successfully deleted all application commands.");
// //     })
// //     .catch(console.error);
// // };

// // module.exports = {
// //   registerCommands,
// //   deleteOld,
// // };
// const { REST, Routes } = require('discord.js');
// const { CLIENT_ID, GUILD_ID, TOKEN } = require('./config.json');
// const fs = require('node:fs');
// const path = require('node:path');

// const commands = [];
// console.log("Starting command registry...")
// // Grab all the command files from the commands directory you created earlier
// const commandsPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
// var i = 0;
// const commandFilesLength = commandFiles.length
// for (const file of commandFiles) {
//   i++;
//   const filePath = path.join(commandsPath, file);
//   const command = require(filePath);
//   if ('data' in command && 'execute' in command) {
//     commands.push(command.data.toJSON());
//     // console.log(`[SUCCESS] Registered command ${i}/${commandFilesLength}`);
//     process.stdout.write(`\r[SUCCESS] Registered command ${i}/${commandFiles.length}: `);
//   } else {
//     console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
//   }
//   console.log()
// }

// // Construct and prepare an instance of the REST module
// const rest = new REST().setToken(TOKEN);

// // and deploy your commands!
// (async () => {
// 	try {
// 		console.log(`Started refreshing ${commands.length} application (/) commands.`);

// 		// The put method is used to fully refresh all commands in the guild with the current set
// 		const data = await rest.put(
// 			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
// 			{ body: commands },
// 		);

// 		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
// 	} catch (error) {
// 		// And of course, make sure you catch and log any errors!
// 		console.error(error);
// 	}
// })();
const Config = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");
const { Routes, REST } = require("discord.js");

const rest = new REST({ version: "9" }).setToken(Config.TOKEN);

const registerCommands = () => {
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
};

const deleteOld = () => {
  rest
    .put(Routes.applicationCommands(Config.CLIENT_ID), { body: [] })
    .then(() => {
      console.log("Successfully deleted all application commands.");
    })
    .catch(console.error);
};

module.exports = {
  registerCommands,
  deleteOld,
};