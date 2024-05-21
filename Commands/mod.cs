using DSharpPlus.Entities;
using DSharpPlus.SlashCommands;

namespace AlienBot.Commands
{
    public class Mod : ApplicationCommandModule
    {

        public async Task Reply(InteractionContext ctx, bool isPrivate, string message)
        {
            await ctx.CreateResponseAsync(DiscordInteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().WithContent(message).AsEphemeral(isPrivate));
        }
        [SlashCommand("ban", "Ban a user")]
        public async Task BanCommand(InteractionContext ctx, [Option("user", "The user to ban")] DiscordUser user)
        {
            var guild = ctx.Guild;
            var member = await guild.GetMemberAsync(user.Id);
            await member.BanAsync();
            await Reply(ctx, false, $"Banned {user.Username}");
        }
        [SlashCommand("kick", "Kick a user")]
        public async Task KickCommand(InteractionContext ctx, [Option("user", "The user to ban")] DiscordUser user)
        {
            var guild = ctx.Guild;
            var member = await guild.GetMemberAsync(user.Id);
            await member.RemoveAsync();
            await Reply(ctx, false, $"Kicked {user.Username}");
        }
        [SlashCommand("lockdown", "Locks down the current channel")]
        public async Task LockdownCommand(InteractionContext ctx)
        {
            var channel = ctx.Channel;
            // await channel.AddOverwriteAsync(DiscordMember member, [DiscordPermissions allow = DiscordPermissions.None], [DiscordPermissions deny = DiscordPermissions.None], [string? reason = null]);
            await Reply(ctx, false, "Channel locked down");
        }
    }
}