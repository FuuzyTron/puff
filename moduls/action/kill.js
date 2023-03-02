const action = require("../../functions/Actions.js");
const action_with_user = require("../../functions/Action_with_user.js");
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kill")
        .setDescription("Убить кого-то")
        .addUserOption(option => option.setName('пользователь').setDescription('пользователь')),

    async execute(interaction) {
        const user = interaction.options.getUser('пользователь');
        if(user === null) {
            return interaction.reply({files: ["https://cdn.discordapp.com/attachments/909073362687504414/1076107115770417222/ssstik.io_1663862260841_1.mp4"]})
        }
        else args = [interaction.user.id,user.id]
        return interaction.reply(action_with_user("kill",args)) 
    },
}