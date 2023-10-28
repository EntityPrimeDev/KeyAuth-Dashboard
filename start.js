const { DebugString } = require("./Source/Functions/Debug");
const { init_connection_db } = require("./Source/Functions/connect_db");
const { init_discord_client_login, checkDiscord, init_discord_client } = require("./Source/Functions/connect_discord");
const { init_ready, changeClientPresence, changeClientActivity } = require("./Source/Functions/ready");
const { config } = require("./Source/Config/config");
const { Checks } = require("./Source/Functions/check");


function Main_DiscordFunc() {
    DebugString("Starting All Proccess...", "yellow");

    checkDiscord(); // Checks If The Discord Servers Are On And If Not Disconnects The Bot To Stop Errors.
    Checks(); // Checks If The Config File Is Filled With Information For The Bot.
    
    const client = init_discord_client(32767); // Creates A Instance Of The Discord Client.
    
    module.exports = { client }; // Exports The Client To The Global Variable.
    
    
    require("./Source/Main/handle") // Makes Sure All The (/) Command Handles Are Initialized.
    
    init_connection_db(config.databaseconnectionURI); // Just initializes the connection to the database.
    
    init_ready(client); // gives the status code of the bot when event <ready> is called.
    
    init_discord_client_login(config.token, client); // Connects The Bot To The Discord Servers.
    
    // changeClientPresence(client, "dnd"); // Changes The Bot's Status.
    // changeClientActivity(client, "UD MAN IS UD"); // Changes The Bot's Status.
    
    DebugString("All Proccess Are Started!", "green");
}

module.exports = { Main_DiscordFunc };