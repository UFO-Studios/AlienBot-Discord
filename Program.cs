namespace AlienBot
{
    using System;
    using System.Net.WebSockets;
    using System.Text;
    using System.Threading;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    using AlienBot.Events;

    public class Primary
    {
        static string API_VERSION = "10";
        static string BOT_VERSION = "3.0";
        static string GATEWAY_URI = "wss://gateway.discord.gg/?v=" + API_VERSION + "&encoding=json";
        static string BOT_TOKEN = "";


        public static async Task Main()
        {
            //STARTUP BANNER ################################################
            Console.WriteLine("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
            Console.WriteLine("█ ▄▄▀██ ████▄ ▄██ ▄▄▄██ ▀██ ██ ▄▄▀██ ▄▄▄ █▄▄ ▄▄███ ▄▄ ████ ▄▄ █");
            Console.WriteLine("█ ▀▀ ██ █████ ███ ▄▄▄██ █ █ ██ ▄▄▀██ ███ ███ ███████▄▀█▀▀█ ▀▄ █");
            Console.WriteLine("█ ██ ██ ▀▀██▀ ▀██ ▀▀▀██ ██▄ ██ ▀▀ ██ ▀▀▀ ███ █████ ▀▀ █▄▄█ ▀▀ █");
            Console.WriteLine("▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀");
            Console.WriteLine("AlienBot Discord V" + BOT_VERSION + "  Made with 👽 & 💖 by UFO Studios.");

            //WEBSOCKET CONNECTION ############################################
            Console.WriteLine("Connecting to Discord Gateway V" + API_VERSION + "...");

            Uri GURI = new Uri(GATEWAY_URI);
            using (ClientWebSocket client = new ClientWebSocket())
            {
                await client.ConnectAsync(GURI, CancellationToken.None);
                Console.WriteLine("Connected to Discord Gateway V" + API_VERSION + "!");

                // Send Identify handshake. This tells discord who we are and what events we want.
                var identifyPayload = new
                {
                    op = 2,
                    d = new
                    {
                        token = BOT_TOKEN,
                        intents = 27775490141430,
                        properties = new
                        {
                            os = "linux",
                            browser = "UFOST-ABDC", //UFO Studios AlienBot Discord Client
                            device = "UFOST-ABDC"
                        }
                    }
                };
                string jsonString = JsonConvert.SerializeObject(identifyPayload);
                ArraySegment<byte> bytesToSend = new ArraySegment<byte>(Encoding.UTF8.GetBytes(jsonString));
                await client.SendAsync(bytesToSend, WebSocketMessageType.Text, true, CancellationToken.None);

                byte[] receiveBuffer = new byte[1024];

                bool FirstRun = false;


                while (true)
                {
                    // Receive data from the websocket
                    var result = await client.ReceiveAsync(new ArraySegment<byte>(receiveBuffer), CancellationToken.None);

                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        string message = Encoding.UTF8.GetString(receiveBuffer, 0, result.Count);
                        Console.WriteLine("Received: {0}", message);

                        // Parse the JSON message
                        JObject jsonMessage = JObject.Parse(message);

                        // Get heartbeat data
                        string heartbeat_d = jsonMessage["d"].ToString();
                        Console.WriteLine("Heartbeat data: {0}", heartbeat_d);
                        Heartbeat.DValue = heartbeat_d;

                        // If its the first run of the loop, find the heartbeat interval
                        if (!FirstRun)
                        {
                            FirstRun = true;
                            if (jsonMessage["d"]?["heartbeat_interval"] != null)
                            {
                                int heartbeatInterval = jsonMessage["d"]["heartbeat_interval"].Value<int>();
                                Console.WriteLine("Heartbeat interval: {0}", heartbeatInterval);

                                // Generate a random jitter value between 0 and 1
                                Random random = new Random();
                                double jitter = random.NextDouble();

                                // Calculate the delay before sending the first heartbeat
                                int delay = (int)(heartbeatInterval * jitter);

                                // Wait for the delay before starting the heartbeat
                                await Task.Delay(delay);

                                // Start the heartbeat
                                Heartbeat.StartHeartbeat(client, heartbeatInterval);
                            }
                        }
                    }
                    else if (result.MessageType == WebSocketMessageType.Close)
                    {
                        await client.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
                        Console.WriteLine("Websocket closed.");
                        break;
                    }
                }
            }
        }
    }
}