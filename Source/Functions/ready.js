const { DebugString } = require("./Debug")

function init_ready(client) {
    DebugString("Loading Client Status... ", "yellow");
    client.on("ready", () => {
        DebugString(`${client.user.username} | Client Loaded Successfully`, "green");
    });
}

function changeClientActivity(client, statusText) {
    client.user.setActivity(statusText);
}

function changeClientPresence(client, presence) {
    client.user.setPresence({ presence });
}

module.exports = { init_ready, changeClientActivity, changeClientPresence }