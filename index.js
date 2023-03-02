const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds , GatewayIntentBits.GuildPresences , GatewayIntentBits.GuildMembers , GatewayIntentBits.GuildIntegrations] });
require('dotenv').config()

const registeringsh = require("./functions/RegisteringSC.js");
const banner = require('./banner/banner.js');
const lfg = require('./functions/lfg.js');

registeringsh();
lfg();
banner();
client.commands = new Collection();

const floaders = fs.readdirSync('./moduls');
var commandFiles = {}

floaders.forEach(fload => {
	commandFiles[fload] = fs.readdirSync(`./moduls/${fload}`).filter(file => file.endsWith('.js'))
});


for(const fload of floaders){
	for (const file of commandFiles[fload]) {
		const filePath = `./moduls/${fload}/${file}`;
		const command = require(filePath);
		client.commands.set(command.data.name, command);
	}
}


const eventsPath = path.join(__dirname, './events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args,client));
	} else {
		client.on(event.name, (...args) => event.execute(...args,client));
	}
}

client.login(process.env.BOT_TOKEN);

