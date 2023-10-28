const { SlashCommandBuilder } = require('@discordjs/builders');
const mongoose = require('mongoose');
const { Client, CommandInteraction } = require("discord.js");
const { QuickEmbed } = require("../../Functions/createEmbed")
const { readdirSync } = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('simple help cmd!'),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	async execute(interaction) {
        const cmds = client.commands;
	},
};