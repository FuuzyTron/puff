const { SlashCommandBuilder } = require('discord.js');
const getUserProfile = require('../../functions/getUserProfile');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ball')
        .setDescription('Показывает количество валюты у пользователя.')
        .addUserOption(option =>
            option.setName('пользователь')
                .setDescription('Выберите пользователя у которого хотите посмотреть валюту.')),

    async execute(interaction,client) {
        const user = interaction.options.getUser('пользователь') || interaction.user
        const user_id = user.id

        const profile = await getUserProfile(user_id,interaction.guild.id);
        let users = await client.users.fetch(`${user_id}`);
        interaction.reply({"embeds": [
            {
              "type": "rich",
              "title": `Баланс ${users.username} :`,
              "description": "",
              "color": "5530797",
              "fields": [
                {
                  "name": `На данный момент у ${users.username} : ${profile.Wallet} <:osucoin:947968670339043428>`,
                  "value": `Ежеденвный бонус : ${profile.DailyBonus}`
                }
              ]
            }
        ]})
    }
}