const { EmbedBuilder } = require('discord.js')
module.exports = {
	name: "ping",
	run: async(client,message,args) => {
		return message.channel.send({embeds: [
			new EmbedBuilder()
			.setTitle(`Latency of the bot`)
			.setColor("Green")
			.setDescription(`My latency is ${client.ws.ping}ms `)
		]})
	}
}