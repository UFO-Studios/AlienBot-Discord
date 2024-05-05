namespace AlienBot.Database
{
    using MongoDB.Driver;
    using MongoDB.Bson;

    public class Connect
    {
        public static IMongoDatabase db;

        public static void ConnectToDB(string uri)
        {
            var client = new MongoClient(uri);
            db = client.GetDatabase("AlienBot");
        }
    }

}