const shop_content = require("../../content/shop");
const { SlashCommandBuilder , EmbedBuilder, escapeBulletedList } = require('discord.js');
const getUserProfile = require('../../functions/getUserProfile');
const Profile = require('../../models/Profile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sell')
        .setDescription('Продать роль из магазина.')
        .addIntegerOption(option =>
            option.setName('номер')
                .setDescription('Номер роли можно получить в /shop.')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(8)
        ),

    async execute(interaction){

        const number = interaction.options.getInteger('номер') - 1
        const profile = await getUserProfile(interaction.user.id,interaction.guild.id)
        let roles = shop_content['role']

        if (interaction.member.roles.cache.some(role => role.id === roles[number][0])){
            await Profile.updateOne({ UserID: interaction.user.id, GuildID: interaction.guild.id}, { $inc: { Wallet: roles[number][1] * 0.75} });
            interaction.member.roles.remove(roles[number][0]);

            const shop = new EmbedBuilder();
                shop.setTitle('Уведомление о продаже');
                shop.setColor(5530797);
                shop.setDescription(`Вы успешно продали роль <@&${roles[number][0]}> за ${roles[number][1] * 0.75} <:osucoin:947968670339043428> \nТеперь ваш баланс составляет : ${profile.Wallet + roles[number][1] * 0.75} <:osucoin:947968670339043428>`);
            return interaction.reply({embeds :[shop]});
        }else{
            return interaction.reply({content :`У вас нет этой роли.`, ephemeral: true });
        }
    }
}