const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojiinfo')
        .setDescription('Показывает списко команд')
        .addStringOption(option =>
            option.setName('эмодзи')
                .setDescription('вставь сюда эмодзи')
                .setRequired(true)),

    async execute(interaction) {

        const str = interaction.options.getString("эмодзи");
        const nameemoji = str.split(':')[1]
        const emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === nameemoji)

        if(emoji === undefined){
            interaction.reply({content : "Я не смогла найти такой эмодзи. \nПроверте что эмодзи находится на данном сервере.", ephemeral: true})
        }
        else{

            if(emoji.animated) link = `https://cdn.discordapp.com/emojis/${emoji.id}.gif`
            else link = `https://cdn.discordapp.com/emojis/${emoji.id}`
            
            interaction.reply({
                "embeds": [
                {
                  "type": "rich",
                  "title": `Информация о эмодзи :`,
                  "color": "13818605",
                  "fields": [
                    {
                      "name": `id :`,
                      "value": `${emoji.id}`
                    },
                    {
                      "name": `name :`,
                      "value": `${emoji.name}`
                    },
                    {
                      "name": `animated :`,
                      "value": `${emoji.animated}`
                    }
                  ],
                  "image": {
                    "url": link,
                    "height": 0,
                    "width": 0
                  }
                }]
            })

        }
        
    }
}