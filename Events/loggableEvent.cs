using AlienBot.Database;
using DSharpPlus;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AlienBot.Events
{
    using Serilog;
    using Serilog.Configuration;
    using Serilog.Core;
    using Serilog.Events;
    using System.Collections.Concurrent;
    public class LogChannel
    {
        //These are so that if a guild mass-deletes messages (or does any event in quick sucsession) we don't have to keep spamming the DB.
        public static string LatestChannel = "";
        public static string LatestGuild = "";
        public static async Task SendEventLog(string GuildID, DiscordClient client, string Event)
        {
            try
            {
                if (LatestGuild == GuildID)
                {
                    var channelObj = await client.GetChannelAsync(ulong.Parse(LatestChannel));
                    await channelObj.SendMessageAsync(Event);
                    return;
                }
                else
                {

                    var guild = await Guilds.guilds.Find(Builders<BsonDocument>.Filter.Eq("GuildID", GuildID)).FirstOrDefaultAsync();
                    var channel = guild.GetValue("LChannel").AsString;
                    if (channel != "none")
                    {
                        LatestChannel = channel;
                        LatestGuild = GuildID;
                    }
                    else
                    {
                        var channel2 = guild.GetValue("alien-logs").AsString;
                        var channelObj2 = await client.GetChannelAsync(ulong.Parse(channel2));
                        await channelObj2.SendMessageAsync(Event);

                    }
                    var channelObj = await client.GetChannelAsync(ulong.Parse(channel));
                    await channelObj.SendMessageAsync(Event);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);

            }
        }

        public static async Task setLogChannel(string GuildID, string ChannelID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("GuildID", GuildID);
            var update = Builders<BsonDocument>.Update.Set("LChannel", ChannelID);
            await Guilds.guilds.UpdateOneAsync(filter, update);
        }


        public static async Task<string> getLogChannel(string GuildID)
        {
            var guild = await Guilds.guilds.Find(Builders<BsonDocument>.Filter.Eq("GuildID", GuildID)).FirstOrDefaultAsync();
            return guild.GetValue("LChannel").AsString;
        }
        public async Task<bool> UpgradeLogChannel(string guildID, DiscordClient client)
        {
            //looking for a "alien-logs" channel from the djs version
            var guild = await Guilds.guilds.Find(Builders<BsonDocument>.Filter.Eq("GuildID", guildID)).FirstOrDefaultAsync();
            var channel = guild.GetValue("alien-logs").AsString;
            if (channel == "none") { return false; }
            await setLogChannel(guildID, channel);
            return true;
        }
    }


    public class InMemorySink(IFormatProvider formatProvider) : ILogEventSink
    {
        private readonly IFormatProvider _formatProvider = formatProvider;
        public static ConcurrentBag<string> Events = new ConcurrentBag<string>();

        public void Emit(LogEvent logEvent)
        {
            Events.Add(logEvent.RenderMessage(_formatProvider)); //renders only the text of the log message, not metatdata
            //limit logs to 20
            if (Events.Count > 20)
            {
                Events.TryTake(out _);
            }
        }
    }

    public static class LoggerSinkExtensions
    {
        public static LoggerConfiguration InMemorySink(
          this LoggerSinkConfiguration loggerConfiguration,
          IFormatProvider formatProvider = null)
        {
            return loggerConfiguration.Sink(new InMemorySink(formatProvider));
        }
    }
}