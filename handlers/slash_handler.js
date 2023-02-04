const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const settings = require('../settings.js')
/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  try {
    let allCommands = [];
    readdirSync("./Commands/Slash").forEach((dir) => {
      const commands = readdirSync(`./Commands/Slash/${dir}`).filter((f) =>
        f.endsWith(".js")
      );

      for (const cmd of commands) {
        const command = require(`../Commands/Slash/${dir}/${cmd}`);
        if (command.name) {
          client.scommands.set(command.name, command);
          allCommands.push(command);
        } else {
          console.log(`${cmd} is not ready`);
        }
      }
    });
    console.log(`${client.scommands.size} Slash Commands Loaded`);

    client.on("ready", async () => {
      // client.application.commands.set(allCommands);
      client.guilds.cache.get("981067155560882266").commands.set(allCommands);
    });
  } catch (error) {
    console.log(error);
  }
};