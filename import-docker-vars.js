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
const channelID = { "channelID": channelIDENV };
writeJson(channelID);

const guildIDEnv = process.env.guildid;
const guildID = { "guildID": guildIDEnv };
writeJson(guildID);

const mongoURIENV = process.env.mongouri;
const mongoURI = { "mongoURI": mongoURIENV };
writeJson(mongoURI);
    } else {
        console.log('Variables already added! Or theres an error. Oops... :/');
    }
};

addVars();
console.log("Setup complete! Starting bot...");
module.exports = addVars;
