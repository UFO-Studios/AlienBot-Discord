const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
import consoleModule from "../log"; const { consoleMessage } = consoleModule;

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("a list of all the commands AlienBot has."),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    // TODO:
    const embed = new EmbedBuilder()
      .setTitle("help command")
      .setDescription(
        "Here is a list of all the commands in AlienBot:\n\n> **Special characters**:\n`[]` - Required parameter\n`()` - Optional parameter\n\n> **Moderation**\n`/ban [target] (reason)` - Ban a member from the server.\n`/unban [user-id]` - Unban a user from the guild by their ID\n`/kick [target] (reason)` - Kick a member from the server.\n`/warn [target] (reason)` - Warn a member in the guild.\n`/timeout [target] [duration] (reason)` - timeout a member in the guild for a given amount of time.\n`/check-warns [target]` - Check warns of A member in the server.\n`/prune [amount]` - Prunes/Clears the given amount of msgs from a channel.\n\n> **Music**\n`/play [song-name]` - Play's a song in a VC.\n`/pause` - Pause the current playing song.\n`/resume` - Resume the current playing song.\n`/stop` - Stop the current playing song\n`/seek [seconds]` - Seek to the given timestamp.\n`/volume (volume)` - Get the current volume or set the volume.\n\n> **Logging**\nTo enable Channel, emoji and message logging, you need to create a channel called `alien-logs`, AlienBot will send logs there automatically.\n`/set-welcome [channel] (welcome-message) (leave-message)` - Sets the welcome channel where welcome and leave images will be sent, note: the welcome and leave messages are optional; the bot wont send any msg with the image if you dont set it.\n`/ignore-channel` - Set a channel to be ignored while logging channel updates.\n`/toggle-banned [toggle-value]` - toggles on/off banned words for the server.\n\n> **Tools**\n`/pfp (target)` - Get your or the target's profile picture.\n`/embed [channel] [title] [description] (color) (author) (thumbnail-url) (image-url) (footer-text) (footer-image-url)` - Send an embed to the given channel, `newline` in the description means a new line in the text.\n`/emoji-info [emoji]` - Get info about an emoji.\n`/namemc [username]` - Get info about a Minecraft Java player.\n`/server-info` - Get info about a server.\n`/user-info` - Get info about a user.\n`/steal-emoji [emoji]` - Steal an emoji, note: Discord Nitro is required for this command.\n\n> **General**\n`/about` - About the bot.\n`/bread` - Tells wether its mood is good or not.\n`/ping` -  Get the bot's current ping.\n`/randomText [size]` - Generate some random text.\n`/woof` - AlienBot woofs at you for no reason.\n`/help` - Get a list of all the commands that AlienBot offers.\n`/vote` - Get links to vote us at! (Please vote for us!)\n\n> **Image**\n`/meme` - Get a random meme.\n`/web-screenshot [website]` - Gets a screenshot of the given website.\n`/ad [image]` - Generate ad AD meme.\n`/beautiful [image]` - Generate a beautiful meme.\n`/bobross [image]` - Generate a bobross meme."
      )
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setColor("Blue")
      .setAuthor({ name: interaction.user.tag })
      .setTimestamp()
      .setFooter({
        text: `/help • AlienBot`,
        iconURL: "https://thealiendoctor.com/img/alienbot/face-64x64.png",
      });

    return await interaction.reply({ embeds: [embed] });
  },
};

//consoleMessage("help.js run", "botInit");
