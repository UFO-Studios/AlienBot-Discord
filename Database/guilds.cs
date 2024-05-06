namespace AlienBot.Database
{
    using MongoDB.Driver;
    using MongoDB.Bson;

    public class Guilds
    {
        public static IMongoCollection<BsonDocument> guilds;

        public static async Task NewGuild(string GuildID)
        {
            var guildDocument = new BsonDocument
            {
                { "GuildID", GuildID },
                { "LChannel", "none" },
                { "NSFW", "false" }
            };
            //does it already exist?
            var filter = Builders<BsonDocument>.Filter.Eq("GuildID", GuildID);
            var guild = await guilds.Find(filter).FirstOrDefaultAsync();
            if (guild != null)
            {
                return;
            }
            else
            {
                await guilds.InsertOneAsync(guildDocument);
            }
        }
        public static async Task SetLoggingChannel(string GuildID, string ChannelID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("GuildID", GuildID);
            var update = Builders<BsonDocument>.Update.Set("LChannel", ChannelID);
            await guilds.UpdateOneAsync(filter, update);
        }
        public async Task<string> GetLoggingChannel(string GuildID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("GuildID", GuildID);
            if (filter == null)
            {
                await NewGuild(GuildID);
                return "null";
            }
            else
            {
                var guild = await guilds.Find(filter).FirstOrDefaultAsync();
                return guild.GetValue("LChannel").AsString;
            }
        }
        public static async Task SetNSFWDelete(string GuildID, string ChannelID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("GuildID", GuildID);
            var update = Builders<BsonDocument>.Update.Set("NSFW", ChannelID);
            await guilds.UpdateOneAsync(filter, update);
        }
        public async Task<bool> GetNSFWDelete(string GuildID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("GuildID", GuildID);
            if (filter == null)
            {
                await NewGuild(GuildID);
                return false; //default is false
            }
            else
            {
                var guild = await guilds.Find(filter).FirstOrDefaultAsync();
                return guild.GetValue("NSFW").AsBoolean;
            }
        }
    }
}