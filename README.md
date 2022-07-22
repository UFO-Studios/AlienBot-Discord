## AlienBot 2.0

An open source Discord bot thats currently in alpha, originally made for The Alien Empire community Discord but open sourced for anyone that wants it!


## Invite Link

Coming soon™️
## Setup

Prerequisites:
```
Have nodejs installed
Have git installed
Have a valid discord account and a bot application 
```

First of all you need to clone this repo: 

```bash
git clone https://github.com/UFO-Studios/AlienBot-2.0
```
Now cd into the bot's directory:

```bash
cd alienbot-2.0
```

Then create a config.json file which will look like this:

```json
{
    "TOKEN": "your-bot-token",
    "CHANNEL_ID": "dev-channel-id",
    "CLIENT_ID": "your-client-id",
    "GUILD_ID": "dev-guild-id",
    "APP_ID": "bot-app-id"
}
```

Now install all the required dependencies:

```bash
npm install
```

Now run these node commands:

```bash
node ./deploy-commands.js
node ./index.js
```




## Contributing

Contributions are always welcome! :D
