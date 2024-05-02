namespace AlienBot.Events
{
    using System;
    using System.Net.WebSockets;
    using System.Text;
    using System.Threading;
    using Newtonsoft.Json;

    public class Heartbeat
    {
        public static string DValue { get; set; } = "null";

        public static async void StartHeartbeat(ClientWebSocket client, int interval)
        {
            while (client.State == WebSocketState.Open)
            {
                var heartbeatPayload = new
                {
                    op = 1,
                    d = DValue
                };
                string jsonString = JsonConvert.SerializeObject(heartbeatPayload);
                ArraySegment<byte> bytesToSend = new ArraySegment<byte>(Encoding.UTF8.GetBytes(jsonString));
                await client.SendAsync(bytesToSend, WebSocketMessageType.Text, true, CancellationToken.None);
                Console.WriteLine("Heartbeat sent at " + DateTime.Now);
                await Task.Delay(interval);
            }
        }
    }
}