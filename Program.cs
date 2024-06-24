/*
* ALienBot Discord, V3.0
* Made with 👽 & 💖 by UFO Studios.
* Copyright 2024+ UFO Studios, made by Niceygy.
* This is the main entrypoint for the bot. Best viewed in vs code.
* CONSISTENCY!
*/

namespace AlienBot
{
    using System;

    using DSharpPlus;
    using DSharpPlus.Entities;
    using DSharpPlus.Commands;

    using Serilog;
    using Microsoft.Extensions.Logging;


    using AlienBot.Events;
    using AlienBot.Commands;
    using AlienBot.Web;
    using Microsoft.VisualBasic;

    public class Primary
    {//Public so they can be reached in web/data.cs
        public static string API_VERSION = "10";
        public static string BOT_VERSION = "3.0";
        public static string BOT_TOKEN = "";
        public static string MONGO_URI = "";
        public static string WEB_UI_ADDRESS = "";
        public static DiscordClient discord;/*
        public static string TWITCH_CLIENT_ID = "";
        public static string TWITCH_CLIENT_SECRET = ""; IGNORE THESE!
        public static string TWITCH_REDIRECT_URI = "";*/


        public static Task LoadConfig()
        {
            var configFile = "config.txt";
            if (File.Exists(configFile))
            {
                var config = File.ReadAllLines(configFile);
                BOT_TOKEN = config[0];
                MONGO_URI = config[1];
                WEB_UI_ADDRESS = config[2];
                /*TWITCH_CLIENT_ID = config[2];
                TWITCH_CLIENT_SECRET = config[3];
                TWITCH_REDIRECT_URI = config[4];*/
                return Task.CompletedTask;
            }
            else
            {
                Log.Fatal("No config file found! Is it in the same directory as the bot?");
                Exception e = new FileNotFoundException();
                return Task.FromException(e);
            }
        }

        public async static Task UpdateStatus(DiscordClient client)
        {
            while (true)
            {
                string[] statuses = { "Sub2Alien", "Now in C#!", "The only bot from outer space!", "github.com/ufo-studios", "Not broken! Yet", "mhmm. yes" };
                var random = new Random();
                var status = statuses[random.Next(0, statuses.Length)];
                await client.UpdateStatusAsync(new DiscordActivity(status));
                await Task.Delay(60 * 1000 * 5);
            }
        }

        public static async Task Main(string[] args)
        {

            //LOGGING #######################################################
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .WriteTo.InMemorySink()
                .CreateLogger();

            
            //STARTUP BANNER ################################################
            Log.Information("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
            Log.Information("█ ▄▄▀██ ████▄ ▄██ ▄▄▄██ ▀██ ██ ▄▄▀██ ▄▄▄ █▄▄ ▄▄███ ▄▄ ████ ▄▄ █");
            Log.Information("█ ▀▀ ██ █████ ███ ▄▄▄██ █ █ ██ ▄▄▀██ ███ ███ ███████▄▀█▀▀█ ▀▄ █");
            Log.Information("█ ██ ██ ▀▀██▀ ▀██ ▀▀▀██ ██▄ ██ ▀▀ ██ ▀▀▀ ███ █████ ▀▀ █▄▄█ ▀▀ █");
            Log.Information("▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀");
            Log.Information("AlienBot Discord V" + BOT_VERSION + "  Made with 👽 & 💖 by UFO Studios.");

            //LOAD OTHER LIBS ###############################################
            _ = LoadConfig();


            await MessageCreate.BadWordsFilter();
            if (MessageCreate.badWords == null)
            {
                Log.Fatal("Bad words list not loaded! Exiting...");
                return;
            }


            Log.Information("Connecting to MongoDB...");
            Database.Connect.ConnectToDB(MONGO_URI);

            Log.Information("Starting web server...");
            _ = Server.Start([WEB_UI_ADDRESS + "/"]);

            //DISCORD CONNECTION ############################################
            Log.Information("Connecting to Discord Gateway V" + API_VERSION + "...");

            discord = new DiscordClient(new DiscordConfiguration()
            {
                Token = BOT_TOKEN,
                TokenType = TokenType.Bot,
                Intents = DiscordIntents.All,
                AutoReconnect = true,
                GatewayCompressionLevel = GatewayCompressionLevel.Stream,
                LoggerFactory = new LoggerFactory().AddSerilog() // Use Serilog
            });

            var slash = discord.UseCommands();

            //COMMANDS #######################################################
            Log.Debug("Adding commands");
            slash.AddCommands<Text>(/*Log*/);
            slash.AddCommands<Mod>();
            slash.AddCommands<Admin>();
            slash.AddCommands<rankCommands>();

            //EVENT HANDLERS #################################################
            Log.Debug("Adding event handlers");
            discord.MessageCreated += MessageCreate.Handler;
            discord.MessageUpdated += MessageEdit.Handler;


            //COMMANDS #######################################################


            await discord.ConnectAsync();

            if (args.Length > 0)
            {
                if (args[0] == "migrate")
                {
                    Log.Information("Migrating database...");
                    Log.Information("Retriving all guilds...");
                    var allGuilds = new List<DiscordGuild>();
                    var i = 0;
                    await foreach (var guild in discord.GetGuildsAsync())
                    {
                        i++;
                        allGuilds.Add(guild);
                        await Database.Guilds.NewGuild(guild.Id.ToString());
                        Log.Information("New guild added to database. (" + i + ")");

                    }
                }
            }
            Log.Information("Connected to Discord Gateway V" + API_VERSION + " as" + discord.CurrentUser.ToString().Split(";")[1] + "!");
            Log.Information("STARTUP COMPLETE! AlienBot is now online.");
            Log.Information("###################################################################################################");
            await Task.Delay(-1);
        }
    }
}