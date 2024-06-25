using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.FileSystemGlobbing.Internal.PathSegments;
using Serilog;
using System.Linq;
using AlienBot.Events;
using System.Collections.Concurrent;

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


                var responseString = CreateHTMLResponse(memory, cpu, guilds, dbStats);
                byte[] buffer = Encoding.UTF8.GetBytes(responseString);

                response.ContentLength64 = buffer.Length;
                Stream output = response.OutputStream;
                await output.WriteAsync(buffer, 0, buffer.Length);
                output.Close();
            }
        }
        //
        public static string CreateHTMLResponse(string memory, string cpu, string guilds, string mdbv)
        {
            ConcurrentBag<string> eventMessages = InMemorySink.Events;
            /*Log.Information("EventMessages: {0}", eventMessages.Count);
            Log.Information(eventMessages[0].Properties.ToString() + "Properties");*/
            string LM1 = eventMessages.ElementAtOrDefault(0);
            string LM2 = eventMessages.ElementAtOrDefault(1);
            string LM3 = eventMessages.ElementAtOrDefault(2);
            string LM4 = eventMessages.ElementAtOrDefault(3);
            return @$"
            <html>
            <head>
            <title>AlienBot Panel</title>
            </head>
            <style>
            .container " + "{" + @"
                width: 80%;
                height: 200px;
                margin: auto;
                padding: 10px;
            }
            
            .one {
                width: 15%;
                height: 200px;
                float: left;
            }
            
            .two {
                margin-left: 15%;
                height: 200px;
                float: right;
            }
            </style>" + @$"
            <body>
            <h1>AlienBot Panel</h1>
            <br>
            <section class='container'>
            <div class='one'>
            <h2>Bot Statistics</h2>
            <p>Memory Usage: {memory} MB</p>
            <p>CPU Usage: {cpu} seconds</p>
            <p>Connected Guilds: {guilds}</p>
            </div>
            <div class='two'>
            <h2>Database Statistics</h2>
            <p>MongoDB Version: {mdbv}</p>
            </div>
            <h3 style='text-align: center;'>Latest Log messages:</h3>
            <p style='text-align: center;'>[LOGS]</p>" + @$"
            <p style='text-align: center;'>{LM1}</p>
            <p style='text-align: center;'>{LM2}</p>
            <p style='text-align: center;'>{LM3}</p>
            <p style='text-align: center;'>{LM4}</p>
            <br>
            </section>
            </body>
            </html>
                ";
            /*

            */
        }
    }
}