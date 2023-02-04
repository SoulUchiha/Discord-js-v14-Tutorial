const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;

const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember, Channel]
});

// global variables
client.scommands = new Collection();
client.mcommands = new Collection();


module.exports = client;

// handlers
["event_handler","slash_handler","cmd_handler"].forEach((file) => {
  require(`./handlers/${file}`)(client);
});

client.login(process.env.TOKEN);

// so our command  handler is working fine , in next episode
// we will learn how to make some commands!
