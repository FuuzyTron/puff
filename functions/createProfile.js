const Profile = require('../models/Profile');

module.exports = async function createProfile(user_id, _guildID){

    const profile = await Profile.find({ UserID: user_id, GuildID: _guildID });

    if (profile.length === 0) {
        await new Profile({
        GuildID: _guildID,
        UserID: user_id,
        Wallet: 0,
        lastDaily: undefined,
        DailyBonus: 0
        }).save();
        return true;
    }

    return false;
}