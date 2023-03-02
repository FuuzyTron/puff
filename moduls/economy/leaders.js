const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const getUsersList = require('../../functions/getUsersList');


module.exports = {
    data : new SlashCommandBuilder()
        .setName("leaders")
        .setDescription("Показывает список лидеров на сервере."),

    async execute(interaction,client){

        const users = await getUsersList(interaction.guild.id)
        const sorted_user = users.sort(function(a,b){
            return b.Wallet - a.Wallet
        })

        const embed = new EmbedBuilder()
            .setTitle("Список лидеров")
            .setFooter({ text : `Страница номер 1 из ${Math.ceil(sorted_user.length / 10)} `})
            .setColor(5530797)


        for(let index = 0;index < Math.min(10,sorted_user.length);index++){
            let user = await client.users.fetch(`${sorted_user[index].UserID}`);
            embed.addFields({name : `${index + 1}. ${user.username}`,value : `Баланс : ${sorted_user[index].Wallet} <:osucoin:947968670339043428> \nЕжедневный бонус : ${sorted_user[index].DailyBonus}`})
        }

        let disble = false
        if(sorted_user.length <= 10){
          disble = true
        }

        interaction.reply({
            "embeds" : [embed],
            "components": [
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 1,
                      "label": `Previous`,
                      "custom_id": `previous_lb`,
                      "disabled": true,
                      "emoji": {
                        "id": `1075020389727621162`,
                        "name": `owocat`,
                        "animated": false
                      },
                      "type": 2
                    },
                    {
                      "style": 1,
                      "label": `Next`,
                      "custom_id": `next_lb`,
                      "disabled": disble,
                      "emoji": {
                        "id": `1075020389727621162`,
                        "name": `owocat`,
                        "animated": false
                      },
                      "type": 2
                    }
                  ]
                }
            ],
        })
    }
}