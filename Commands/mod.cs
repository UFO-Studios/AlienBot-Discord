using DSharpPlus.Entities;
using DSharpPlus.SlashCommands;

namespace AlienBot.Commands
{
    public class Mod : ApplicationCommandModule
    {

        public async Task Reply(InteractionContext ctx, bool isPrivate, string message)
        {
            await ctx.CreateResponseAsync(DiscordInteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().WithContent("Pong!").AsEphemeral(isPrivate));
        }
        [SlashCommand("ban", "Ban a user")]
        public async Task BanCommand(InteractionContext ctx, [Option("user", "The user to ban")] DiscordUser user)
        {
            var guild = ctx.Guild;
            var member = await guild.GetMemberAsync(user.Id);
            await member.BanAsync();
            await Reply(ctx, false, $"Banned {user.Username}");

        }
    }
}