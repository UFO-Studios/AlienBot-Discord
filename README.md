<!-- <h1 align="center">AlienBot Discord</h1>     

<p align="center">An open source Discord bot thats currently in alpha, originally made for The Alien Empire community Discord!<p>     

<p align="center">
  <img src="https://github.com/UFO-Studios/AlienBot-Discord/actions/workflows/pmd.yml/badge.svg" />     
  <img src="https://github.com/UFO-Studios/AlienBot-Discord/actions/workflows/docker-image.yml/badge.svg" />     
</p>

<h2>Todo</h2>

<p>
1. economic system.
</p>
<p>
2. maybe Youtube-to-Discord, Twitch-to-Discord and Twitter-to-Discord features in the future.    
</p>

<h2>Invite Link</h2>    

<a href="https://thealiendoctor.com/AddAlienBot">Click me</a>    

<h2>Download</h2>    

<a href="https://github.com/UFO-Studios/AlienBot-Discord/archive/refs/heads/main.zip">Click me</a>    
Docker and Docker hub support coming soon™    

<h2>Contributing</h2>    

If you see anything wrong, mis-placed or have a feature request, dont hesitate to open a <a href="https://github.com/UFO-Studios/AlienBot-Discord/pulls">Pull request!</a>   -->
# AlienBot Discord
## A general purpose open source bot developed by the UFO Studios team. <br> This bot is currently in Beta, originally made for The Alien Empire community Discord!

## Features:
- Moderation
- Music
- Logging
- Memes
- Welcome Images
- Discord Together
- Image Gen Commands
- Utility Commands
- and a whole lot more!


### Invite the bot:
[Click me](https://thealiendoctor.com/AddAlienBot)
[More info](https://thealiendoctor.com/downloads/alienbot)

## Host your own:
### You will need:
- [Node.js](https://nodejs.org/en/)
- [Curl or Wget](https://curl.se/)
- [MongoDB](https://www.mongodb.com/)
- [A discord bot token](https://discord.com/developers/applications)

### Download & Install:
```bash
wget https://github.com/UFO-Studios/AlienBot-Discord/archive/refs/tags/stable-1.3.1.zip -o alienbot.zip```
unzip alienbot.zip
cd AlienBot-Discord-stable-1.3.1
npm install
```

### Configure:
Copy `config_template.json` to `config.json` and fill in the values.

### Database:
Go to [Here](https://www.mongodb.com/basics/create-database) for instruction about how to create a database. Get the URI from that and put it in config.json

### Run:
(You can use [pm2](https://pm2/io) to run this in the background)
```bash
node index.js
```

## Contributing:
If you see anything wrong, mis-placed or have a feature request, dont hesitate to open a [Pull request!](https://github.com/UFO-Studios/AlienBot-Discord/compare) <br>
Found a security flaw? Email us at [UFOStudios@TheAlienDoctor.com](mailto:ufostudios@thealiendoctor.com?subject=AlienBot%20Security%20Flaw). Please do not open a issue for security flaws.
