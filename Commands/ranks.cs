namespace AlienBot.Commands
{
    using AlienBot.Database;
    using DSharpPlus.Entities;
    using DSharpPlus.SlashCommands;

    public class rankCommands : ApplicationCommandModule
    {
        public static async Task Reply(InteractionContext ctx, bool isPrivate, string message)
        {
            await ctx.CreateResponseAsync(DiscordInteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().WithContent(message).AsEphemeral(isPrivate));
        }
        [SlashCommand("rank", "Get your rank")]
        public async Task RankCommand(InteractionContext ctx)
        {
            var user = ctx.User;
            Users luser = new();
            var xp = await luser.GetXP(user.Id.ToString());
            var rank = xp / 100;
            var progressBar = "";
            var progress = xp % 100 / 10; // Calculate how many "##" should be added

            for (int i = 0; i < progress; i++)
            {
                progressBar += "##";
            }
            while (progressBar.Length < 20) // 20 because "##" is 2 characters and we want a total of 10 "##" or "--"
            {
                progressBar += "--";
            }
            await Reply(ctx, false, "Your rank is: " + rank.ToString() + "!\n" + progressBar + " (" + (progress - 100).ToString() + " xp to go)");
        }
    }
}