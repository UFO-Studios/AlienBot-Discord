## AlienBot 2.0

An open source Discord bot thats currently in alpha, originally made for The Alien Empire community Discord but open sourced for anyone that wants it!


[![pmd](https://github.com/UFO-Studios/AlienBot-2.0/actions/workflows/pmd.yml/badge.svg)](https://github.com/UFO-Studios/AlienBot-2.0/actions/workflows/pmd.yml)


## Invite Link

https://thealiendoctor.com/AddAlienBot

## Setup

Install Nodejs from https://nodejs.dev/download/

Create a new Bot application:

1. Go to Discord dev portal (https://discord.com/developers/applications)

2. Click on "New Application"

3. Enter the name of the bot

4. Go to the "Bot" section (will be on the left)

5. Click on "Add bot"

6. Click on "Reset Token"

7. Copy the token and save it for a later step

8. Go to "OAuth2" section (will be on the left)

9. Copy "client id" and save if for a later step

10. Go to "General Information" section (will be on the left)

11. scroll down and copy "Application ID" and save it for a later step

Create a new Firebase Project:

1. Go to Firebase Developer Console (https://console.firebase.google.com/) and login if you need to

2. Click on "Add Project"

3. Enter a name for the project

4. Click on continue until you reach "Configure Google Analytics"

5. Choose "default account for firebase" then click on create project

6. Click on project settings (the gear icon on the top-left corner)

7. Click on "Service Accounts"

8. Click on "generate key pair" and download your whole keypair from the downloaded .json file and save it for a later step

## Download and run AlienBot

First of all you need to clone this repo: 

```bash
$ git clone https://github.com/UFO-Studios/AlienBot-2.0.git
```
Now cd into the bot's directory:

```bash
$ cd AlienBot-2.0
```

Then create a .env file which will look like this:

```env
TOKEN=yourbottoken
CHANNEL_ID=serverchannelid
CLIENT_ID=botclientid
GUILD_ID=serverid
APP_ID=botapplicationid
ENV=prod||dev
FIREBASE_CONFIG={"your":"firebase","service":"account","config":"here","in":"oneline"}
```

Now run the setup script (run this only once!)

```bash
$ npm run setup
```

Run this whenever the bot crashes/host stops the script

```bash
$ npm run start
```
## Contributing

We'll be needing help, so contributions are always welcome! :D

