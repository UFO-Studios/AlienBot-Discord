const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("kick").setDescription("This command kicks a member!"),
    execute(message, args){
        const target = message.mentions.users.first();
        //how do you specify a user? "well this is definetly not how to" -kingerious
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.channel.send("User has been kicked");
        }else{
            message.channel.send(`You coudn't kick that member!`);
        }
    }
}

console.log("kick.js run");
