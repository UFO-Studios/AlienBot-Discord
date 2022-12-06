const {
  ContextMenuCommandInteraction,
  ContextMenuCommandBuilder,
  Client,
  PermissionsBitField,
  ApplicationCommandType,
  EmbedBuilder,
  User,
} = require("discord.js");
const mongo = require("../mongodb");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("check rank")
        .setType(ApplicationCommandType.User),
    global: true,
    /**
     *
     * @param {ContextMenuCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        /**
         * @type {User}
         */
        const target = interaction.targetUser;

        if (target.bot) return await interaction.reply(
            "You cannot check XP of a bot!"
        );

        const user_rank = await mongo.getXP(interaction.client.id);

        if (!user_rank) {
            return await interaction.reply({ content: "You dont have any XP!" });

            const embed = new EmbedBuilder()
                .setAuthor({ name: target.tag })
                .setThumbnail(target.displayAvatarURL({ dynamic: true }))
                .setTitle("Rank")
                .setDescription(`${target.tag}'s XP is: ${user_rank}`)
                .setColor("Blue")
                .setTimestamp()
                .setFooter({
                    text: "/rank • AlienBot",
                    iconURL:
                        "https://thealiendoctor.com/img/alienbot/face-64x64.png",
                });

            return await interaction.reply({ embeds: [embed] });
        }
    }
}
console.log("rank-check.js run!")