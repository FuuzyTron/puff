const { Events } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction,client) {

        if (!interaction.isStringSelectMenu()) return;
        if (interaction.values[0] != 'economy_help') return;

        if (interaction.message.interaction.user.id != interaction.user.id) {
            interaction.reply({
                content : "Эту команду вызвал другой пользователь, вы не можете ее использовать.",
                ephemeral: true
            })
            return;
        }

        var commandsid = {}

        const list = await client.application.commands.fetch()
        
        list.forEach(command => {
            commandsid[command.name] = command.id
        });

        const fileList = fs.readdirSync("./moduls/economy").filter(file => file.endsWith('.js'));

        var res = ""
        var res2 = ""

        fileList.forEach(file => {
            const command = require(`../moduls/economy/${file}`)
            command_name = command.data.name
            if(command.data.default_member_permissions){
                res2 += `</${command_name}:${commandsid[command_name]}> `
            }else{
                res += `</${command_name}:${commandsid[command_name]}> `
            }
        });

        res = res.slice(0,-1) + ".";
        res2 = res2.slice(0,-1) + ".";

        interaction.update({
        "components": [
            {
                "type": 1,
                "components": [
                {
                    "custom_id": `help_select`,
                    "options": [
                    {
                        "label": `Действия.`,
                        "value": `action_help`,
                        "description": `Показывает список команд со всеми действиями.`,
                        "emoji": {
                            "id": "1075160143433576630"
                        },
                        "default": false
                    },
                    {
                        "label": `Экономика.`,
                        "value": `economy_help`,
                        "description": `Показывает список команд экономики.`,
                        "emoji": {
                            "name" : "🪙"
                        },
                        "default": true
                    },
                    {
                        "label": `Другие.`,
                        "value": `main_help`,
                        "description": `Показывает список оставишихся команд.`,
                        "emoji": {
                            "id": "1075020389727621162",
                        },
                        "default": false
                    }],
                  "min_values": 1,
                  "max_values": 1,
                  "type": 3
                }
              ]
            }
        ],
        "embeds": [{
            "type": "rich",
            "title": `:coin: Экономика:`,
            "description": "",
            "color": "5530797",
            "fields": [
                {
                  "name": `Список доступных команд на данный момент :`,
                  "value": res
                },
                {
                    "name" : "Команды для администрации :",
                    "value" : res2
                }
              ]
            }
        ]})

	},
};