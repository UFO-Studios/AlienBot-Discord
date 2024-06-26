namespace AlienBot.Events
{
    using DSharpPlus;
    using DSharpPlus.EventArgs;
    using AlienBot.Database;
    using Serilog;

    public class MessageEdit
    {
        public static string[]? badWords;
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
        public static async Task Handler(DiscordClient client, MessageUpdateEventArgs e)
        {
            if (e.Author.IsBot)
            {
                return;
            }
            var message = e.Message.ToString();
            for (int i = 0; i < badWords?.Length; i++)
            {
                if (message.Contains(badWords[i]))
                {
                    await e.Message.DeleteAsync("Bad word! :(");
                    await e.Message.RespondAsync("You can't use that word! (WARN)");
                    await usersInstance.AddWarn(e.Author.Id.ToString());
                    await LogChannel.SendEventLog(e.Guild.Id.ToString(), client, "User " + e.Author.Username + " sent a banned word");
                }
            }
            await LogChannel.SendEventLog(e.Guild.Id.ToString(), client, "User " + e.Author.Username + " edited a message. \n Was `" + e.MessageBefore.Content + "`, now `" + e.Message.Content + "`");
        }

    }
}