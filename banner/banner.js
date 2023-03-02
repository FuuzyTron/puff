module.exports = function(){
    const { EmbedBuilder, Client, GatewayIntentBits} = require('discord.js');
    const Discord = require("discord.js");
    const {createCanvas , loadImage , registerFont} = require('canvas')
    require('dotenv').config()


    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildPresences
        ],
    });

    client.on("ready", () => {
        setInterval(changeBanner, 6000)
        const guild = client.guilds.cache.get('843258176786137118');
        guild.voiceStates.cache.each(() => voice++)
        users = guild.memberCount;
    })

    var users;
    var voice = 0;

    client.on('guildMemberAdd', (member) => {
        if(member.guild.id === "843258176786137118")
            users = member.guild.memberCount;
    })

    client.on('guildMemberRemove', (member) => {
        if(member.guild.id === "843258176786137118")
            users = member.guild.memberCount;
    })

    client.on('voiceStateUpdate', async (oldState, newState) => {
        
        if (oldState.channel === null) {
            voice++;
        }

        if (newState.channel === null) {
            voice--;
        }

        var user_in_voice = [];

        if(oldState.channel != null)
        oldState.channel.members.forEach(el => {
            user_in_voice.push(el.user);
        });
    })

    async function changeBanner() {
        channel = "936375726708506735"
        message = "1049770605387464755"
        
        const guild = client.guilds.cache.get('843258176786137118');
        const banner = await editBanner();
        
        await guild.setBanner(banner);
        
    }

    async function editBanner(){ // банер КОТОРЫЙ БЛЯД НЕ РАБОТАЕТ ПОШЕЛ НАХУЙ

        await registerFont('./banner/pico-8.ttf' , {family: 'PICO-8'});
        bg = await loadImage('./banner/bg.jpg');
        ico1 = await loadImage('./banner/ico1.png');
        ico2 = await loadImage('./banner/ico2.png');

        const canvas = createCanvas(960,540);
        const context = canvas.getContext('2d');
        context.fillRect(0,0,960,540);
        context.drawImage(bg,0,0,960,540);
        context.drawImage(ico1,20,400,100,100);
        context.drawImage(ico2,20,250,100,170);

        context.font = '50pt PICO-8';
        context.textAlign = 'start'
        context.fillStyle = '#000';
        context.fillText(users,150,500);
        context.fillStyle = '#fff';
        context.fillText(users,140,490);

        context.fillStyle = '#000';
        context.fillText(voice,150,385);
        context.fillStyle = '#fff';
        context.fillText(voice,140,375);

        return canvas.toBuffer();
    }

    client.login(process.env.BOT_TOKEN);
}