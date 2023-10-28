const { exit } = require("process");
const { DebugString } = require("./Debug")
const { Client, Collection, Intents } = require("discord.js");

const discord = fetch("https://discord.com/");

function checkDiscord() 
{
    discord.then(response => {
        const status = response.status;

        if (status == 200) {
            return DebugString("Discord Is Responding Fine!", "green")
        } else {
            DebugString("Discord Is Not Responding, Now Exiting Project To Prevent Errors Later On!", "red");
            return exit();
        }
    })
}

function init_discord_client(intents_main)
{
    DebugString("Initializing Discord Client", "yellow");
    let tempclient = new Client({ intents: intents_main });
    DebugString("Discord Client Initialized", "green");

    return tempclient;
}

function init_discord_client_login(token, client) {
    DebugString("Initializing Discord Client Login", "yellow");
    client.login(token);
    return DebugString("Discord Client Login Initialized", "green");
}



module.exports = {
    checkDiscord,
    init_discord_client,
    init_discord_client_login,

}