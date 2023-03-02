const { SlashCommandBuilder,  PermissionFlagsBits } = require('discord.js');
const getUserProfile = require('../../functions/getUserProfile');
const Profile = require('../../models/Profile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('givemoney')
        .setDescription('Передать валюту пользователю.')
        .addUserOption(option =>
            option.setName('пользователь')
                .setDescription('Пользователь которому вы передаёте валюту.')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('количество')
                .setDescription('Количество валюты которое вы передадите другому пользователю.')
                .setRequired(true)
                .setMinValue(100)
        ),

    async execute(interaction,client) {

        const user = interaction.options.getUser('пользователь')
        const count = interaction.options.getInteger('количество')

        const profile = await getUserProfile(interaction.user.id,interaction.guild.id)
        const profile_to = await getUserProfile(user.id,interaction.guild.id)


        if(profile.Wallet >= count){

            await Profile.updateOne(
                { UserID : interaction.user.id, GuildID : interaction.guild.id},
                { $inc : { Wallet : 0 - count} }
            )

            await Profile.updateOne(
                { UserID : user.id, GuildID : interaction.guild.id},
                { $inc : { Wallet : Math.floor(count * 0.90)} }
            )

            return interaction.reply({
                "embeds": [
                    {
                      "type": "rich",
                      "title": `Уведомление о успешном переводе :`,
                      "description": `Вы передали ${Math.floor(count * 0.90)} <:osucoin:947968670339043428> с учетом комиссии`,
                      "color": 11403055,
                      "fields": [
                        {
                          "name": `Теперь ваш баланс :`,
                          "value": `${profile.Wallet - count} <:osucoin:947968670339043428>`
                        },
                        {
                          "name": `Баланс ${user.username} :`,
                          "value": `${profile_to.Wallet + Math.floor(count * 0.90)} <:osucoin:947968670339043428>`
                        }
                      ]
                    }
                ]
            })
        }else{
            return interaction.reply({
                content : 'На счету недостаточно средств' ,
                ephemeral: true
            })
        }
    }
}
