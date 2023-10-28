const { config } = require('../Config/config');
const { DebugString } = require("./Debug")
const { exit } = require("process");

function Checks() 
{
    if (config.token.length == 0) {
        DebugString("No token found in config.json", "red");
        exit();
    }
    if (config.prefix.length == 0) {
        DebugString("No prefix found in config.json", "red");
        exit();
    }
    if (config.databaseconnectionURI.length == 0) {
        DebugString("No database connection URI found in config.json", "red");
        exit();
    }
    if (config.ClientSecret.length == 0) {
        DebugString("No ClientSecret found in config.json", "red");
        exit();
    }
    if (config.clientID.length == 0) {
        DebugString("No ClientID found in config.json", "red");
        exit();
    }
    if (config.TestGuildID.length == 0) {
        DebugString("No TestGuildID found in config.json", "red");
        exit();
    }
}

module.exports = {Checks};