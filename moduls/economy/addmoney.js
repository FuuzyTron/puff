const { SlashCommandBuilder,  PermissionFlagsBits } = require('discord.js');
const getUserProfile = require('../../functions/getUserProfile');
const Profile = require('../../models/Profile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addmoney')
        .setDescription('Выдает валюта пользователю.')
        .addUserOption(option =>
            option.setName('пользователь')
                .setDescription('Пользователь которому будет выдана валюта.')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('количество')
                .setDescription('Количество валюты которое будет выдано.')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageWebhooks),

    async execute(interaction,client) {

        const user = interaction.options.getUser('пользователь')
        const count = interaction.options.getInteger('количество')

        const profile = await getUserProfile(user.id,interaction.guild.id);

        await Profile.updateOne(
            { UserID : user.id, GuildID : interaction.guild.id},
            { $inc : { Wallet : count} }
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
                  "name": `${users.username} было выдано ${count} <:osucoin:947968670339043428>.`,
                  "value": `Теперь его баланс : ${profile.Wallet + count} <:osucoin:947968670339043428>.`
                }
              ]
            }
        ]})
    }
}
