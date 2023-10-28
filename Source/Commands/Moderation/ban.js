const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction } = require("discord.js");
const mongoose = require('mongoose');
const { QuickEmbed } = require("../../Functions/createEmbed");
const { client } = require('../../../start');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans A User')
		.addUserOption(option =>
            option.setName('user')
                .setDescription('The User To Ban')
                .setRequired(true)
        )
		.addStringOption(option =>
            option.setName('reason')
               .setDescription('The Reason For The Ban')
               .setRequired(false)
        )
		.addNumberOption(option =>
			option.setName("days")
			.setDescription("The Number Of Days To Ban The User")
			.setRequired(false)
			.setMinValue(0)
			.setMaxValue(30)
		)
		.addNumberOption(option =>
			option.setName("hours")
			.setDescription("The Number Of Hours To Ban The User")
			.setRequired(false)
			.setMinValue(0)
			.setMaxValue(23)
		)
		.addNumberOption(option =>
			option.setName("minutes")
			.setDescription("The Number Of Minutes To Ban The User")
			.setRequired(false)
			.setMinValue(0)
			.setMaxValue(59)
		)	,
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const banneduser = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason');
        const days = interaction.options.getNumber('days');
        const hours = interaction.options.getNumber('hours');
        const minutes = interaction.options.getNumber('minutes');

		// Checking if the bot has permission to ban the user
		if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            const embed = new QuickEmbed(
                "You Don't Have Permission To Ban This User!",
                "You Don't Have Permission To Ban This User!",
                "RED"
            );
            await interaction.reply({ embeds: [embed] });
            return;
        }
		

        const date = new Date();
        if (days) {
            date.setDate(date.getDate() + days);
        }
        if (hours) {
            date.setHours(date.getHours() + hours);
        }
        if (minutes) {
            date.setMinutes(date.getMinutes() + minutes);
        }
        await interaction.guild.members.ban(banneduser, {
            reason: reason,
            days: days,
            hours: hours,
            minutes: minutes,
        });
        const embed = new QuickEmbed(
		"User Banned!",
		`User Banned:\nUser: ${user.tag}\nReason: ${reason}\nDays: ${days}\nHours: ${hours}\nMinutes: ${minutes}\nDate: ${date.toLocaleString}`,
		"GREEN"
		)

		await interaction.reply({ embeds: [embed] });

		const embedtosend = new QuickEmbed(
			"You have been Banned!",
			`You have been banned from ${interaction.guild.name} for reason: ${reason} for ${days} days, ${hours} hours, ${minutes} minutes and ${date.toLocaleString()}`,
			"RED")


		// Not Really Needed TBH

		// try {
		// 	// Checks if the bot can send the user a message

		// 	await banneduser.send({ embeds: [embedtosend] });
		// } catch (error) {
		// 	console.log(error);
        // }
	}
};