require("./deploy-commands.js").registerCommands();
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  EmbedBuilder,
  Partials,
  IntentsBitField,
} = require("discord.js");
const Firebase = require("./firebase.js");
const { Player } = require("discord-player");
const Config = require("./config.json");
const { DiscordTogether } = require("discord-together");

//debug
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
//end of debug

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

(async () => {
  const data = await Firebase.getData("db", "BANNED_WORDS");
  client.BANNED_WORDS = await data.WORDS;
})();

const player = new Player(client, { ytdlOptions: { quality: 'highestaudio' } });

player.on("trackStart", (queue, track) =>{
    const embed = new EmbedBuilder()
        .setTitle("Play song")
        .setDescription(`Now playing **${track.title}**!`)
        .setColor("Green")
        .setAuthor({ name: client.user.tag })
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({
            text: "Music System • Alienbot",
            iconURL:
            "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
        });
    queue.metadata.channel.send({ embeds: [embed] });
});

client.discordTogether = new DiscordTogether(client);
client.P = player;
client.C = Config;
client.F = Firebase;
client.Timeout = new Collection()

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

const contextPath = path.join(__dirname, "contextMenu");
const contextFiles = fs
    .readdirSync(contextPath)
    .filter((f) => f.endsWith(".js"));

for (const file of contextFiles) {
    const filePath = path.join(contextPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

// const functionsPath = path.join(__dirname, "functions");
// const functionsFiles = fs
//   .readdirSync(functionsPath)
//   .filter((f) => f.endsWith(".js"));

// client.functions = new Collection();

// for (const file of functionsFiles) {
//   const filePath = path.join(functionsPath, file);
//   const Function = require(filePath);
//   client.functions.set(Function.name, Function.execute);
// }

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
