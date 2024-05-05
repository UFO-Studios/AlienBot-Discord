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
        }
    }

}