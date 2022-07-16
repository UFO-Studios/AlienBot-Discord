const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the specified user. What else were you expecting?")
    .addUserOption((option) => option.setName('user').setDescription('The person who you want to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason to kick member').setRequired(true)),
    run: async (client, interaction) => {

       if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.followUp({ content: "Unwilling to comply. (403)", ephemeral: true })

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.followUp("😅 | Unable to comply. (404)");
        const reason = interaction.options.getString('reason')

        if(!member.kickable || member.user.id === client.user.id) 
        return interaction.followUp("😅 | Unable to comply. (400)");
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.followUp('Unwilling to comply. (403)')
        
        const embed = new MessageEmbed()
        .setDescription(`**${member.user.tag}** is kicked out from the server for \`${reason}\``)
        .setColor("GREEN")
        .setFooter("Kick Member")
        .setTimestamp()

        await member.user.send(`You are kicked from **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => {})
        member.kick({ reason })

        return interaction.followUp({ embeds: [ embed ]})

    },
    
};
console.log("kick.js run")