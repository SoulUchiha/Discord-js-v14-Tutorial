const client = require("../index");
const { PREFIX } = require("../settings");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  let args = message.content.slice(PREFIX.length).trim().split(/ +/);
  let cmd = args.shift()?.toLowerCase();
  const command = client.mcommands.get(cmd);
  if (!command) return;
  if (command) {
    if (
      command.userPermissions &&
      !message.member.permissions.has(command.userPermissions)
    ) {
      return message.reply({
        content: `you don't have enough permissions !!`,
      });
    } else if (
      command.botPermissions &&
      !message.guild.members.me.permissions.has(command.botPermissions)
    ) {
      return message.reply({
        content: `i don't have enough permissions !!`,
      });
    } else {
      command.run(client, message, args);
    }
  }
});