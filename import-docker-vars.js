const fs = require('fs');
const config = require('./docker.json');
const writeJson = async (dataIn) => {
    fs.writeFile('docker.json', JSON.stringify(dataIn), (err) => {
    if (err) throw err;
    console.log('Sucsess!');
    });
};

const addVars = async () => {

    if (config.token == !null) {
const tokenEnv = process.env.token;
const token = { "token": token };
writeJson(token);

const channelIDENV = process.env.channelid;
const channelID = { "CHANNEL_ID": channelIDENV };
writeJson(channelID);

const guildIDEnv = process.env.guildid;
const guildID = { "GUILD_ID": guildIDEnv };
writeJson(guildID);

const mongoURIENV = process.env.mongouri;
const mongoURI = { "MONGO_CONFIG": mongoURIENV };
writeJson(mongoURI);

const appIDENV = process.env.appid;
const appid = { "APP_ID": appIDENV };
writeJson(appid); //app and client id are the same thing
const clientid = { "CLIENT_ID": appIDENV };
writeJson(clientid);

const webhookENV = process.env.webhook;
const webhook = { "WEBHOOK_URL": webhook };
writeJson(mongoURI);

//suff that is always set like this
writeJson({"ENV": "prod"});

    } else {
        console.log('Variables already added! Or theres an error. Oops... :/');
    }
};

addVars();
console.log("Setup complete! Starting bot...");
module.exports = addVars;
