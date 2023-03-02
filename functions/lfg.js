module.exports = function(){

    const Discord = require("discord.js");
    const { EmbedBuilder, Client, GatewayIntentBits} = require('discord.js');
    const axios = require('axios');


    require('dotenv').config()

    const token2 = process.env.CARD_TOKEN

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


    async function get_voice(guild_id){ 
        try {
            var ret = await axios.get(
            `https://api.discord.band/v1/findteam/cards/server/${guild_id}`,{
                headers : { Authorization: `Bearer ${token2}` }
            })
            return(ret.data);
        } catch {
            return null;
        }
    }

    client.on('voiceStateUpdate', async (oldState, newState) => {

        const state = oldState || newState;

        lobby = await get_voice(state.guild.id);

        const config = {
            headers: { Authorization: `Bearer ${token2}` }
        };
        
        const member = await newState.member || oldState.member;

        if(oldState.channelId != "1069676772309880854" && newState.channelId === "1069676772309880854"){

            const chennale = await newState.guild.channels.create({
                name: `Лобби ${member.user.tag}`,
                type: 2,
                parent: newState.channel.parent,
            });

            member.voice.setChannel(chennale);

            let invite = await chennale.createInvite(
            {
                maxAge: 0, 
                maxUses: 0
            })

            const bodyParameters = {
                "game": 3012, // osu id
                "invite": `https://discord.gg/${invite.code}`,
                "time": 60 * 60 * 12, // время в секундах, макс 12 часов
                "user_id": member.user.id,
                "region": "ru", // iso 3166-1
                "lang": "ru" // iso 639-1
            };

            axios.post(
                'https://api.discord.band/v1/findteam/create',
                bodyParameters,
                config
            ).catch(console.error);

        }

        if(oldState.channel === null || lobby === null) return;

        if(newState.channelId != oldState.channelId){

            current_voice = null;

            lobby.forEach(element => {
                if(oldState.channelId == element.channel_id){
                    current_voice = element;
                }
            });

            if(current_voice === null) return;

            if(member.user.id === current_voice.user_id){

                axios.delete('https://api.discord.band/v1/findteam/close', {
                        headers : { Authorization: `Bearer ${token2}` },
                        data : { "user_id": member.user.id }
                    }
                ).catch(console.error);

                if(oldState.channel.members.size > 0){

                    await oldState.channel.setName(`Лобби ${user_in_voice[0].username}#${user_in_voice[0].discriminator}`)

                    const bodyParameters = {
                        "game": 3012, // osu id
                        "invite": `https://discord.gg/${current_voice.invite}`,
                        "time": 60 * 60 * 12, // время в секундах, макс 12 часов
                        "user_id": user_in_voice[0].id,
                        "region": "ru", // iso 3166-1
                        "lang": "ru" // iso 639-1
                    };

                    axios.post(
                        'https://api.discord.band/v1/findteam/create',
                        bodyParameters,
                        config
                    ).catch(console.error);
                }
            }
            if(oldState.channel.members.size === 0 && oldState.channelId != "1069676772309880854"){
                oldState.channel.delete();
            }
        }
    });


    client.login(process.env.BOT_TOKEN);
}