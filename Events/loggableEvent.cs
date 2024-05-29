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
            Console.WriteLine(GuildID + " " + LatestGuild + " " + LatestChannel);
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
                } else {
                    var channel2 = guild.GetValue("alien-logs").AsString;
                    var channelObj2 = await client.GetChannelAsync(ulong.Parse(channel2));
                    await channelObj2.SendMessageAsync(Event);

                }
                var channelObj = await client.GetChannelAsync(ulong.Parse(channel));
                await channelObj.SendMessageAsync(Event);
            }
            } catch (Exception e)
            {
                // Console.WriteLine(e);
                
            }
        }

        public async Task setLogChannel(string GuildID, string ChannelID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("GuildID", GuildID);
            var update = Builders<BsonDocument>.Update.Set("LChannel", ChannelID);
            await Guilds.guilds.UpdateOneAsync(filter, update);
        }


        public async Task<string> getLogChannel(string GuildID)
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
}