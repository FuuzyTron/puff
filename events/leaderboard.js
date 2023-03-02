const { Events , EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const getUsersList = require('../functions/getUsersList');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction,client) {

        if (!interaction.isButton()) return;

        if (interaction.customId === 'previous_lb'){

            if (interaction.message.interaction.user.id != interaction.user.id) {
                interaction.reply({
                    content : "Эту команду вызвал другой пользователь, вы не можете ее использовать.",
                    ephemeral: true
                })
                return;
            }

            const users = await getUsersList(interaction.guild.id)
            const sorted_user = users.sort(function(a,b){
                return b.Wallet - a.Wallet
            })

            let page_number = Number(interaction.message.embeds[0].data.footer.text.split(' ')[2]) - 1
            let disble = false
            if(page_number === 1){
                disble = true
            }

            const embed = new EmbedBuilder()
                .setTitle("Список лидеров")
                .setFooter({ text : `Страница номер ${page_number} из ${Math.ceil(sorted_user.length / 10)} `})
                .setColor(5530797)

            for(let index = 10 * (page_number - 1);index < Math.min(10 * (page_number - 1) + 10,sorted_user.length);index++){
                let user = await client.users.fetch(`${sorted_user[index].UserID}`);
                embed.addFields({name : `${index + 1}. ${user.username}`,value : `Баланс : ${sorted_user[index].Wallet} <:osucoin:947968670339043428> \nЕжедневный бонус : ${sorted_user[index].DailyBonus}`})
            }

            interaction.update({
                "embeds" : [embed],
                "components": [
                    {
                      "type": 1,
                      "components": [
                        {
                          "style": 1,
                          "label": `Previous`,
                          "custom_id": `previous_lb`,
                          "disabled": disble,
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
                          "disabled": false,
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
            });

        }else if(interaction.customId === 'next_lb'){
            if (interaction.message.interaction.user.id != interaction.user.id) {
                interaction.reply({
                    content : "Эту команду вызвал другой пользователь, вы не можете ее использовать.",
                    ephemeral: true
                })
                return;
            }

            const users = await getUsersList(interaction.guild.id)
            const sorted_user = users.sort(function(a,b){
                return b.Wallet - a.Wallet
            })

            let page_number = Number(interaction.message.embeds[0].data.footer.text.split(' ')[2]) + 1

            let disble = false

            if(page_number === Math.ceil(sorted_user.length / 10)){
                disble = true
            }

            const embed = new EmbedBuilder()
                .setTitle("Список лидеров")
                .setFooter({ text : `Страница номер ${page_number} из ${Math.ceil(sorted_user.length / 10)} `})
                .setColor(5530797)

            for(let index = 10 * (page_number - 1);index < Math.min(10 * (page_number - 1) + 10,sorted_user.length);index++){
                let user = await client.users.fetch(`${sorted_user[index].UserID}`);
                embed.addFields({name : `${index + 1}. ${user.username}`,value : `Баланс : ${sorted_user[index].Wallet} <:osucoin:947968670339043428> \nЕжедневный бонус : ${sorted_user[index].DailyBonus}`})
            }

            interaction.update({
                "embeds" : [embed],
                "components": [
                    {
                      "type": 1,
                      "components": [
                        {
                          "style": 1,
                          "label": `Previous`,
                          "custom_id": `previous_lb`,
                          "disabled": false,
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
            });
        }
    }
};