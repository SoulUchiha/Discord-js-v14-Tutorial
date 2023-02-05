const {readdirSync} = require('fs');
let a = 0;
let e = 0;

module.exports = (client) => {
    readdirSync('./Commands/MessageCommands').forEach(dir => {
        const commands = readdirSync(`./Commands/MessageCommands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../../Commands/MessageCommands/${dir}/${file}`);
            if(pull.name){
                client.messageCommands.set(pull.name, pull);
                a++
            } else {
                e++
                continue;
            };
            if(pull.aliases && Array.isArray(pull.aliases))
            pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        };
    });
};