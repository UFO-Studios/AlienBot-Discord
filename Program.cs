namespace AlienBot
{
    using System;

    using DSharpPlus;
    using DSharpPlus.SlashCommands;

    using AlienBot.Events;
    using AlienBot.Commands;
    public class Primary
    {
        static string API_VERSION = "10";
        static string BOT_VERSION = "3.0";
        static string BOT_TOKEN = "";
        static string MONGO_URI = "";



        public static Task LoadConfig()
        {
            var configFile = "config.txt";
            if (File.Exists(configFile))
            {
                var config = File.ReadAllLines(configFile);
                BOT_TOKEN = config[0];
                MONGO_URI = config[1];
                return Task.CompletedTask;
            } else {
                Console.WriteLine("No config file found! Is it in the same directory as the bot?");
                Exception e = new FileNotFoundException();
                return Task.FromException(e);
            }
        }

        public static async Task Main()
        {
            //STARTUP BANNER ################################################
            Console.WriteLine("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
            Console.WriteLine("█ ▄▄▀██ ████▄ ▄██ ▄▄▄██ ▀██ ██ ▄▄▀██ ▄▄▄ █▄▄ ▄▄███ ▄▄ ████ ▄▄ █");
            Console.WriteLine("█ ▀▀ ██ █████ ███ ▄▄▄██ █ █ ██ ▄▄▀██ ███ ███ ███████▄▀█▀▀█ ▀▄ █");
            Console.WriteLine("█ ██ ██ ▀▀██▀ ▀██ ▀▀▀██ ██▄ ██ ▀▀ ██ ▀▀▀ ███ █████ ▀▀ █▄▄█ ▀▀ █");
            Console.WriteLine("▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀");
            Console.WriteLine("AlienBot Discord V" + BOT_VERSION + "  Made with 👽 & 💖 by UFO Studios.");

            //LOAD OTHER LIBS ################################################

            _ = LoadConfig();
            await MessageCreate.BadWordsFilter();


            //DISCORD CONNECTION ############################################
            Console.WriteLine("Connecting to Discord Gateway V" + API_VERSION + "...");

            var discord = new DiscordClient(new DiscordConfiguration()
            {
                Token = BOT_TOKEN,
                TokenType = TokenType.Bot,
                Intents = DiscordIntents.All
            });

            var slash = discord.UseSlashCommands();

            slash.RegisterCommands<Ping>();
            slash.RegisterCommands<Bread>();

            //EVENT HANDLERS #################################################
            discord.MessageCreated += MessageCreate.Handler;

            //COMMANDS #######################################################
           

            await discord.ConnectAsync();
            Console.WriteLine("Connected to Discord Gateway V" + API_VERSION + "!");
            await Task.Delay(-1);
        }
    }
}