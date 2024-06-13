namespace AlienBot
{
    using System;

    using DSharpPlus;
    using DSharpPlus.SlashCommands;

    using AlienBot.Events;
    using AlienBot.Commands;
    using DSharpPlus.Entities;
    using System.Diagnostics;

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
            }
            else
            {
                Console.WriteLine("No config file found! Is it in the same directory as the bot?");
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
            await Task.Delay(60*1000*5);
            }
        }

        public static async Task Main(string[] args)
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
            Console.WriteLine("Connecting to MongoDB...");
            Database.Connect.ConnectToDB(MONGO_URI);


            //DISCORD CONNECTION ############################################
            Console.WriteLine("Connecting to Discord Gateway V" + API_VERSION + "...");

            var discord = new DiscordClient(new DiscordConfiguration()
            {
                Token = BOT_TOKEN,
                TokenType = TokenType.Bot,
                Intents = DiscordIntents.All
            });

            var slash = discord.UseSlashCommands();

            slash.RegisterCommands<Text>();
            slash.RegisterCommands<Mod>();
            slash.RegisterCommands<Admin>();
            slash.RegisterCommands<rankCommands>();

            //EVENT HANDLERS #################################################
            discord.MessageCreated += MessageCreate.Handler;
            discord.MessageUpdated += MessageEdit.Handler;


            //COMMANDS #######################################################


            await discord.ConnectAsync();

            if (args.Length > 0)
            {
            if (args[0] == "migrate")
            {
                Console.WriteLine("Migrating database...");
                Console.WriteLine("Retriving all guilds...");
                var allGuilds = new List<DiscordGuild>();
                var i = 0;
                await foreach (var guild in discord.GetGuildsAsync())
                {
                    i++;
                    allGuilds.Add(guild);
                    await Database.Guilds.NewGuild(guild.Id.ToString());
                    Console.WriteLine("New guild added to database. (" + i + ")");

                }
            }
            }
            Console.WriteLine("Connected to Discord Gateway V" + API_VERSION + " as" + discord.CurrentUser.ToString().Split(";")[1] + "!");
            await Task.Delay(-1);
        }
    }
}