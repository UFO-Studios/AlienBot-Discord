using AlienBot.Database;
using DSharpPlus;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AlienBot.Events
{
    public class LogChannel
    {
        //These are so that if a guild mass-deletes messages (or does any event in quick sucsession) we don't have to keep spamming the DB.
        public static string LatestChannel = "";
        public static string LatestGuild = "";
        public async Task SendEventLog(string GuildID, DiscordClient client, string Event)
        {
            if (LatestGuild == GuildID)
            {
                var channelObj = await client.GetChannelAsync(ulong.Parse(LatestChannel));
                await channelObj.SendMessageAsync(Event);
                return;
            }
            else
            {
                LatestGuild = GuildID;
                var guild = await Guilds.guilds.Find(Builders<BsonDocument>.Filter.Eq("GuildID", GuildID)).FirstOrDefaultAsync();
                var channel = guild.GetValue("LChannel").AsString;
                if (channel == "none") { return; }
                LatestChannel = channel;
                var channelObj = await client.GetChannelAsync(ulong.Parse(channel));
                await channelObj.SendMessageAsync(Event);
            }
        }
    }
}