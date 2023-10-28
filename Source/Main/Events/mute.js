const { Mute } = require("../../Models/mutes");
const { client } = require("../../../start")


client.on("guildMemberAdd", async (member) => {
    const mute = await Mute.findOne({
        guildID: member.guild.id,
        userID: member.id,
    })

    if(mute.userID == member.id) {
       // member.roles.add(mute.Role)
        member.timeout(mute.duration)
    }
});