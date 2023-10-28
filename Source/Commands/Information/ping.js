const { SlashCommandBuilder } = require('@discordjs/builders');
const mongoose = require('mongoose');
const { QuickEmbed } = require("../../Functions/createEmbed")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		const embed = new QuickEmbed("Ping... Pong! | My Ping", `My Current Latency is: ${Math.round(interaction.client.ws.ping)}ms!`, "BLUE")

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};