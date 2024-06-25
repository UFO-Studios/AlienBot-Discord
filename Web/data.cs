/*
* Collects data to be used in the bots panel.
* E.g memory, database (+opearations) and bot statistics.
*/

namespace AlienBot.Web
{
    using AlienBot;
    using DSharpPlus;
    using MongoDB.Bson;
    using MongoDB.Driver;
    using Serilog;

    public class Statistics
    {
        //HARDWARE
        public static string GetMemoryUsage()
        {
            var memory = GC.GetTotalMemory(true);
            memory = memory / 1024 / 1024; // Convert to MB
            // Log.Information("Memory usage: {0}", memory);
            return memory.ToString();
        }
        public static string GetCpuUsage()
        {
            var cpu = System.Diagnostics.Process.GetCurrentProcess().TotalProcessorTime.TotalSeconds;
            // Log.Information("CPU time used: {0}", cpu);
            return cpu.ToString();
        }

        public static async Task<string> GetDatabaseStats()
        {
            var client = new MongoClient(Primary.MONGO_URI);
            var db = client.GetDatabase("alienbot");

            // Retrieve MongoDB server version
            var buildInfoCommand = new BsonDocument("buildInfo", 1);
            var buildInfoResult = await db.RunCommandAsync<BsonDocument>(buildInfoCommand);
            var mongoDbVersion = buildInfoResult["version"].AsString;

            // Log.Information("MongoDB version: {0}", mongoDbVersion);
            return mongoDbVersion.ToString();
        }
        public static string GetBotGuilds(DiscordClient client)
        {
            if (client == null)
            {
                return "Discord ERROR";
            }
            var guilds = client.Guilds.Count;
            return guilds.ToString();
        }
    }
}