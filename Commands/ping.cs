using DSharpPlus.Entities;
using DSharpPlus.SlashCommands;

namespace AlienBot.Commands
{
    public class SlashCommands : ApplicationCommandModule
    {
        [SlashCommand("ping", "Replies with pong!")]
        public async Task PingCommand(InteractionContext ctx)
        {
            await ctx.CreateResponseAsync(DiscordInteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().WithContent("Pong!").AsEphemeral(false));
        }
    }

}