const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('хелп')
        .setNameLocalization('en-US',"help")
        .setDescription('Показывает список команд'),

    async execute(interaction,client) {
        return interaction.reply({
            "content": "",
            "tts": false,
            "embeds": [
                {
                "type": "rich",
                "title": `Список команд :`,
                "description": "",
                "color": "13818605",
                "fields": [
                    {
                    "name": `Действия :`,
                    "value": `<:action:1075160143433576630> Система взаимодействия с другими пользователями.`,
                    "inline": true
                    },
                    {
                    "name": `Экономика : `,
                    "value": `:coin: Внутрення система награждения пользователей за активность.`,
                    "inline": true
                    },
                    {
                    "name": `Другие :`,
                    "value": `<:owocat:1075020389727621162> Команды, которые используятся\nдля получения разной информации на сервере.`,
                    "inline": false
                    }
                ],
                }
            ],
            "components": [{
                "type": 1,
                "components": [
                {
                    "custom_id": `help_select`,
                    "placeholder": `Выберите категорию.`,
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
                    }
                    ],
                    "min_values": 1,
                    "max_values": 1,
                    "type": 3
                }]
            }]
        })
    },
}