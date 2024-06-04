namespace AlienBot.Database
{
    using MongoDB.Driver;
    using MongoDB.Bson;

    //DATABASE STRUCTURE: 
    // AlienBot
    //  - Users
    //      - UserID
    //      - xp
    //      - warns?
    //  - Guilds
    //      - GuildID
    //      - Logging Channel
    //      - NSFW Status

    public class Connect
    {
        public static IMongoDatabase db;

        public static void ConnectToDB(string uri)
        {
            var client = new MongoClient(uri);
            db = client.GetDatabase("AlienBot");
            Users.users = db.GetCollection<BsonDocument>("users");
            Guilds.guilds = db.GetCollection<BsonDocument>("guilds");
            Console.WriteLine("Connected to MongoDB!");
            Users.users.Indexes.CreateOne(new CreateIndexModel<BsonDocument>(Builders<BsonDocument>.IndexKeys.Ascending("xp"))); //sorted by XP, because more active users have more XP
            Guilds.guilds.Indexes.CreateOne(new CreateIndexModel<BsonDocument>(Builders<BsonDocument>.IndexKeys.Ascending("GuildID")));
        }
    }

}