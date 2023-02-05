const {Client, Collection, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const OS = require('os');
const Events = require('events');
require('colors');

// Initialzing Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ],
    allowedMentions: {
      parse: ["everyone", "roles", "users"],
      users: [],
      roles: [],
      repliedUser: true,
    },
});

// Increasing Event Listener Size
client.setMaxListeners(0);
Events.defaultMaxListeners = 0;
process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

//exporting client
module.exports = client;

//defining useful collection
client.slashCommands = new Collection();
client.messageCommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/MessageCommands");
client.context = new Collection();
client.events = new Collection();

client.color = 3092790;
client.prefix = '<';

//connecting handlers
["messageHandler", "eventHandler","slashHandler"].forEach(handler => {
    require(`./Handlers/Events/${handler}`)(client);
});

// Logging in Discord
client.login(process.env.TOKEN)
.catch(e => console.log(`[DISCORD API] ${e}`.red))