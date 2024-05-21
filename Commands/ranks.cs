namespace AlienBot.Commands
{
    using AlienBot.Database;
    using DSharpPlus.Entities;
    using DSharpPlus.SlashCommands;

    public class rankCommands
    {
        public async Task Reply(InteractionContext ctx, bool isPrivate, string message)
        {
            await ctx.CreateResponseAsync(DiscordInteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().WithContent(message).AsEphemeral(isPrivate));
        }
        [SlashCommand("rank", "Get your rank")]
        public async Task RankCommand(InteractionContext ctx)
        {
            var user = ctx.User;
            Users luser = new();
            var xp = await luser.GetXP(user.Id.ToString());
            await Reply(ctx, true, "Your rank is: " + xp.ToString());
        }
    }
}