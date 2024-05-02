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

        public static int? LastSequenceNumber { get; set; } = 0;

        public static async void StartHeartbeat(ClientWebSocket client, int interval)
{
    while (client.State == WebSocketState.Open)
    {
        object heartbeatPayload; // Declare the variable here

        if (LastSequenceNumber == 0)
        {
            heartbeatPayload = new // Assign the value here
            {
                op = 1,
                d = "null"
            };
        }
        else
        {
            heartbeatPayload = new // or assign the value here
            {
                op = 1,
                d = LastSequenceNumber
            };
        }

        Console.WriteLine("Sending heartbeat data: " + heartbeatPayload);
        string jsonString = JsonConvert.SerializeObject(heartbeatPayload);
        ArraySegment<byte> bytesToSend = new ArraySegment<byte>(Encoding.UTF8.GetBytes(jsonString));
        await client.SendAsync(bytesToSend, WebSocketMessageType.Text, false, CancellationToken.None);
        Console.WriteLine("Heartbeat sent at " + DateTime.Now);
        await Task.Delay(interval - 50);
    }
}
    }
}