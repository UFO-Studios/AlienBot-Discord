## AlienBot 2.0

An open source Discord bot thats currently in alpha, originally made for The Alien Empire community Discord but open sourced for anyone that wants it!
## Invite Link

https://fl.niceygylive.xyz/UFOS-BOT20

## Setup Everything

Install Nodejs from https://nodejs.dev/download/

Install Git from https://git-scm.com/

Create a new Bot application:

    1. Go to Discord dev portal(https://discord.com/developers/applications)

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

    1. Go to Firebase Developer Console(https://console.firebase.google.com/) and login if you need to

    2. Click on "Add Project"

    3. Enter a name for the project

    4. Click on continue until you reach "Configure Google Analytics"

    5. Choose "default account for firebase" then click on create project

    6. Click on project settings (the gear icon on the top-left corner)

    7. Click on "Service Accounts"

    8. Click on "generate key pair" and download your whole keypair from the downloaded .json file and save it for a later step

    9. go to the home page of your project

    10. then to to firestore section

    11. click on "Create Database"

    12. Start is test mode and click "Next" (you can update security rules later)

    13. select location and click on "Enable"

    14. click on "start collection" and name it `db`

    15. click on "add document" and name it `BANNED_WORDS`

    16. click on "add field" and name it `WORDS`, note: the type should be `array`

    17. add all the words that you want to ban people from saying in there

## Download and run AlienBot

After you've setup everything, its time to install and run AlienBot

for that, you need to clone this repo: 

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
    "APP_ID": "bot-app-id",
    "ENV": "prod || dev",
    "DEFAULT_VCID": "default-voice-channel-id",
    "FIREBASE-CONFIG": {
        "your": "firebase",
        "service": "account",
        "config": "goes here"
    }
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
