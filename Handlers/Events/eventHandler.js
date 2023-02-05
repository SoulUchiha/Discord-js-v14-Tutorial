const {readdirSync} = require('fs');
let a = 0;
let e = 0;

module.exports = (client) => {
    readdirSync("./Events/").forEach(dir => {
        const events = readdirSync(`./Events/${dir}/`).filter(file => file.endsWith(".js"))
        for(let file of events) {
            let pull = require(`../../Events/${dir}/${file}`);
            if(pull.name){
                client.events.set(pull.name, pull);
                e++
            } else {
                a++
                continue;
            };
        };
    });
};