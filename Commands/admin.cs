using AlienBot.Events;
using DSharpPlus.Entities;
using DSharpPlus.SlashCommands;

namespace AlienBot.Commands
{
    public class Admin : ApplicationCommandModule
    {
        public async Task Reply(InteractionContext ctx, bool isPrivate, string message)
        {
            await ctx.CreateResponseAsync(DiscordInteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().WithContent(message).AsEphemeral(isPrivate));
        }
        [SlashCommand("setLogChannel", "Sets the log channel to the one the cmd is run in.")]
        public async Task PingCommand(InteractionContext ctx)
        {
            var channel = ctx.Channel.Id.ToString();
            var guild = ctx.Guild.Id.ToString();
            LogChannel logChannelInstance = new LogChannel();
            await logChannelInstance.setLogChannel(guild, channel);
            await Reply(ctx, false, "Log channel set to this channel!");
        }
    }

}