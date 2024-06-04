using DSharpPlus.Entities;
using DSharpPlus.SlashCommands;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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

        [SlashCommand("meme", "sends a meme!")]
        public async Task MemeCommand(InteractionContext ctx)
        {
            var memeResponse = await new HttpClient().GetStringAsync("https://meme-api.com/gimme");
            var meme = JObject.Parse(memeResponse);
            var memeUrl = meme["url"].ToString();
            var memeTitle = meme["title"].ToString();
            var memeNSFW = meme["nsfw"].ToString();
            while (memeNSFW == "true")
            {
                memeResponse = await new HttpClient().GetStringAsync("https://meme-api.com/gimme");
                meme = JObject.Parse(memeResponse);
                memeUrl = meme["url"].ToString();
                memeTitle = meme["title"].ToString();
                memeNSFW = meme["nsfw"].ToString();
            }
            var embed = new DiscordEmbedBuilder()
                .WithTitle(memeTitle)
                .WithImageUrl(memeUrl)
                // .WithDescription("Send 'next' to get another meme!")
                .WithColor(new DiscordColor("#FF0000"));
            await ctx.CreateResponseAsync(DiscordInteractionResponseType.ChannelMessageWithSource, new DiscordInteractionResponseBuilder().AddEmbed(embed).AsEphemeral(false));
            
        }
    }

}