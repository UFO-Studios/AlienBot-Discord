namespace AlienBot.Database
{
    using MongoDB.Driver;
    using MongoDB.Bson;

    public class Users
    {
        public static IMongoCollection<BsonDocument> users;

        public async Task NewUser(string UserID)
        {
            var usrDocument = new BsonDocument
            {
                { "UserID", UserID },
                { "xp", 0 },
                { "warns", 0 }
            };
            await users.InsertOneAsync(usrDocument);
        }

        public async Task AddXP(string UserID, int xp)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("UserID", UserID);
            var user = await users.Find(filter).FirstOrDefaultAsync();
            var newXP = user["xp"].AsInt32 + xp;
            var update = Builders<BsonDocument>.Update.Set("xp", newXP);
            await users.UpdateOneAsync(filter, update);
        }

        public async Task AddWarn(string UserID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("UserID", UserID);
            var user = await users.Find(filter).FirstOrDefaultAsync();
            var newXP = user["warns"].AsInt32 + 1;
            var update = Builders<BsonDocument>.Update.Set("warns", newXP);
            await users.UpdateOneAsync(filter, update);
        }
    }
}