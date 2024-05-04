namespace AlienBot.Commands
{
    using DSharpPlus;
    using DSharpPlus.Entities;
    using DSharpPlus.SlashCommands;
    public class PingCommand
    {
        [SlashCommand("ping", "Replies with pong!")]
        public async Task PingCommandMethod(InteractionContext ctx)
        {
            await ctx.CreateResponseAsync(InteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().WithContent("Pong!"));
        }
    }
}