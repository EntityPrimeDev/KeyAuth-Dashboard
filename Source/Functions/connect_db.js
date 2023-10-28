const mongoose = require('mongoose');
const { DebugString } = require("./Debug")

function init_connection_db(connectionString) {
    DebugString("Initializing connection to database... ", "yellow");
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //useFindAndModify: false
    });
    DebugString("Connection to database established!", "green");
}

module.exports = {init_connection_db};