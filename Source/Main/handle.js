const { client } = require("../../start");
const { Collection } = require("discord.js");
const  { DebugString } = require("../Functions/Debug");
const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { config } = require("../Config/config")
const path = require('node:path');


const commands = [];
const foldersPath = path.join(__dirname, "..", "Commands");
const commandFolders = fs.readdirSync(foldersPath);

client.commands = new Collection();

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command)
		} else {
			DebugString(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`, "yellow");
		}
	}
}

// client.on("interactionCreate", interaction => {
// 	if (!interaction.isChatInputCommand()) return;
// 	console.log(interaction);
// });

client.on("interactionCreate", async interaction => {
	//if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		DebugString(`No command matching ${interaction.commandName} was found.`, "red");
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		DebugString(error, "red");
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

const rest = new REST().setToken(config.token);

(async () => {
	try {
		DebugString(`Started refreshing ${commands.length} application (/) commands.`, "yellow");

		const data = await rest.put(
			Routes.applicationGuildCommands(config.clientID, config.TestGuildID),
			{ body: commands },
		);

		DebugString(`Successfully reloaded ${data.length} application (/) commands.`, "green");
	} catch (error) {
		DebugString(error, "red");
	}
})();

require("./Events/mute");