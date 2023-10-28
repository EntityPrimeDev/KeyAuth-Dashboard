const { MessageEmbed } = require('discord.js');



function QuickEmbed(title, description, color) {
    return new MessageEmbed()
       .setTitle(title)
       .setDescription(description)
       .setColor(color);
}

module.exports = {QuickEmbed};