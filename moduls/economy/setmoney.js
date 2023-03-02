const { SlashCommandBuilder,  PermissionFlagsBits } = require('discord.js');
const getUserProfile = require('../../functions/getUserProfile');
const Profile = require('../../models/Profile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setmoney')
        .setDescription('Изменяет баланс пользвателя.')
        .addUserOption(option =>
            option.setName('пользователь')
                .setDescription('Пользователь которому будет изменен баланс.')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('количество')
                .setDescription('Количество валюты которое будет установленно.')
                .setRequired(true)
                .setMinValue(0)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageWebhooks),

    async execute(interaction,client) {

        const user = interaction.options.getUser('пользователь')
        const count = interaction.options.getInteger('количество')

        const profile = await getUserProfile(user.id,interaction.guild.id);

        await Profile.updateOne(
            { UserID : user.id, GuildID : interaction.guild.id},
            { $set : { Wallet : count} }
        )

        let users = await client.users.fetch(`${user.id}`);

        interaction.reply({
            "embeds": [
            {
              "type": "rich",
              "title": `Именения баланса :`,
              "description": "",
              "color": "5530797",
              "fields": [
                {
                  "name": `Баланс ${users.username} был изменен `,
                  "value": `До изменения : ${profile.Wallet} <:osucoin:947968670339043428> \nПосле изменения : ${count} <:osucoin:947968670339043428>.`
                }
              ]
            }
        ]})
    }
}
