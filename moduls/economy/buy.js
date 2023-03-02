const shop_content = require("../../content/shop");
const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');
const getUserProfile = require('../../functions/getUserProfile');
const Profile = require('../../models/Profile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Купить роль из магазина.')
        .addIntegerOption(option =>
            option.setName('номер')
                .setDescription('Номер роли можно получить в /shop.')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(8)
        ),

    async execute(interaction){

        const number = interaction.options.getInteger('номер') - 1
        let roles = shop_content['role']

        if (interaction.member.roles.cache.some(role => role.id === roles[number][0])){
            return interaction.reply({content :`У вас уже есть эта роль.`, ephemeral: true });
        }

        const profile = await getUserProfile(interaction.user.id,interaction.guild.id)

        if(profile.Wallet >= roles[number][1]){
            await Profile.updateOne({ UserID: interaction.user.id, GuildID: interaction.guild.id}, { $inc: { Wallet: 0 - roles[number][1]} });
            interaction.member.roles.add(roles[number][0]);

            const shop = new EmbedBuilder();
            shop.setTitle('Уведомление о покупке');
            shop.setColor(5530797);
            shop.setDescription(`Вы успешно купили роль <@&${roles[number][0]}> за ${roles[number][1]} <:osucoin:947968670339043428> \nТеперь ваш баланс составляет : ${profile.Wallet - roles[number][1]} <:osucoin:947968670339043428>`);
            return interaction.reply({embeds :[shop]});
        } else {
            return interaction.reply({content : 'На счету недостаточно средств' , ephemeral: true });
        }
    }
}