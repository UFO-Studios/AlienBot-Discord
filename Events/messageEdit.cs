namespace AlienBot.Events
{
    using DSharpPlus;
    using DSharpPlus.EventArgs;
    using AlienBot.Database;
    using AlienBot.Events;

    public class MessageEdit
    {
        public static string[]? badWords;
        public static Users usersInstance = new Users();
        public static LogChannel logChannelInstance = new LogChannel();
        public static async Task BadWordsFilter()
        {
            if (File.Exists("badwords.txt"))
            {
                badWords = File.ReadAllLines("badwords.txt");
                Console.WriteLine("Bad words list loaded.");
            }
            else
            {
                Console.WriteLine("Downloading bad words list...");
                var badWordsListURL = "http://www.bannedwordlist.com/lists/swearWords.txt";
                using (var client = new HttpClient())
                {
                    var response = await client.GetAsync(badWordsListURL);

                    if (response.IsSuccessStatusCode)
                    {
                        var badWordsData = await response.Content.ReadAsStringAsync();
                        File.WriteAllText("badwords.txt", badWordsData);
                        badWords = File.ReadAllLines("badwords.txt");
                        Console.WriteLine("Bad words list downloaded and saved.");
                    }
                    else
                    {
                        Console.WriteLine("Failed to download bad words list. Continuing without bad words filter.");
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
                    await logChannelInstance.SendEventLog(e.Guild.Id.ToString(), client, "User " + e.Author.Username + " sent a banned word");
                }
            }
            await logChannelInstance.SendEventLog(e.Guild.Id.ToString(), client, "User " + e.Author.Username + " edited a message. \n Was `" + e.MessageBefore.Content + "`, now `" + e.Message.Content + "`");
        }

    }
}