const createProfile = require('./createProfile');
const Profile = require('../models/Profile');

module.exports = async function(user_id,guild_id){

    var profile = await Profile.find({ UserID: user_id, GuildID: guild_id });

    if(profile.length === 0){
        await createProfile(user_id,guild_id)
    }
    
    profile = await Profile.find({ UserID: user_id, GuildID: guild_id });

    return profile[0];
}