// This Will Create a mongoose schema and model for mutes!

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const muteSchema = new Schema({
    guildID: String,
    userID: String,
    reason: String,
    duration: Number,
    date: Date
});

const Mute = mongoose.model('mute', muteSchema);

module.exports = { Mute };