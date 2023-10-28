const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
const { QuickEmbed } = require("../../Functions/createEmbed");
const { client } = require('../../../start');
// Super Basic BTW

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('The user to kick')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
           .setDescription('The reason for kicking the user')
           .setRequired(false)
        ),
    // Using CommandInteraction and Client To Make A Param For Interactions
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                   .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                   .setColor('RED')
                   .setTitle('Error')
                   .setDescription('You are not in this server!')
                ]
            });
        }
        if (!member.kickable) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                  .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                  .setColor('RED')
                  .setTitle('Error')
                  .setDescription('You cannot kick this user!')
                ]
            });
        }
        if (!member.bannable) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                 .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                 .setColor('RED')
                 .setTitle('Error')
                 .setDescription('You cannot ban this user!')
                ]
            });
        }
        if (member.id === interaction.user.id) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                  .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                  .setColor('RED')
                  .setTitle('Error')
                  .setDescription('You cannot kick yourself!')
                ]
            });
        }
        if (member.id === interaction.guild.ownerId) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                 .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                 .setColor('RED')
                 .setTitle('Error')
                 .setDescription('You cannot kick the server owner!')
                ]
            });
        }
        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.reply({
                embeds: [
                new MessageEmbed()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setColor('RED')
                .setTitle('Error')
                .setDescription('You cannot kick this user!')
                ]
            });
        }


        member.kick({ reason: reason }).then(() => {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                  .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                  .setColor('GREEN')
                  .setTitle('Success')
                  .setDescription(`Successfully kicked **${member.user.tag}**!`)
                  .addField('Reason', reason)
                 .setTimestamp()
                ]
            });
        }).catch(err => {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                 .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                 .setColor('RED')
                 .setTitle('Error')
                 .setDescription(`There was an error kicking **${member.user.tag}**!`)
                ]
            });
        })
    },
}