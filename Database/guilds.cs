namespace AlienBot.Database
{
    using MongoDB.Driver;
    using MongoDB.Bson;

    public class Guilds
    {
        public static IMongoCollection<BsonDocument> guilds;

        public async Task NewGuild(string GuildID)
        {
            var guildDocument = new BsonDocument 
            {
                { "GuildID", GuildID },
                { "Logging Channel", "none" },
                { "NSFW Status", "false" }
            };
            await guilds.InsertOneAsync(guildDocument);
            
        }
    }
}