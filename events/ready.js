const { Events } = require('discord.js');
const mongoose = require("mongoose");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		mongoose.set("strictQuery", false);
		mongoose.connect(process.env.MONGO_URI);
        console.log('Ready!');
	},
};