//Initialising Client
const client = require('../../index.js');
// PREFIX
const Prefix = client.prefix;
const {
    owners
} = require('../../settings/owners.json');
//--==--==--==--==--==--==--==
const { EmbedBuilder, Collection, PermissionsBitField } = require(`discord.js`);
const cooldowns = new Map();
const ms = require('ms');
client.on('messageCreate', async message =>{
    const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
    if(message.author.bot) return;

    if(!message.guild || !message.guild.available) return message.reply('Message Commands are only supported in a Servers')
    
    //Checking for mention
    if (message.content.match(mentionRegex)) {
        message.reply(`Hello, I am ${client.user.username}. My Prefix is ${Prefix}`)
    };
  
    if(message.content.startsWith(Prefix)){
        if(!message.member) message.member = await message.guild.members.fetch(message.author.id);
        const args = message.content.slice(Prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if(cmd.length == 0 ) return;
        let command = client.messageCommands.get(cmd)
        if(!command) command = client.messageCommands.get(client.aliases.get(cmd));
        
        if(command){
            //registering command in map to get cooldowns
            if(!cooldowns.has(command.name)){
                cooldowns.set(command.name, new Collection());
            }

            const current_time = Date.now();
            const time_stamps = cooldowns.get(command.name);
            const cooldown_amount = (command.cooldown) * 1000;

            //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
            if(time_stamps.has(message.author.id)){
                const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

                if(current_time < expiration_time){
                    const time_left = (expiration_time - current_time);

                    return message.channel.send({embeds: [
                        new EmbedBuilder()
                        .setDescription(`**You are on a cooldown of \`${ms(cooldown_amount)}\`.\n\nCooldown Ends: <t:${((Date.now() + time_left)/1000).toFixed(0)}:R>**`)
                        .setColor(message.guild.members.me.displayHexColor)
                    ]});
                }
            }

            //If the author's id is not in time_stamps then add them with the current time.
            time_stamps.set(message.author.id, current_time);
            //Delete the user's id once the cooldown is over.
            setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
        }

        if(command){
            // User Permissions Check
        if (!message.member.permissions.has(command.userPermissions || [])) return message.reply({
            content: `You need \`${command.userPermissions || []}\` permissions to run this command`
        });

        // Under Maintenance Commands
        if (command.maintenance) {
            if (!owners.includes(message.author.id)) {
                return message.reply({
                    content: `This command is on maintenance please try later, Thank you!`
                })
            }
        }

        // Bot Permissions Check
        if (!message.guild.members.me.permissions.has(command.botPermissions || []))
            return message.reply({
                content: `I need \`${cmd.botPermissions || []}\` permissions to run this command`
            });

        // Owner Only Commands
        if (command.ownerOnly) {
            if (!owners.includes(message.author.id)) {
                return message.reply({
                    content: `Only the Bot Developers are allowed to run this command!`
                })
            }
        };
            command.run(client, message, args)
        }
      
    }
});