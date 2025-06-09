namespace AlienBot.Events
{
    using DSharpPlus;
    using Serilog;
    using AlienBot.Database;
    using DSharpPlus.EventArgs;

    public class ChannelEvents
    {
        /*This is one class, becuase it is only logging. No mod events*/
        public static async Task OnCreate(DiscordClient client, ChannelCreateEventArgs e)
        {
            string channelName = e.Channel.Name;
            /*^ name, e.g "my-great-channel"*/
            string channelDisplayName = e.Channel.Mention;
            /*^ mention, like when you see "#my-great-channel" (with link)*/
            string guildID = e.Channel.GuildId.ToString() ?? "";
            string dateTime = "<t:" + DateTimeOffset.UtcNow.ToUnixTimeSeconds() + ">";

            string LogMessage = $"## Channel Created\n Channel {channelName} ({channelDisplayName}) was created at {dateTime} ";

            // client.SendMessageAsync();
            return;
        }

        // public static async Task OnModify()
        // {

        // }

        // public static async Task OnDelete()
        // {

        // }

    }
}