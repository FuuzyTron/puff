const shop_content = require("../../content/shop");
const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Показывает список вещей в магазине.'),

    async execute(interaction){
        let roles = shop_content['role']

        const embed = new EmbedBuilder()
            .setTitle("Список ролей :")
            .setColor(5530797)
        
        let index = 1
        let result = "";

        roles.forEach(role => {
            key = role[0]
            value = role[1]
            result = result + `${index++}. <@&${role[0]}> \nЦена : ${role[1]} <:osucoin:947968670339043428> \n \n`; 
        });
        embed.setDescription(result)

        interaction.reply({"embeds" : [embed]})
    }
}