const { Client, EmbedBuilder } = require("discord.js");
const ChannelID = process.env.LOGS;

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  const Embed = new EmbedBuilder()
    .setColor(client.color)
    .setTimestamp()
    .setFooter({ text: "Anti-crash handler" })
    .setTitle("⚠️ | Error Encountered");

  process.on("unhandledRejection", (err, reason, p) => {
    console.log(`[Unhandled Rejection]: ${reason}`.bold.brightGreen);
    console.log(`[Unhandled Rejection]: ${err}`.bold.brightGreen);
    console.log(`[Unhandled Rejection]: ${p}`.bold.brightGreen);

    const Channel = client.channels.cache.get(ChannelID);
    if (!Channel)
      return console.log(`[ERROR_LOG] No channelID in .env file`.red.bold);

    Channel.send({
      embeds: [
        Embed.setDescription(
          "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```"
        ),
      ],
    });
  });

  process.on("uncaughtException", (err, origin) => {
    console.log(`[Uncaught Exception] ${err.message}`.bold.brightGreen);
    console.log(`[Uncaught Exception] ${origin.message}`.bold.brightGreen);

    const Channel = client.channels.cache.get(ChannelID);
    if (!Channel)
      return console.log(`[ERROR_LOG] No channelID in .env file`.red.bold);

    Channel.send({
      embeds: [
        Embed.setDescription(
          "**Uncaught Exception/Catch:\n\n** ```" +
            err +
            "\n\n" +
            origin.toString() +
            "```"
        ),
      ],
    });
  });
};