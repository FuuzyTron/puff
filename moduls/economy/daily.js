const { SlashCommandBuilder } = require('discord.js');
const getUserProfile = require('../../functions/getUserProfile');
const Profile = require('../../models/Profile');

module.exports = {
    data : new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Получения ежедневной награды"),
    
    async execute(interaction){

        const user_id = interaction.user.id
        const guild_id = interaction.guild.id

        const profile = await getUserProfile(user_id,guild_id)

        if(Date.now() - profile.lastDaily > 86400000 || !profile.lastDaily){
            
            await Profile.updateOne(
                { UserID : user_id, GuildID : guild_id},
                { $set : { lastDaily : Date.now() } }
            )

            if (Date.now() - profile.lastDaily > 2 * 86400000) {
                await Profile.updateOne(
                    { UserID : user_id, GuildID : guild_id},
                    { $set : { DailyBonus : 0 } }
                )
            }

            const new_user = await getUserProfile(user_id,guild_id)

            await Profile.updateOne(
                { UserID : user_id, GuildID : guild_id},
                { $inc : { Wallet : 250 + new_user.DailyBonus}}
            )

            if (new_user.DailyBonus < 150) {
                await Profile.updateOne(
                    { UserID : user_id, GuildID : guild_id},
                    { $inc : { DailyBonus : 10 } }
                )
            }

            const date = Math.round((new Date()).getTime() / 1000) + 60 * 60 * 24;

            interaction.reply({
                "embeds": [
                {
                    "type": "rich",
                    "title": `Ежедневная награда`,
                    "description": "",
                    "color": "5530797",
                    "fields": [
                        {
                        "name": `${interaction.user.username} получил ${250 + new_user.DailyBonus} <:osucoin:947968670339043428>, и его баланс составляет ${new_user.Wallet + 250 + new_user.DailyBonus} <:osucoin:947968670339043428>`,
                        "value": `Следующая награда доступна <t:${date}:f>`
                        }
                    ],
                    "footer": {
                        "text": `Текущий ежедневный бонус : ${new_user.DailyBonus}`
                    }
                }
            ]})

        } else {
            const date = Math.round(profile.lastDaily / 1000) + 60 * 60 * 24
            interaction.reply({  
                "embeds": [
                {
                  "type": "rich",
                  "title": `Ежедневная награда.`,
                  "description": "",
                  "color": "14551590",
                  "fields": [
                    {
                      "name": `Вы уже получали сегодня ежедневную награду.`,
                      "value": `Следующая награда будет доступна <t:${date}:f>`
                    }
                  ]
                }
            ]})
        }
    }
}