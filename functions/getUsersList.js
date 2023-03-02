const Profile = require('../models/Profile');

module.exports = async function(guild_id){

    var profile = await Profile.find({GuildID: guild_id});
    return profile
    
}