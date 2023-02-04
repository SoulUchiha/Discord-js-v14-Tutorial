const client = require('../index')
const mongoose = require('mongoose')
client.on('ready', () => {
	console.log(`${client.user.tag} is now online!`)
	mongoose.connect(process.env.MONGO_URL)
	console.log(`Connected to MONGODB!`)
})