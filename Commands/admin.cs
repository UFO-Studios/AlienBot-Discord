using AlienBot.Events;
using DSharpPlus.Entities;
using DSharpPlus.SlashCommands;

namespace AlienBot.Commands
{
    public class Admin : ApplicationCommandModule
    {
        //
        /// <summary>
        /// Sends a reply message in response to an interaction.
        /// </summary>
        /// <param name="ctx">The interaction context.</param>
        /// <param name="isPrivate">A boolean indicating whether the reply should be sent privately.</param>
        /// <param name="message">The message content.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
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
        [SlashCommand("steal-emoji", "Steals an emoji from another server.")]
        public async Task StealEmoji(InteractionContext ctx, [Option("emoji", "The emoji to steal.")] string message)
        {
            //emoji url template: https://cdn.discordapp.com/emojis/${parsedEmoji.id}.png
            //<:AlienPog:1001457068592611329>
            //check perm
            if (!ctx.Member.PermissionsIn(ctx.Channel).HasPermission(DiscordPermissions.ManageEmojis))
            {
                await Reply(ctx, false, "You don't have permission to do that!");
                return;
            }
            if (!message.Contains("<:") || !message.Contains(">"))
            {
                await Reply(ctx, false, "That's not a valid emoji!");
                return;
            }
            var emojiID = message.Split(":")[2].Split(">")[0];
            var emojiURL = $"https://cdn.discordapp.com/emojis/{emojiID}.png";
            var emojiName = message.Split(":")[1];;
            var emojiImage = await new HttpClient().GetStreamAsync(emojiURL);
            var memoryStream = new MemoryStream();
            await emojiImage.CopyToAsync(memoryStream);
            memoryStream.Position = 0; // Reset the position to the beginning of the stream
            await ctx.Guild.CreateEmojiAsync(emojiName, memoryStream);
            await Reply(ctx, false, $"Emoji {emojiName} added! ({emojiURL})");
        }
    }

}