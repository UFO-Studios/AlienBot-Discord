using DSharpPlus.Entities;
using DSharpPlus.SlashCommands;

namespace AlienBot.Commands
{
    public class Text : ApplicationCommandModule
    {
        [SlashCommand("ping", "Replies with pong!")]
        public async Task PingCommand(InteractionContext ctx)
        {
            await ctx.CreateResponseAsync(DiscordInteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().WithContent("Pong!").AsEphemeral(false));
        }

        [SlashCommand("bread", "Bread good or bread bad?")]
        public async Task BreadCommand(InteractionContext ctx)
        {
            var goodOrBad = new Random().Next(0, 2);
            if (goodOrBad == 0)
            {
                await ctx.CreateResponseAsync(DiscordInteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().WithContent("Bread :thumbsdown:!").AsEphemeral(false));
                return;
            }
            else
            {
                await ctx.CreateResponseAsync(DiscordInteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().WithContent("Bread :thumbsup:!").AsEphemeral(false));
                return;

            }
        }
    }

}