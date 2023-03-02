const action = require("../../functions/Actions.js");
const action_with_user = require("../../functions/Action_with_user.js");
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wait")
        .setDescription("Ждать кого-то")
        .addUserOption(option => option.setName('пользователь').setDescription('пользователь')),

    async execute(interaction) {
        const user = interaction.options.getUser('пользователь');
        if(user === null) args = [interaction.user.id]
        else args = [interaction.user.id,user.id]
        return interaction.reply(action("wait",args)) 
    },
}