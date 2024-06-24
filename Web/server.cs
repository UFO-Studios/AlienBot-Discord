using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Serilog;

namespace AlienBot.Web
{
    public class Server
    {
        public static async Task Start(string[] prefixes)
        {
            if (prefixes == null || prefixes.Length == 0)
                throw new ArgumentException("URI prefixes are required");

            HttpListener listener = new HttpListener();

            foreach (string prefix in prefixes)
            {
                listener.Prefixes.Add(prefix);
            }

            listener.Start();
            Log.Information("Bot panel listening on {0}", prefixes[0]);

            while (true)
            {
                HttpListenerContext context = await listener.GetContextAsync();
                HttpListenerRequest request = context.Request;
                HttpListenerResponse response = context.Response;

                //get info for panel
                string memory = Statistics.GetMemoryUsage();
                string cpu = Statistics.GetCpuUsage();
                string guilds = Statistics.GetBotGuilds(Primary.discord);
                string dbStats = await Statistics.GetDatabaseStats();


                string responseString = @$"
                <html>
                <head>
                <title>AlienBot Panel</title>
                </head>
                <body>
                <h1>AlienBot Panel</h1>
                <br>
                <h2>Bot Statistics</h2>
                <p>Memory Usage: {memory} bytes</p>
                <p>CPU Usage: {cpu} seconds</p>
                <p>Connected Guilds: {guilds}</p>
                <br>
                <h2>Database Statistics</h2>
                <p>MongoDB Version: {dbStats}</p>
                </body>
                </html>
                ";
                byte[] buffer = Encoding.UTF8.GetBytes(responseString);

                response.ContentLength64 = buffer.Length;
                Stream output = response.OutputStream;
                await output.WriteAsync(buffer, 0, buffer.Length);
                output.Close();
            }
        }
    }
}