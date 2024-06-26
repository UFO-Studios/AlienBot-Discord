using DSharpPlus.Entities;
using DSharpPlus.SlashCommands;
using AlienBot.Events;
using AlienBot.Database;

namespace AlienBot.Commands
{
    public class Mod : ApplicationCommandModule
    {

        public static async Task Reply(InteractionContext ctx, bool isPrivate, string message)
        {
            await ctx.CreateResponseAsync(DiscordInteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().WithContent(message).AsEphemeral(isPrivate));
        }
        [SlashCommand("ban", "Ban a user")]
        public static async Task BanCommand(InteractionContext ctx, [Option("user", "The user to ban")] DiscordUser user)
        {
            var guild = ctx.Guild;
            var member = await guild.GetMemberAsync(user.Id);
            await member.BanAsync();
            await Reply(ctx, false, $"Banned {user.Username}");
        }
        [SlashCommand("kick", "Kick a user")]
        public static async Task KickCommand(InteractionContext ctx, [Option("user", "The user to ban")] DiscordUser user)
        {
            var guild = ctx.Guild;
            var member = await guild.GetMemberAsync(user.Id);
            await member.RemoveAsync();
            await Reply(ctx, false, $"Kicked {user.Username}");
        }
        [SlashCommand("lockdown", "Locks down the current channel")]
        public static async Task LockdownCommand(InteractionContext ctx)
        {
            var channel = ctx.Channel;
            await channel.AddOverwriteAsync(ctx.Guild.EveryoneRole, deny: DiscordPermissions.SendMessages);
            await Reply(ctx, false, "Channel locked down");
        }
        [SlashCommand("unlock", "Unlocks the current channel")]
        public static async Task UnlockCommand(InteractionContext ctx)
        {
            var channel = ctx.Channel;
            await channel.AddOverwriteAsync(ctx.Guild.EveryoneRole, allow: DiscordPermissions.SendMessages);
            await Reply(ctx, false, "Channel unlocked");
        }
        // [SlashCommand("toggleSwearFilter", "Toggles the swear filter")]
        // public async Task ToggleSwearFilterCommand(InteractionContext ctx)
        // {
        //     var guild = ctx.Guild;
        //     var badWordFilter = MessageCreate.badWords;

        // }
        [SlashCommand("warn", "Warn a user")]
        public static async Task WarnCommand(InteractionContext ctx, [Option("user", "The user to warn")] DiscordUser user, [Option("reason", "The reason for the warning")] string reason)
        {
            var guild = ctx.Guild;
            var member = await guild.GetMemberAsync(user.Id);
            var users = new Users();
            await users.AddWarn(user.Id.ToString());
            await Reply(ctx, false, $"Warned {user.Username} for {reason}");
        }
    }
}