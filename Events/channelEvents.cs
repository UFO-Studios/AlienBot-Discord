namespace AlienBot.Events
{
    using DSharpPlus;
    using Serilog;
    using AlienBot.Database;

    public class ChannelEvents 
    {
        /*This is one class, becuase it is only logging. No mod events*/
        public static async Task OnCreate(DiscordClient client, ChannelCreatedEventArgs e)
        {
            string channelName = e.Channel.channelName
            /*^ name, e.g "my-great-channel"*/
            string channelDisplayName = e.Channel.Mention
            /*^ mention, like when you see "#my-great-channel" (with link)*/
            string guildID = e.Channel.GuildID.toString()
            string dateTime = "<t:" + DateTimeOffset.UtcNow.ToUnixTimeSeconds() + ">"

            string LogMessage = "## Channel Created\n Channel " + channelName + " ("+channelDisplayName+ ") was created at " + 
        }

        public static async Task OnModify()
        {

        }

        public static async Task OnDelete()
        {

        }

    }
}