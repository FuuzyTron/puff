const { Events } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction,client) {

        if (!interaction.isStringSelectMenu()) return;
        if (interaction.values[0] != 'action_help') return;

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

        const fileList = fs.readdirSync("./moduls/action").filter(file => file.endsWith('.js'));

        var res = ""

        fileList.forEach(command => {
            command = command.slice(0,-3)
            res += `</${command}:${commandsid[command]}> `
        });

        res = res.slice(0,-1) + ".";

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
                        "default": true
                    },
                    {
                        "label": `Экономика.`,
                        "value": `economy_help`,
                        "description": `Показывает список команд экономики.`,
                        "emoji": {
                            "name" : "🪙"
                        },
                        "default": false
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
            "title": `<:action:1075160143433576630> Действия:`,
            "description": "",
            "color": "16238017",
            "fields": [
                {
                  "name": `Список доступных команд на данный момент :`,
                  "value": res
                }
              ]
            }
        ]})
	},
};