namespace AlienBot.Events
{
    using DSharpPlus;
    using DSharpPlus.EventArgs;
    using AlienBot.Database;
    using Serilog;

    public class MessageCreate
    {
        public static string[]? badWords; //type: ignore
        public static Users usersInstance = new();
        public static LogChannel logChannelInstance = new();

        public static async Task BadWordsFilter()
        {
            if (File.Exists("badwords.txt"))
            {
                badWords = File.ReadAllLines("badwords.txt");
                Log.Information("Bad words list loaded.");
            }
            else
            {
                Log.Information("Downloading bad words list...");
                var badWordsListURL = "http://www.bannedwordlist.com/lists/swearWords.txt";
                using (var client = new HttpClient())
                {
                    var response = await client.GetAsync(badWordsListURL);

                    if (response.IsSuccessStatusCode)
                    {
                        var badWordsData = await response.Content.ReadAsStringAsync();
                        File.WriteAllText("badwords.txt", badWordsData);
                        badWords = File.ReadAllLines("badwords.txt");
                        Log.Information("Bad words list downloaded and saved.");
                    }
                    else
                    {
                        Log.Information("Failed to download bad words list. Continuing without bad words filter.");
                    }
                }
            }
            return;
        }

        public static async Task Handler(DiscordClient client, MessageCreateEventArgs e)
        {
            if (e.Author.IsBot)
            {
                return;
            }
            var Lguilds = new Guilds();
            var message = e.Message.ToString();
            for (int i = 0; i < badWords?.Length; i++)
            {
                if (!await Guilds.GetNSFWDelete(e.Guild.Id.ToString())) //if it is set to delete
                {
                    if (message.Contains(badWords[i]))
                    {
                        await e.Message.DeleteAsync("Bad word! :(");
                        await e.Message.RespondAsync("You can't use that word! (WARN)");
                        await usersInstance.AddWarn(e.Author.Id.ToString());
                        var logMessage = "User " + e.Author.Username + " sent a banned word! Message: " + message.Replace(badWords[i], "****");
                        await LogChannel.SendEventLog(e.Guild.Id.ToString(), client, logMessage);
                    }
                }
            }
            Random random = new();
            await usersInstance.AddXP(e.Author.Id.ToString(), random.Next(1, 11));
        }
    }
}