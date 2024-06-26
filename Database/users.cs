namespace AlienBot.Database
{
    using MongoDB.Driver;
    using MongoDB.Bson;

    public class Users
    {
        public static IMongoCollection<BsonDocument> users;

        public static async Task NewUser(string UserID, int xp = 0, int warns = 0)
        {
            var usrDocument = new BsonDocument
            {
                { "UserID", UserID },
                { "xp", xp },
                { "warns", warns }
            };
            await users.InsertOneAsync(usrDocument);
        }

        public async Task AddXP(string UserID, int xp)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("UserID", UserID);
            var user = await users.Find(filter).FirstOrDefaultAsync();
            if (user == null)
            {
                await NewUser(UserID, 1);
            }
            else
            {
                var newXP = user["xp"].AsInt32 + xp;
                var update = Builders<BsonDocument>.Update.Set("xp", newXP);
                await users.UpdateOneAsync(filter, update);
            }
        }

        public async Task AddWarn(string UserID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("UserID", UserID);
            var user = await users.Find(filter).FirstOrDefaultAsync();
            if (user == null)
            {
                await NewUser(UserID, 0, 1);
            }
            else
            {
                var newXP = user["warns"].AsInt32 + 1;
                var update = Builders<BsonDocument>.Update.Set("warns", newXP);
                await users.UpdateOneAsync(filter, update);
            }
        }
        public async Task<int> GetXP(string UserID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("UserID", UserID);
            var user = await users.Find(filter).FirstOrDefaultAsync();
            if (user == null)
            {
                await NewUser(UserID, 0);
                return 0;
            }
            else
            {
                return user["xp"].AsInt32;
            }
        }
    }
}